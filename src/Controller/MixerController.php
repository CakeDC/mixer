<?php
namespace CakeDC\Mixer\Controller;

use Cake\Core\Configure;
use Zend\Diactoros\Stream;

/**
 * Mixer Controller
 *
 */
class MixerController extends AppController
{

    /**
     * Index method
     *
     * @return \Cake\Network\Response|null
     */
    public function index()
    {
        $this->viewBuilder()->setLayout('default_react');
        //$path = Configure::read('plugins.' . 'CakeDC/Mixer') . 'webroot' . DS . 'index.html';
        //$stream = new Stream($path, 'rb');

        //return $this->response->withBody($stream);
    }

}
