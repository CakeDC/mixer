<?php
namespace CakeDC\Mixer\View\Helper;

use Cake\View\Helper;

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

    /**
     * @var array|null
     */
    protected $_installedPackages = null;

    /**
     * @param string $package
     * @return bool
     */
    public function isInstalled($package)
    {
        return array_key_exists($package, $this->_getInstalledPackages());
    }

    /**
     * @return array
     */
    protected function _getInstalledPackages()
    {
        if ($this->_installedPackages === null) {
            $composer = json_decode(file_get_contents(ROOT . DS . 'composer.json'), true);
            $this->_installedPackages = $composer['require'];
        }

        return $this->_installedPackages;
    }
}
