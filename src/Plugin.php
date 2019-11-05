<?php
declare(strict_types=1);
/**
 * Copyright 2010 - 2019, Cake Development Corporation (https://www.cakedc.com)
 *
 * Licensed under The MIT License
 * Redistributions of files must retain the above copyright notice.
 *
 * @copyright Copyright 2010 - 2019, Cake Development Corporation (https://www.cakedc.com)
 * @license MIT License (http://www.opensource.org/licenses/mit-license.php)
 */
namespace CakeDC\Mixer;

use Cake\Core\BasePlugin;
use Cake\Core\PluginApplicationInterface;

/**
 * Class Plugin
 *
 * @package CakeDC\Mixer
 */
class Plugin extends BasePlugin
{
    /**
     * {@inheritDoc}
     */
    public function bootstrap(PluginApplicationInterface $app): void
    {
        // Call parent to load bootstrap from files.
        parent::bootstrap($app);

        $app->addPlugin('Bake');
    }
}
