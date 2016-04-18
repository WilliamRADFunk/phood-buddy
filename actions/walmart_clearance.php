<?php
	//http://api.walmartlabs.com/v1/feeds/clearance?apikey={apiKey}&amp;categoryId=3944
	//$food_feed = file_get_contents('http://api.walmartlabs.com/v1/clearance?apiKey=6gqg7jbjpwkatpzf3vv89mwj&l&numItems=25&format=json');
	//$food_feed = file_get_contents('http://api.walmartlabs.com/v1/clearance?apiKey=6gqg7jbjpwkatpzf3vv89mwj&amp&numItems=25&format=json');
	//$food_feed = file_get_contents('http://api.walmartlabs.com/v1/feeds/clearance?apikey=6gqg7jbjpwkatpzf3vv89mwj&amp;format=json');
	//$food_feed = file_get_contents('http://api.walmartlabs.com/v1/feeds/clearance?apiKey=6gqg7jbjpwkatpzf3vv89mwj&format=json');
	$food_feed = file_get_contents('http://api.walmartlabs.com/v1/feeds/rollback?apikey=6gqg7jbjpwkatpzf3vv89mwj&amp;categoryId=3944&format=json');
	//$food_feed = file_get_contents('http://api.walmartlabs.com/v1/feeds/clearance?apiKey=6gqg7jbjpwkatpzf3vv89mwj&format=json');
	$array = json_decode($food_feed, true);
	echo '<pre>'; 
	print_r($array);
	//print_r($food_feed);
	
?>
