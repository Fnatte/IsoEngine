<?php

define('DS', DIRECTORY_SEPARATOR);

/**
 * Autoloads classes.
 *
 */
class IsoEngineLoader
{
	public function __construct()
	{
		spl_autoload_register(array($this, 'load'));
	}
	
	private function load($className)
	{
		// Guess the file path for the class
		$path = dirname(__FILE__) . DS . strtolower($className) . '.php';
		
		// Include file if found
		if(is_file($path)) {
			include_once($path);
		} else {
			throw new Exception('Failed to load class: $className');
		}
	}
}

// Create a instance of the loader
new IsoEngineLoader();