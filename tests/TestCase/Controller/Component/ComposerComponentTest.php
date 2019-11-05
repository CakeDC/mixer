<?php
namespace CakeDC\Mixer\Test\TestCase\Controller\Component;

use CakeDC\Mixer\Controller\Component\ComposerComponent;
use Cake\Controller\ComponentRegistry;
use Cake\TestSuite\TestCase;

/**
 * CakeDC\Mixer\Controller\Component\ComposerComponent Test Case
 */
class ComposerComponentTest extends TestCase
{

    /**
     * Test subject
     *
     * @var \CakeDC\Mixer\Controller\Component\ComposerComponent
     */
    public $Composer;

    /**
     * Setup the test case, backup the static object values so they can be restored.
     * Specifically backs up the contents of Configure and paths in App if they have
     * not already been backed up.
     *
     * @return void
     */
    public function setUp(): void
    {
        parent::setUp();
        $registry = new ComponentRegistry();
        $this->Composer = new ComposerComponent($registry);
    }

    /**
     * tearDown method
     *
     * @return void
     */
    public function tearDown(): void
    {
        unset($this->Composer);

        parent::tearDown();
    }

    /**
     * Test initial setup
     *
     * @return void
     */
    public function testInitialization()
    {
        $this->markTestIncomplete('Not implemented yet.');
    }
}
