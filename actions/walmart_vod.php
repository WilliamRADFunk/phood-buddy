<?php
//Value Of the Dat
	$food_feed = file_get_contents('http://api.walmartlabs.com/v1/vod?apiKey='.WALMART_KEY.'&format=json');
	$array = json_decode($food_feed, true);
	echo '<pre>'; 
	print_r($array);
	
?>