<?php

	//$food_feed = file_get_contents('http://api.walmartlabs.com/v1/search?apiKey=6gqg7jbjpwkatpzf3vv89mwj&l&query=cabbage&format=json');
	$food_feed = file_get_contents('http://api.walmartlabs.com/v1/vod?apiKey=6gqg7jbjpwkatpzf3vv89mwj&format=json');
	//print_r($food_feed);
	//$food_feed = file_get_contents($url);
	$array = json_decode($food_feed, true);
	echo '<pre>'; 
	print_r($array);
	//http://api.walmartlabs.com/v1/vod?apiKey={apiKey}
	
?>