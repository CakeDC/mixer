<?php
namespace CakeDC\Mixer\Controller\Component;

use Cake\Controller\Component;
use Cake\Controller\ComponentRegistry;
use Cake\Utility\Hash;
use Composer\Console\Application;
use Symfony\Component\Console\Input\ArrayInput;
use Symfony\Component\Console\Output\BufferedOutput;

/**
 * Composer component
 */
class ComposerComponent extends Component
{

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

        $this->config($config);

        putenv("OSTYPE=OS400");
        if (!getenv('COMPOSER_HOME')) {
            putenv("COMPOSER_HOME={$this->config('home')}");
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
        $composerJson = json_decode(file_get_contents(ROOT . DS . 'composer.json'), true);

        return array_merge(Hash::get($composerJson, 'require', []), Hash::get($composerJson, 'require-dev', []));
    }
}
