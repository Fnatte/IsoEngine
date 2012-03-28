<?php
defined('ISOENGINE') or die('Restricted access');

$config = IsoEngine::getConfig();

$html_attributes = array();
if($config->language) $html_attributes['lang'] = $config->language;

?>
<!DOCTYPE html>
<html lang=<?php echo $config->language; ?>>
	<head>
		<title><?php echo $config->title; ?></title>
		<meta charset="<?php echo $config->encoding; ?>">
		<?php if($config->webapp_fullscreen) :?>
		<meta name="apple-mobile-web-app-capable" content="yes">
		<?php endif;?>
		
		<link rel="stylesheet" type="text/css" href="assets/css/reset.css" />
		<link rel="stylesheet" type="text/css" href="assets/css/style.css" />
		
		<script src="assets/js/mootools.js"></script>
		
		<!-- Lutfisk JS Library -->
		<script src="assets/js/isoengine/engine.js"></script>
		<script src="assets/js/isoengine/input/input.js"></script>
		<script src="assets/js/isoengine/input/desktop.js"></script>
		<script src="assets/js/isoengine/entities/entity.js"></script>
		<script src="assets/js/isoengine/entities/white.js"></script>
		<script src="assets/js/isoengine/entities/box.js"></script>
		<script src="assets/js/isoengine/math.js"></script>
		<script src="assets/js/isoengine/map.js"></script>
		
		<!-- Game initializer -->
		<script src="assets/js/game.js"></script>
		
	</head>
	<body>