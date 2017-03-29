<?php

namespace CakeDC\Mixer\Controller;

use Cake\Controller\Controller;
use Cake\Event\Event;

/**
 * Class AppController
 *
 * @property \CakeDC\Mixer\Controller\Component\ComposerComponent $Composer
 *
 * @package CakeDC\Mixer\Controller
 */
class AppController extends Controller
{
    public function initialize()
    {
        parent::initialize();

        $this->loadComponent('CakeDC/Mixer.Composer');
        $this->loadComponent('RequestHandler');
    }

    /**
     * Before render callback.
     *
     * @param \Cake\Event\Event $event The beforeRender event.
     * @return void
     */
    public function beforeRender(Event $event)
    {
        // For CakePHP 3.1+
        if ($this->viewBuilder()->className() === null) {
            $this->viewBuilder()->className('CakeDC/Mixer.App');
        }
    }
}
