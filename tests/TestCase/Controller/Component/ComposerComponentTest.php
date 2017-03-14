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
     * setUp method
     *
     * @return void
     */
    public function setUp()
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
    public function tearDown()
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
