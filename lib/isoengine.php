<?php
defined('ISOENGINE') or die('Restricted access');

class IsoEngine
{
	private static $config = null;
	
	public static function getConfig() {
		if(!self::$config) {
			self::$config = new Config();
		}
		
		return self::$config;
	}
}