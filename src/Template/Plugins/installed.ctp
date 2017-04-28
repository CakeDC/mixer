<?php
use Cake\Routing\Router;
?>
<div id="plugins" xmlns:v-on="http://www.w3.org/1999/xhtml" xmlns:v-bind="http://www.w3.org/1999/xhtml">
    <div class="row clearfix " v-bind:class="{ loading: isLoading }">
        <div class="col-sm-5">
            <div v-if="plugins != null">
                <template v-if="plugins.length > 0">
                    <table class="table table-hover">
                        <thead>
                            <th><?= __('Name');?></th>
                        </thead>
                        <tbody>
                            <tr v-for="plugin in plugins">
                                <td>
                                    <a :href="plugin.name">{{ plugin.name }}</a>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </template>
                <template v-else>
                    <p>Not found</p>
                </template>
            </div>
        </div>
    </div>
</div>
<?php $this->append('script'); ?>
<script>
    var apiURL = '<?= \Cake\Core\Configure::read('Mixer.api') ?>';
    var installedPackages = <?= json_encode($installed) ?>;
</script>
<?php $this->end(); ?>
<?php $this->append('script', $this->Html->script('CakeDC/Mixer.installed')) ?>
