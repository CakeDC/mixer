<?php
namespace CakeDC\Mixer\View\Helper;

use Cake\View\Helper;
use Cake\View\View;

/**
 * Composer helper
 */
class ComposerHelper extends Helper
{

    /**
     * Default configuration.
     *
     * @var array
     */
    protected $_defaultConfig = [];

    protected $_installedPackages = false;

    public function isInstalled($package)
    {
        return array_key_exists($package, $this->_getInstalledPackages());
    }

    protected function _getInstalledPackages()
    {
        if ($this->_installedPackages === false) {
            $composer = json_decode(file_get_contents(ROOT . DS . 'composer.json'), true);
            $this->_installedPackages = $composer['require'];
        }

        return $this->_installedPackages;
    }
}
