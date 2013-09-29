<?php
namespace IsoEngine;
defined('ISOENGINE') or die('Restricted access');

class Factory
{
	private static $config = null;
	private static $script = null;
	
	/**
	 * @return IsoEngine\Config
	 */
	public static function getConfig() {
		if(!self::$config) {
			self::$config = new Config();
		}
		
		return self::$config;
	}
	
	/**
	 * @return IsoEngine\Script
	 */
	public static function getScript() {
		if(!self::$script) {
			self::$script = new Script();
		}
		
		return self::$script;
	}
}