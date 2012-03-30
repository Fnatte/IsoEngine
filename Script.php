<?php
namespace IsoEngine;

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
		
		// Entities
		$this->addClass('isoengine.entities.entity');
		$this->addClass('isoengine.entities.white');
		$this->addClass('isoengine.entities.box');
		$this->addClass('isoengine.entities.blocker');
		
		// Input
		$this->addClass('isoengine.input.input');
		$this->addClass('isoengine.input.desktop');
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
}