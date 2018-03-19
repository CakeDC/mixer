<?php
/** @var \CakeDC\Mixer\View\AppView $this */

use Cake\I18n\I18n;
use Cake\Routing\Router;
use Cake\Core\Configure;
?>
<!DOCTYPE html>
<html lang="<?= I18n::getLocale() ?>">
<head>
    <base href="<?= Router::url('/mixer/') ?>" />
    <?= $this->Html->charset() ?>
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title><?= __('Mixer') ?></title>

    <!-- Bootstrap -->
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css" integrity="sha384-BVYiiSIFeK1dGmJRAkycuHAHRg32OmUcww7on3RYdg4Va+PmSTsz/K68vbdEjh4u" crossorigin="anonymous">
    <link rel="stylesheet" href="//maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css">

    <?php
    $this->append('css', $this->Html->css('CakeDC/Mixer.AdminLTE.min'));
    $this->append('css', $this->Html->css('CakeDC/Mixer.skin-red.min'));
    $this->append('css', $this->Html->css('CakeDC/Mixer.app'));
    ?>
    <?= $this->fetch('css') ?>

    <!-- HTML5 shim and Respond.js for IE8 support of HTML5 elements and media queries -->
    <!-- WARNING: Respond.js doesn't work if you view the page via file:// -->
    <!--[if lt IE 9]>
    <script src="https://oss.maxcdn.com/html5shiv/3.7.3/html5shiv.min.js"></script>
    <script src="https://oss.maxcdn.com/respond/1.4.2/respond.min.js"></script>
    <![endif]-->
</head>
<body>
    <?= $this->fetch('content') ?>
    <?= $this->fetch('script') ?>
</body>
</html>
