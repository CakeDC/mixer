<p align="center"><img src="http://21d604f1f8eef14e4b21-06ee1d56e12597daffea8bb763711d95.r1.cf2.rackcdn.com/Mixer-CakePHP-Logo-Color.svg" height="46"></p>

<p align="center">
<a href="https://packagist.org/packages/CakeDC/mixer"><img src="https://poser.pugx.org/CakeDC/mixer/v/stable.png" alt="Latest Version"></a>
<a href="https://packagist.org/packages/CakeDC/mixer"><img src="https://poser.pugx.org/CakeDC/mixer/license.svg" alt="License"></a>
</p>

A plugin to discover and manage CakePHP plugins.

Requirements
------------

* PHP 5.6+
* CakePHP 3.4+

Installation
-------

You can install this plugin into your CakePHP application using [composer](http://getcomposer.org/doc/00-intro.md).

The recommended way to install composer packages is:

```
composer require --dev cakedc/mixer
```

Ensure Mixer Plugin is loaded in your config/bootstrap.php file

```php
if (Configure::read('debug')) {
    Plugin::load('CakeDC/Mixer', ['bootstrap' => true, 'routes' => true]);
}
```

Now you can navigate to your app `/mixer` URL and start discovery and managing your plugins!

**Warning:** we don't want you to use Mixer in production. That's why we're asking to add it to `require-dev` composer.json section and it will only work when `debug` is on.

Support
-------

For bugs and feature requests, please use the [issues](https://github.com/CakeDC/mixer/issues) section of this repository.

Commercial support is also available, [contact us](https://www.cakedc.com/contact) for more information.

Contributing
------------

This repository follows the [CakeDC Plugin Standard](https://www.cakedc.com/plugin-standard). If you'd like to contribute new features, enhancements or bug fixes to the plugin, please read our [Contribution Guidelines](https://www.cakedc.com/contribution-guidelines) for detailed instructions.

License
-------

Copyright 2017 Cake Development Corporation (CakeDC). All rights reserved.

Licensed under the [MIT](http://www.opensource.org/licenses/mit-license.php) License. Redistributions of the source code included in this repository must retain the copyright notice found in each file.
