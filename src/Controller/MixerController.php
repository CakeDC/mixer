<?php
namespace CakeDC\Mixer\Controller;

use Cake\Console\Shell;
use Cake\Core\Configure;
use Cake\Http\Client;
use Cake\Network\Exception\BadRequestException;
use Cake\Network\Exception\NotFoundException;
use Cake\Utility\Hash;

/**
 * Mixer Controller
 *
 */
class MixerController extends AppController
{

    public function initialize()
    {
        parent::initialize();

        set_time_limit(600);
    }

    /**
     * Index method
     *
     * @return \Cake\Network\Response|null
     */
    public function index()
    {
        $installed = $this->Composer->getRequiredPackages();

        $this->set(compact('installed'));
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

        if (!$name = $this->request->getData('package')) {
            throw new BadRequestException();
        }

        $http = new Client();
        $response = $http->get(Configure::read('Mixer.api') . '/packages/' . $name);
        if (!$package = Hash::get($response->json, 'data')) {
            throw new NotFoundException();
        }

        $success = true;
        $message = __d('Mixer', '{0} plugin successfully installed', $package['name']);
        if (!($output = $this->Composer->req($package['name'])) || strpos($output, 'Installation failed') !== false) {
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

        if (!$package = $this->request->getData('package')) {
            throw new BadRequestException();
        }

        if ($pluginName = $this->_getPluginName($package)) {
            $this->_dispatchShell(['plugin', 'unload', $pluginName]);
        }

        $success = true;
        $message = __d('Mixer', '{0} plugin successfully remove', $package);
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

        if (!$name = $this->request->getData('package')) {
            throw new BadRequestException();
        }

        if (!$version = $this->request->getData('version')) {
            throw new BadRequestException();
        }

        $options = [];
        if ($dev = $this->request->getData('dev')) {
            $options['--dev'] = (bool)$dev;
        }

        $http = new Client();
        $response = $http->get(Configure::read('Mixer.api') . '/packages/' . $name);
        if (!$package = Hash::get($response->json, 'data')) {
            throw new NotFoundException();
        }

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

}
