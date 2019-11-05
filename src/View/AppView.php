<?php
namespace CakeDC\Mixer\View;

use Cake\View\View;

/**
 * Application View
 *
 * Your application’s default view class
 *
 * @property \CakeDC\Mixer\View\Helper\ComposerHelper $Composer
 * @link http://book.cakephp.org/3.0/en/views.html#the-app-view
 */
class AppView extends View
{
    /**
     * Initialization hook method.
     *
     * Use this method to add common initialization code like loading helpers.
     *
     * e.g. `$this->loadHelper('Html');`
     *
     * @return void
     */
    public function initialize(): void
    {
        parent::initialize();

        $this->loadHelper('CakeDC/Mixer.Composer');
    }
}
