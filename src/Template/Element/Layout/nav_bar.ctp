<nav class="navbar navbar-inverse navbar-fixed-top">
    <div class="container">
        <div class="navbar-header">
            <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar" aria-expanded="false" aria-controls="navbar">
                <span class="sr-only">Toggle navigation</span>
                <span class="icon-bar"></span>
                <span class="icon-bar"></span>
                <span class="icon-bar"></span>
            </button>
        </div>
        <div class="row">
            <div class="col-md-12">
                <?= $this->Html->link(__('Mixer'), '/', ['class' => 'navbar-brand']);?>
                <?= $this->Html->link(__('Installed Plugins'), ['_name' => 'installed'], ['class' => 'navbar-brand pull-right']);?>
            </div>
        </div>
        <div id="navbar" class="collapse navbar-collapse">

        </div><!--/.nav-collapse -->
    </div>
</nav>