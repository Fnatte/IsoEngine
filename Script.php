<?php
namespace IsoEngine;

include dirname(__FILE__).'/php-closure.php';

class Script
{
	private $classes = array();
	private $paths = array();
	
	function __construct() {
		
	}
	
	public function addPath($class, $path) {
		$this->paths[$class] = $path;
	}
	
	public function addClass($class) {
		if(!in_array($class, $this->classes)) {
			$this->classes [] = $class;
		}
	}
	
	public function addDefaultClasses() {
		
		// Core
		$this->addClass('isoengine.engine');
		$this->addClass('isoengine.map');
		$this->addClass('isoengine.math');
		$this->addClass('isoengine.canvas');
		$this->addClass('isoengine.loader');
		
		// Components
		$this->addClass('isoengine.components.component');
		$this->addClass('isoengine.components.audiomanager');
		$this->addClass('isoengine.components.background');
		$this->addClass('isoengine.components.textblock');
		$this->addClass('isoengine.components.performance');
		$this->addClass('isoengine.components.renderer.renderer');
		$this->addClass('isoengine.components.renderer.diamond');
		$this->addClass('isoengine.components.renderer.zigzag');
		$this->addClass('isoengine.components.renderer.canvas');
		
		// Entities
		$this->addClass('isoengine.entities.entity');
		$this->addClass('isoengine.entities.white');
		$this->addClass('isoengine.entities.box');
		
		// Input
		$this->addClass('isoengine.input.input');
		$this->addClass('isoengine.input.desktop');
		
		$this->addClass('root.rAF');
	}
	
	public function getClassPath($class) {
		
		foreach($this->paths as $root => $path) {
			if(substr($class, 0, strlen($root)) === $root) {
				$class = substr_replace($class, $path, 0, strlen($root));
			}
		}
		
		$path = str_replace('.', '/', $class);
		$path = str_replace('//', '..', $path);
		
		return $path.'.js';
	}
	
	public function getTags() {
		$tags = array();
		$js_path = Factory::getConfig()->js_path;
		foreach($this->classes as $class) {
			$path = $this->getClassPath($class); 
			$tags [] = '<script src="'.$path.'"></script>';
		}
		return $tags;
	}
	
	public function printTags() {
		$tags = $this->getTags();
		foreach($tags as $tag) echo $tag . PHP_EOL;
	}
	
	public function printTagCompiled() {
		$path = $this->getClassPath('compiled.compiled');
		if(!file_exists($path))
			$this->compile($path);
		echo '<script src="'.$path.'"></script>';
	}
	
	public function compile($path) {
		$c = new \PhpClosure();
		foreach($this->classes as $class) {
			$p = $this->getClassPath($class);
			$c->add($p);
		}
		//$c->advancedMode();
		$c->simpleMode();
		$c->useClosureLibrary();
		$result = $c->_compile();
		file_put_contents($path, $result);
	}
}