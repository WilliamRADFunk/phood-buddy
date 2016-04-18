<?php

//Signature Base String
//<HTTP Method>&<Request URL>&<Normalized Parameters>
$base = rawurlencode("GET")."&";
$base .= "http%3A%2F%2Fplatform.fatsecret.com%2Frest%2Fserver.api&";

//sort params by abc....necessary to build a correct unique signature
$params = "format=json&";
$params .= "method=recipes.search&";
$params .= "oauth_consumer_key=4d7aafe8c2bb44e39c716cbead1f8c3d&"; // ur consumer key
$params .= "oauth_nonce=123&";
$params .= "oauth_signature_method=HMAC-SHA1&";
$params .= "oauth_timestamp=".time()."&";
$params .= "oauth_version=1.0";
$recipe_query = $_GET['recipe_query'];
$search_str = '';
/*
foreach  ($recipe_query as $ingriedient)
{
	$search_str .=  $ingriedient;
	$search_str .= '&';
}
$search_str = substr($search_str,0,-1);
echo $search_str;
*/
//$params .= "search_expression=".urlencode($_GET['recipe_query']);
/*
$params .= "search_expression=". $search_str;
$params .= "max_results=45";

echo "params: ".$params;
//$recipe_query = explode($_GET);
//$a = json_decode($_GET['recipe_query']);

//$params .= "&format=json";
$params2 = rawurlencode($params);

$base .= $params2;

//encrypt it!
$sig= base64_encode(hash_hmac('sha1', $base, "33cc603c4e33407da31c0d9ce1cc057e&", true)); // replace xxx with Consumer Secret
echo("\n\nsig:");
echo($sig);

//now get the search results and write them down
$url = "http://platform.fatsecret.com/rest/server.api?"."oauth_signature=".rawurlencode($sig)."&".$params;
*/

//$params .= "search_expression=".urlencode($_GET['recipe_query']);
//$params .= "search_expression=".$search_str;
$params2 = rawurlencode($params);
$base .= $params2;

//encrypt it!
$sig= base64_encode(hash_hmac('sha1', $base, "33cc603c4e33407da31c0d9ce1cc057e&", true)); // replace xxx with Consumer Secret
echo("sig:");
echo($sig);

//now get the search results and write them down
$url = "http://platform.fatsecret.com/rest/server.api?".$params."&oauth_signature=".rawurlencode($sig);
$food_feed = file_get_contents($url);
$array = json_decode($food_feed, true);
echo '<pre>'; 
print_r($array);
echo  "id: " . $array['recipes']['recipe'][0]['recipe_id'];




/*
http://localhost:8081/phoodBuddy/search_10_recipes.php?recipe_query=[snapper,onion,mushroom]
?recipe_query=['snapper','onion', 'mushroom']
?recipe_query=snapper&recipe_query=onion&recipe_query=mushroom
?recipe_query[]=snapper&recipe_query[]=onion&recipe_query[]=mushroom
And you can parse a with json_decod]e:

$a = json_decode($_GET['a']); // array(1, 2, 3)
And encode it again with json_encode:

json_encode(array(1, 2, 3)); // "[1,2,3]"

*/
?>