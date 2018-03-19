<?php
use Cake\Routing\RouteBuilder;
use Cake\Routing\Router;
use Cake\Routing\Route\DashedRoute;

Router::plugin(
    'CakeDC/Mixer',
    ['path' => '/mixer'],
    function (RouteBuilder $routes) {
        $routes->setExtensions(['json']);

        $routes->connect('/install', ['controller' => 'Mixer', 'action' => 'install']);
        $routes->connect('/uninstall', ['controller' => 'Mixer', 'action' => 'uninstall']);
        $routes->connect('/update', ['controller' => 'Mixer', 'action' => 'update']);
        $routes->connect('/tables', ['controller' => 'Mixer', 'action' => 'tables']);
        $routes->connect('/bake', ['controller' => 'Mixer', 'action' => 'bake']);
        $routes->connect('/*', ['controller' => 'Mixer', 'action' => 'index']);
    }
);
