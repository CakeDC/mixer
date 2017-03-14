<?php
use Cake\Routing\RouteBuilder;
use Cake\Routing\Router;
use Cake\Routing\Route\DashedRoute;

Router::plugin(
    'CakeDC/Mixer',
    ['path' => '/mixer'],
    function (RouteBuilder $routes) {
        $routes->extensions(['json']);

        $routes->connect('/', ['controller' => 'Plugins', 'action' => 'index']);

        $routes->fallbacks(DashedRoute::class);
    }
);
