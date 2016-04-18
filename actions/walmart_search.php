<?php


//Signature Base String
//<HTTP Method>&<Request URL>&<Normalized Parameters>
//$base = rawurlencode("GET")."&";
//$base .= "http%3A%2F%2Fplatform.fatsecret.com%2Frest%2Fserver.api&";

//sort params by abc....necessary to build a correct unique signature
/*
$params = "apiKey=6gqg7jbjpwkatpzf3vv89mwj&"; // ur consumer key

$params .= "query=".urlencode($_GET['query']);
$params = "&format=json&";

$params2 = rawurlencode($params);
$base .= $params2;

//encrypt it!
//$sig= base64_encode(hash_hmac('sha1', $base, "33cc603c4e33407da31c0d9ce1cc057e&", true)); // replace xxx with Consumer Secret


//now get the search results and write them down
$url = "http://api.walmartlabs.com/v1/search?".$params;
*/
$food_feed = file_get_contents('http://api.walmartlabs.com/v1/search?apiKey=6gqg7jbjpwkatpzf3vv89mwj&l&query=cabbage&format=json');
//print_r($food_feed);
//$food_feed = file_get_contents($url);
$array = json_decode($food_feed, true);
echo '<pre>'; 
print_r($array);
//echo  "id: " . $array['recipes']['recipe'][0]['recipe_id'];


?>