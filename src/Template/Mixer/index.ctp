<?php
/**
 * @var \CakeDC\Mixer\View\AppView $this
 * @var array $installed
 */

use Cake\Core\Configure;
?>
<div id="root"></div>
<?php
if (file_exists(Configure::read('plugins.CakeDC/Mixer') . 'webroot' . DS . '_js')) {
    $this->append('script', $this->Html->script('CakeDC/Mixer.bundle', ['pathPrefix' => '_js/']));
} else {
    $this->append('css', $this->Html->css('CakeDC/Mixer.main'));
    $this->append('script', $this->Html->script('CakeDC/Mixer.main'));
}
?>
<script>
    var apiUrl = '<?= Configure::read('Mixer.api') ?>';
    var installedPlugins = <?= json_encode($installed) ?>;
</script>
