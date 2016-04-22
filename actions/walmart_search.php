<?php
require_once('/php_config.php');
$food_feed = file_get_contents('http://api.walmartlabs.com/v1/search?apiKey='.WALMART_KEY.'&l&query=cabbage&format=json');
$array = json_decode($food_feed, true);
echo '<pre>'; 
print_r($array);

?>