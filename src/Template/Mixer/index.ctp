<?php
/** @var \Cake\View\View $this */

use Cake\Core\Configure;

$webroot = Configure::read('plugins.' . 'CakeDC/Mixer') . 'webroot' . DS;

if (file_exists($webroot . 'build')) {
    $this->append('script', $this->Html->script('CakeDC/Mixer.bundle', ['pathPrefix' => 'build/static/js/']));
} else {
    $assetManifest = json_decode(file_get_contents($webroot . 'asset-manifest.json'), true);
    foreach ($assetManifest as $filename => $path) {
        $ext = explode('.', $filename);
        $ext = end($ext);
        if ($ext == 'css') {
            $this->append('css', $this->Html->css('CakeDC/Mixer.' . $path, ['pathPrefix' => null]));
        } elseif ($ext == 'js') {
            $this->append('script', $this->Html->script('CakeDC/Mixer.' . $path, ['pathPrefix' => null]));
        }
    }
}
?>
<div id="root"></div>
