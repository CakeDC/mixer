<?php
use Cake\Core\Configure;
use Cake\Core\Plugin;

Plugin::load('BootstrapUI');

Configure::write('Mixer', [
    'api' => 'http://dev.mixerapi.cakedc.com/api/v1/'
]);
