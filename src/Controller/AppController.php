<?php

namespace CakeDC\Mixer\Controller;

use Cake\Controller\Controller;
use Cake\Core\Configure;
use Cake\Event\EventInterface;
use Cake\Http\Exception\NotFoundException;

/**
 * Class AppController
 *
 * @property \CakeDC\Mixer\Controller\Component\ComposerComponent $Composer
 *
 * @package CakeDC\Mixer\Controller
 */
class AppController extends Controller
{
    public function initialize(): void
    {
        parent::initialize();

        if (!Configure::read('debug')) {
            throw new NotFoundException();
        }

        $this->loadComponent('CakeDC/Mixer.Composer');
        $this->loadComponent('RequestHandler');
    }

    /**
     * Before render callback.
     *
     * @param \Cake\Event\Event $event The beforeRender event.
     * @return void
     */
    public function beforeRender(EventInterface $event)
    {
        // For CakePHP 3.1+
        if ($this->viewBuilder()->getClassName() === null) {
            $this->viewBuilder()->setClassName('CakeDC/Mixer.App');
        }
    }
}
