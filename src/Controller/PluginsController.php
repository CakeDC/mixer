<?php
namespace CakeDC\Mixer\Controller;

use Cake\Network\Exception\BadRequestException;

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
        if ($search = $this->request->query('search')) {
            $data = json_decode(file_get_contents('https://packagist.org/search.json?type=cakephp-plugin&q=' . urlencode($search)), true);
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
