<?php
namespace CakeDC\Mixer\Controller\Component;

use Cake\Controller\Component;
use Cake\Controller\ComponentRegistry;
use Cake\Filesystem\Folder;
use Cake\Utility\Hash;
use Composer\Console\Application;
use Symfony\Component\Console\Input\ArrayInput;
use Symfony\Component\Console\Output\BufferedOutput;

/**
 * Composer component
 */
class ComposerComponent extends Component
{

    const TYPE_CAKEPHP_PLUGIN = "cakephp-plugin";

    /**
     * Default configuration.
     *
     * @var array
     */
    protected $_defaultConfig = [];

    /**
     * Constructor hook method.
     *
     * Implement this method to avoid having to overwrite
     * the constructor and call parent.
     *
     * @param array $config The configuration settings provided to this component.
     * @return void
     */
    public function initialize(array $config)
    {
        $config += [
            'home' => TMP . 'composer'
        ];

        $this->setConfig($config);

        putenv("OSTYPE=OS400");
        if (!getenv('COMPOSER_HOME')) {
            putenv("COMPOSER_HOME={$this->getConfig('home')}");
        }

        ini_set('memory_limit', '512M');

        if (!ini_get('safe_mode')) {
            set_time_limit(600);
        }
    }

    public function req($packages, $options = [])
    {
        $options += [
            '--prefer-dist' => true,
            '--no-progress' => true,
        ];
        $command = 'require';
        $packages = (array)$packages;

        return $this->run(compact('command', 'packages') + $options);
    }

    public function remove($packages, $options = [])
    {
        $options += [
            '--no-progress' => true,
        ];
        $command = 'remove';
        $packages = (array)$packages;

        return $this->run(compact('command', 'packages') + $options);
    }

    public function run($input)
    {
        $input += [
            '--no-interaction' => true,
            '--working-dir' => ROOT,
        ];

        $input = new ArrayInput($input);
        $output = new BufferedOutput();

        $application = new Application();
        $application->setAutoExit(false);
        $application->run($input, $output);

        return $output->fetch();
    }

    public function getRequired()
    {
        $composerJson = $this->getComposerData();

        return array_keys(array_merge(Hash::get($composerJson, 'require', []), Hash::get($composerJson, 'require-dev', [])));
    }

    /**
     * getComposerData method will provide the composer.json in array
     *
     * @param string $path
     * @return array|bool
     */
    public function getComposerData($path = null)
    {
        if (!$path) {
            $path = ROOT . DS . 'composer.json';
        }

        if (!is_readable($path)) {
             return false;
        }

        return json_decode(file_get_contents($path), true);
    }

    /**
     * Get required packages of given type
     *
     * @param string $type
     * @return array
     */
    public function getRequiredPackages($type = self::TYPE_CAKEPHP_PLUGIN)
    {
        $required = $this->getRequired();
        $composerLock = json_decode(file_get_contents(ROOT . DS . 'composer.lock'), true);
        $installedPackages = collection(Hash::get($composerLock, 'packages', []))
            ->indexBy('name')
            ->toArray();
        $installedPackagesDev = collection(Hash::get($composerLock, 'packages-dev', []))
            ->indexBy('name')
            ->toArray();

        $packages = [];
        foreach ($required as $name) {
            if (!$composer = $this->getComposerData(ROOT . DS . 'vendor' . DS . $name . DS . 'composer.json')) {
                continue;
            }

            if ($type && Hash::get($composer, 'type') != $type) {
                continue;
            }

            $package = array_intersect_key($composer, array_flip(['name', 'description']));
            $package['dev'] = false;

            if ($installed = Hash::get($installedPackages, $package['name'])) {
                $package['version'] = Hash::get($installed, 'version');
            } elseif ($installed = Hash::get($installedPackagesDev, $package['name'])) {
                $package['version'] = Hash::get($installed, 'version');
                $package['dev'] = true;
            }

            $packages[] = $package;
        }

        return $packages;
    }

    /**
     * getInstalledPlugins this method will return all cakephp plugins installed into your app
     *
     * @return array
     */
    public function getInstalledPlugins()
    {
        $required = $this->getRequired();
        $installers = $this->_getInstallerPaths();
        $cakephpPlugins = $this->__getCakephpPlugins();
        $installed = [];
        foreach ($required as $plugin) {
            if (isset($installers[$plugin])) {
                $path = ROOT . DS . $installers[$plugin] . DS . 'composer.json';
                if (file_exists($path)) {
                    $composer = $this->getComposerData($path);
                    if (isset($composer['type']) && $composer['type'] == self::TYPE_CAKEPHP_PLUGIN) {
                        $installed[]['name'] = $plugin;
                    }
                }
            } else {
                foreach ($cakephpPlugins as $composerPlugin) {
                    if ($plugin == $composerPlugin) {
                        $installed[]['name'] = $plugin;
                    }
                }
            }
        }
        return $installed;
    }

    /**
     * getInstallerPaths will return where the plugins were installed
     *
     * @return array|bool
     */
    private function _getInstallerPaths()
    {
        $composerData = $this->getComposerData();
        $required = $this->getRequired();
        if (!empty($composerData['extra']['installer-paths'])) {
            $installers = $composerData['extra']['installer-paths'];
            $paths = [];
            foreach ($required as $plugin) {
                foreach ($installers as $key => $path) {
                    if (!isset($path[0])) {
                        continue;
                    }
                    if ($plugin == $path[0]) {
                        $paths[$plugin] = $key;
                    }
                }
            }

            return $paths;
        }

        return false;
    }

    /**
     * getCakephpPlugins method will return only the cakephp plugins
     *
     * @return array
     */
    private function __getCakephpPlugins()
    {
        $dir = new Folder(ROOT . DS . 'vendor');
        $composers = $dir->findRecursive('composer.json');
        $cakephpPlugins = [];
        foreach ($composers as $path) {
            $composerData = $this->getComposerData($path);
            if (isset($composerData['type']) && $composerData['type'] == self::TYPE_CAKEPHP_PLUGIN) {
                $cakephpPlugins[] = $composerData['name'];
            }
        }

        return $cakephpPlugins;
    }
}
