<div id="plugins" xmlns:v-on="http://www.w3.org/1999/xhtml" xmlns:v-bind="http://www.w3.org/1999/xhtml">
    <form method="get" accept-charset="utf-8" id="search" action="" v-on:submit.prevent="search">
        <div class="input-group">
            <input type="text" name="q" placeholder="Search..." class="input-lg form-control" :value="query" @input="updateQuery" />
            <span class="input-group-btn"><button class="btn-lg btn btn-default" type="submit"><i class="fa fa-search"></i></button></span>
        </div>
    </form>
    <div class="row clearfix" v-bind:class="{ loading: isLoading }">
        <div class="col-sm-5">
            <div v-if="plugins != null">
                <template v-if="plugins.length > 0">
                    <div class="panel panel-default" v-for="plugin in plugins">
                        <div class="panel-heading">
                            <a :href="plugin.repository" v-on:click.prevent="selectedId = plugin.id">{{ plugin.name }}</a>
                            <div class="pull-right">
                                <span><i class="fa fa-download"></i> {{ plugin.downloads }}</span>
                                <span><i class="fa fa-star"></i> {{ plugin.stars }}</span>
                            </div>
                        </div>
                        <div class="panel-body">{{ plugin.description }}</div>
                    </div>
                </template>
                <template v-else>
                    <p>Not found</p>
                </template>
            </div>
        </div>
        <div class="col-sm-7">
            <div class="panel panel-default" v-if="selected">
                <div class="panel-heading clearfix">
                    <a v-if="selected.is_installed" href="#" class="btn btn-danger">Uninstall</a>
                    <a v-else href="#" class="btn btn-primary">Install</a>
                    <div class="pull-right">
                        <span><i class="fa fa-download"></i> {{ selected.downloads }}</span>
                        <span><i class="fa fa-star"></i> {{ selected.stars }}</span>
                    </div>
                </div>
                <div class="panel-body" v-html="compiledMarkdown"></div>
            </div>
            <div v-else>
                hello
            </div>
        </div>
    </div>
</div>
$this->append('script'); ?>
<script>
    var apiURL = '<?= \Cake\Core\Configure::read('Mixer.api') ?>';
    var installedPackages = <?= json_encode($installed) ?>;
</script>
<?php $this->end(); ?>
<?php $this->append('script', $this->Html->script('CakeDC/Mixer.app')) ?>
