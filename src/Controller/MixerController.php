<?php
namespace CakeDC\Mixer\Controller;

use Cake\Console\Shell;
use Cake\Core\Configure;
use Cake\Core\Plugin;
use Cake\Datasource\ConnectionManager;
use Cake\Http\Client;
use Cake\Http\Exception\BadRequestException;
use Cake\Http\Exception\NotFoundException;
use Cake\Utility\Hash;
use Cake\Utility\Inflector;

/**
 * Mixer Controller
 *
 */
class MixerController extends AppController
{
    /**
     * @var array
     */
    private $data = [];
    /**
     * Initialization hook method.
     *
     * @return void
     * @throws \Exception
     */
    public function initialize(): void
    {
        parent::initialize();

        set_time_limit(600);
        $data = $this->request->input();
        $this->data = $this->request->getData();
        if ($data) {
            $this->data += json_decode($data, true);
        }
    }

    /**
     * Index method
     *
     * @return \Cake\Http\Response|null
     */
    public function index()
    {
        $installed = $this->Composer->getRequiredPackages();

        $this->set(compact('installed'));
    }

    /**
     * Get data from streamData
     *
     * @param string $name The field name to get
     */
    protected function getData($name)
    {
        return $this->data[$name] ?? null;
    }
    /**
     * Install method
     *
     * @return \Cake\Http\Response
     * @throws \Exception
     */
    public function install()
    {
        $this->request->allowMethod('post');
        if (!$name = $this->getData('package')) {
            throw new BadRequestException();
        }

        $package = $this->_getApiResponse("packages/{$name}");

        $success = true;
        $message = __d('Mixer', '{0} plugin successfully installed', $package['name']);
        $output = $this->Composer->req($package['name']);
        if (strpos($output, 'Writing lock file') === false) {
            $success = false;
            $message = __d('Mixer', 'Failed installing {0} plugin', $package['name']);
        } elseif ($pluginName = $this->_getPluginName($package['name'])) {
            $args = ['plugin', 'load', $pluginName];

            if ($package['has_bootstrap']) {
                $args[] = '--bootstrap';
            }

            if ($package['has_routes']) {
                $args[] = '--routes';
            }

            if (!$this->_dispatchShell($args)) {
                throw new \Exception('Could not load plugin ' . $pluginName);
            }
        }

        if (!$this->request->is('json')) {
            $this->Flash->set($message, ['element' => $success ? 'success' : 'error']);

            return $this->redirect($this->request->referer());
        }

        $this->set('data', $package);
        $this->set(compact('success', 'message', 'output'));
        $this->set('_serialize', ['success', 'message', 'output', 'data']);
    }

    /**
     * Uninstall method
     *
     * @return \Cake\Http\Response
     * @throws \Exception
     */
    public function uninstall()
    {
        $this->request->allowMethod('post');

        if (!$package = $this->getData('package')) {
            throw new BadRequestException();
        }

        if ($pluginName = $this->_getPluginName($package)) {
            $this->_dispatchShell(['plugin', 'unload', $pluginName]);
        }

        $success = true;
        $message = __d('Mixer', '{0} plugin successfully removed', $package);
        if (!$output = $this->Composer->remove($package)) {
            $success = false;
            $message = __d('Mixer', 'Failed removing {0} plugin', $package);
        }

        if (!$this->request->is('json')) {
            $this->Flash->set($message, ['element' => $success ? 'success' : 'error']);

            return $this->redirect($this->request->referer());
        }

        $this->set(compact('success', 'message', 'output'));
        $this->set('_serialize', ['success', 'message', 'output']);
    }

    /**
     * Update method
     *
     * @return \Cake\Http\Response
     * @throws \Exception
     */
    public function update()
    {
        $this->request->allowMethod('post');

        if (!$name = $this->getData('package')) {
            throw new BadRequestException();
        }

        if (!$version = $this->getData('version')) {
            throw new BadRequestException();
        }

        $options = [];
        if ($dev = $this->getData('dev')) {
            $options['--dev'] = (bool)$dev;
        }

        $package = $this->_getApiResponse("packages/{$name}");

        $success = true;
        $message = __d('Mixer', '{0} plugin successfully update', $package['name']);
        if (!($output = $this->Composer->req($package['name'] . ':' . $version, $options)) || strpos($output, 'Installation failed') !== false) {
            $success = false;
            $message = __d('Mixer', 'Failed updating {0} plugin', $package['name']);
        }

        if (!$this->request->is('json')) {
            $this->Flash->set($message, ['element' => $success ? 'success' : 'error']);

            return $this->redirect($this->request->referer());
        }

        $this->set(compact('success', 'message', 'output', 'version'));
        $this->set('_serialize', ['success', 'message', 'output', 'version']);
    }

    /**
     * Bake method
     *
     * @return \Cake\Http\Response
     * @throws \Exception
     */
    public function bake()
    {
        $this->request->allowMethod('post');

        $success = true;

        Plugin::load('Bake');

        $tables = (array)$this->getData('tables');
        foreach ($tables as $table => $subCommands) {
            foreach ($subCommands as $subCommand => $run) {
                if (!(int)$run) {
                    continue;
                }

                $args = ['bake', Inflector::singularize(strtolower($subCommand)), Inflector::camelize($table), '--force'];

                if (!$this->_dispatchShell($args)) {
                    throw new \Exception("Could not bake {$subCommand} for {$table}");
                }
            }
        }

        $this->set(compact('success'));
        $this->set('_serialize', ['success']);
    }

    /**
     * Get database tables
     *
     * @return \Cake\Http\Response
     * @throws \Exception
     */
    public function tables()
    {
        $success = true;
        $data = [];

        try {
            $tables = $this->_getTables();
            foreach ($tables as $name) {
                $controllerExists = file_exists(APP . 'Controller' . DS . Inflector::camelize($name) . 'Controller.php');
                $modelExists = file_exists(APP . 'Model' . DS . 'Table' . DS . Inflector::camelize($name) . 'Table.php');
                $templatesExists = file_exists(APP . 'Template' . DS . Inflector::camelize($name));

                $data[] = compact('name', 'controllerExists', 'modelExists', 'templatesExists');
            }
        } catch (\Exception $e) {
            $success = false;
            $message = $e->getMessage();
        }

        $this->set(compact('success', 'data', 'message'));
        $this->set('_serialize', ['success', 'data', 'message']);
    }

    /**
     * Get plugin name from package name
     *
     * @param string $package
     * @return bool|mixed
     */
    protected function _getPluginName($package)
    {
        $composer = json_decode(file_get_contents(ROOT . DS . 'vendor' . DS . $package . DS . 'composer.json'), true);
        if (!$autoload = Hash::get($composer, 'autoload.psr-4')) {
            return false;
        }

        return str_replace('\\', '/', rtrim(array_search('src', $autoload), '\\'));
    }

    /**
     * Dispatch shell
     *
     * @param $args
     * @return bool
     */
    protected function _dispatchShell($args)
    {
        return (new Shell())->dispatchShell(implode(' ', $args)) == Shell::CODE_SUCCESS;
    }

    /**
     *  Get filtered list of tables in DB
     *
     * @return array
     */
    protected function _getTables()
    {
        /** @var \Cake\Database\Connection $db */
        $db = ConnectionManager::get('default');
        $schema = $db->getSchemaCollection();
        $tables = $schema->listTables();
        sort($tables);
        $tables = array_diff($tables, ['i18n', 'cake_sessions', 'phinxlog']);
        $tables = array_filter($tables, function($table) {
            return substr($table, -9) !== '_phinxlog';
        });

        return $tables;
    }

    /**
     *  Make Mixer API request and return decoded response
     *
     * @return array
     */
    protected function _getApiResponse($path)
    {
        $http = new Client();
        $response = $http->get(Configure::read('Mixer.api') . '/' . $path);
        if (!$data = Hash::get($response->getJson(), 'data')) {
            throw new NotFoundException();
        }

        return $data;
    }
}
