<?php
/** @var \CakeDC\Mixer\View\AppView $this */

use Cake\I18n\I18n;
use Cake\Routing\Router;
use Cake\Core\Configure;

$cakeDescription = 'CakePHP: the rapid development php framework';

$this->append('css', $this->Html->css('CakeDC/Mixer.AdminLTE.min'));
$this->append('css', $this->Html->css('CakeDC/Mixer.skin-red.min'));
$this->append('css', $this->Html->css('CakeDC/Mixer.app'));
?>
<!DOCTYPE html>
<html lang="<?= I18n::locale() ?>">
<head>
    <base href="<?= Router::url('/mixer/', true) ?>" />
    <?= $this->Html->charset() ?>
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>
        <?= $cakeDescription ?>:
        <?= $this->fetch('title') ?>
    </title>

    <?= $this->Html->meta('icon') ?>
    <?= $this->fetch('meta') ?>

    <!-- Bootstrap -->
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css" integrity="sha384-BVYiiSIFeK1dGmJRAkycuHAHRg32OmUcww7on3RYdg4Va+PmSTsz/K68vbdEjh4u" crossorigin="anonymous">
    <link rel="stylesheet" href="//maxcdn.bootstrapcdn.com/font-awesome/4.6.3/css/font-awesome.min.css">
    <?= $this->fetch('css') ?>

    <!-- HTML5 shim and Respond.js for IE8 support of HTML5 elements and media queries -->
    <!-- WARNING: Respond.js doesn't work if you view the page via file:// -->
    <!--[if lt IE 9]>
    <script src="https://oss.maxcdn.com/html5shiv/3.7.3/html5shiv.min.js"></script>
    <script src="https://oss.maxcdn.com/respond/1.4.2/respond.min.js"></script>
    <![endif]-->
</head>
<body>

<div id="root"></div>

<?php
$webroot = Configure::read('plugins.' . 'CakeDC/Mixer') . 'webroot' . DS;

if (file_exists($webroot . '_js')) {
    $this->append('script', $this->Html->script('CakeDC/Mixer.bundle', ['pathPrefix' => '_js/']));
} else {
    $this->append('css', $this->Html->css('CakeDC/Mixer.main'));
    $this->append('script', $this->Html->script('CakeDC/Mixer.main'));
}
?>
<!-- jQuery (necessary for Bootstrap's JavaScript plugins) -->
<script src="https://ajax.googleapis.com/ajax/libs/jquery/1.12.4/jquery.min.js"></script>
<!-- Include all compiled plugins (below), or include individual files as needed -->
<script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js" integrity="sha384-Tc5IQib027qvyjSMfHjOMaLkfuWVxZxUPnCJA7l2mCWNIpG9mGCD8wGNIcPD7Txa" crossorigin="anonymous"></script>
<?= $this->fetch('script') ?>
</body>
</html>
