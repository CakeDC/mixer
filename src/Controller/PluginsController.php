<?php
namespace CakeDC\Mixer\Controller;

use Cake\Core\Configure;
use Cake\Network\Exception\BadRequestException;
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
        $data = null;
        if ($search = $this->request->query('q')) {
            $data = json_decode(file_get_contents(Configure::read('Mixer.api') . 'packages?q=' . urlencode($search)), true);
            $data = Hash::get($data, 'data');
        }

        $this->set(compact('data'));
        $this->set('_serialize', ['data']);
    }

    /**
     * Install method
     *
     * @return \Cake\Network\Response
     */
    public function install()
    {
        $this->request->allowMethod('post');

        if (!$plugin = $this->request->data('plugin')) {
            throw new BadRequestException();
        }

        if ($output = $this->Composer->req($plugin)) {
            $this->Flash->success(__d('Mixer', '{0} plugin successfully installed', $plugin));
        } else {
            $this->Flash->error(__d('Mixer', 'Failed installing {0} plugin', $plugin));
        }

        return $this->redirect($this->request->referer());
    }

    /**
     * Remove method
     *
     * @return \Cake\Network\Response
     */
    public function remove()
    {
        $this->request->allowMethod('post');

        if (!$plugin = $this->request->data('plugin')) {
            throw new BadRequestException();
        }

        if ($output = $this->Composer->remove($plugin)) {
            $this->Flash->success(__d('Mixer', '{0} plugin successfully remove', $plugin));
        } else {
            $this->Flash->error(__d('Mixer', 'Failed removing {0} plugin', $plugin));
        }

        return $this->redirect($this->request->referer());
    }

}
