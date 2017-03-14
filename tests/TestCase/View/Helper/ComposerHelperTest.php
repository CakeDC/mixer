<?php
namespace CakeDC\Mixer\Test\TestCase\View\Helper;

use CakeDC\Mixer\View\Helper\ComposerHelper;
use Cake\TestSuite\TestCase;
use Cake\View\View;

/**
 * CakeDC\Mixer\View\Helper\ComposerHelper Test Case
 */
class ComposerHelperTest extends TestCase
{

    /**
     * Test subject
     *
     * @var \CakeDC\Mixer\View\Helper\ComposerHelper
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
        $view = new View();
        $this->Composer = new ComposerHelper($view);
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
