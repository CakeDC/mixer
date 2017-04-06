<?php
namespace CakeDC\Mixer\Controller;

use Cake\Console\Shell;
use Cake\Core\Configure;
use Cake\Http\Client;
use Cake\Network\Exception\BadRequestException;
use Cake\Network\Exception\NotFoundException;
use Cake\Shell\PluginShell;
use Cake\Utility\Hash;

/**
 * Plugins Controller
 *
 */
class PluginsController extends AppController
{

    /**
     * Index method
     *
     * @return \Cake\Network\Response|void
     */
    public function index()
    {
        $installed = $this->Composer->getRequired();

        $this->set(compact('installed'));
        $this->set('_serialize', ['installed']);
    }

    /**
     * Install method
     *
     * @return \Cake\Network\Response
     */
    public function install()
    {
        $this->request->allowMethod('post');

        if (!$id = $this->request->data('id')) {
            throw new BadRequestException();
        }

        $http = new Client();
        $response = $http->get(Configure::read('Mixer.api') . 'packages/' . $id);
        if (!$package = Hash::get($response->json, 'data')) {
            throw new NotFoundException();
        }

        $success = true;
        $message = __d('Mixer', '{0} plugin successfully installed', $package->name);
        if (!$output = $this->Composer->req($package->name)) {
            $success = false;
            $message = __d('Mixer', 'Failed installing {0} plugin', $package->name);
        } elseif ($pluginName = $this->_getPluginName($package->name)) {
            // TODO: run shell
        }

        if (!$this->request->is('json')) {
            $this->Flash->set($message, ['element' => $success ? 'success' : 'error']);

            return $this->redirect($this->request->referer());
        }

        $this->set(compact('success', 'message'));
        $this->set('_serialize', ['success', 'message']);
    }

    /**
     * Remove method
     *
     * @return \Cake\Network\Response
     */
    public function remove()
    {
        $this->request->allowMethod('post');

        if (!$package = $this->request->data('package')) {
            throw new BadRequestException();
        }

        $success = true;
        $message = __d('Mixer', '{0} plugin successfully remove', $package);
        if (!$output = $this->Composer->remove($package)) {
            $success = false;
            $message = __d('Mixer', 'Failed removing {0} plugin', $package);
        } elseif ($pluginName = $this->_getPluginName($package)) {
            // TODO: run shell
        }

        if (!$this->request->is('json')) {
            $this->Flash->set($message, ['element' => $success ? 'success' : 'error']);

            return $this->redirect($this->request->referer());
        }

        $this->set(compact('success', 'message'));
        $this->set('_serialize', ['success', 'message']);
    }

    protected function _getPluginName($package)
    {
        $composer = json_decode(file_get_contents(ROOT . DS . 'vendor' . DS . $package . DS . 'composer.json'), true);
        if (!$autoload = Hash::get($composer, 'autoload.psr-4')) {
            return false;
        }

        return rtrim(array_search('src', $autoload), '\\');
    }
}
