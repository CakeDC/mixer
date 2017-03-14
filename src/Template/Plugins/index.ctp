<?php
/** @var \CakeDC\Mixer\View\AppView $this */
use Cake\Utility\Hash;

?>
<?= $this->Form->create(null, ['type' => 'get', 'id' => 'search']) ?>
    <div class="input-group">
        <?= $this->Form->text('search', ['default' => $this->request->query('search'), 'placeholder' => __d('Mixer', 'Search...'), 'class' => 'input-lg']) ?>
        <span class="input-group-btn">
            <?= $this->Form->button($this->Html->tag('i', '', ['class' => 'fa fa-search']), ['class' => 'btn-lg', 'escape' => false]) ?>
        </span>
    </div>
<?= $this->Form->end() ?>

<?php if ($data): ?>
    <?php if ($plugins = Hash::get($data, 'results')): ?>
        <?php foreach ($plugins as $plugin): ?>
            <div class="panel panel-default">
                <div class="panel-heading">
                    <?= $this->Html->link($plugin['name'], $plugin['repository'], ['target' => '_blank']) ?>
                    <div class="pull-right">
                        <span><i class="fa fa-download"></i> <?= $this->Number->format($plugin['downloads']) ?></span>
                        <span><i class="fa fa-star"></i> <?= $this->Number->format($plugin['favers']) ?></span>
                    </div>
                </div>
                <div class="panel-body">
                    <p><?= h($plugin['description']) ?></p>
                    <?php if ($this->Composer->isInstalled($plugin['name'])): ?>
                        <?= $this->Form->postLink(__d('Mixer', 'Remove'), ['action' => 'remove'], ['class' => 'btn btn-danger', 'data' => ['plugin' => $plugin['name']]]) ?>
                    <?php else: ?>
                        <?= $this->Form->postLink(__d('Mixer', 'Install'), ['action' => 'install'], ['class' => 'btn btn-primary', 'data' => ['plugin' => $plugin['name']]]) ?>
                    <?php endif; ?>
                </div>
            </div>
        <?php endforeach; ?>
    <?php else: ?>
        <p><?= __d('Mixer', 'No plugins found') ?></p>
    <?php endif; ?>
<?php endif; ?>
