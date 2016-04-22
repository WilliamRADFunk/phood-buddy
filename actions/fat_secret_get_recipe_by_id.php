<?php
    require_once('/php_config.php');

    //Signature Base String
    //<HTTP Method>&<Request URL>&<Normalized Parameters>
    $id = $_GET['recipe_id'];
    echo "<br>".$id."<br>";
    $base = rawurlencode("GET")."&";
    $base .= "http%3A%2F%2Fplatform.fatsecret.com%2Frest%2Fserver.api&";

    //sort params by abc....necessary to build a correct unique signature
    $params = "format=json&";
    $params .= "method=recipe.get&";

    $params .= "oauth_consumer_key=".FS_CONSUMER_KEY; // ur consumer key
    $params .= "oauth_nonce=123&";
    $params .= "oauth_signature_method=HMAC-SHA1&";
    $params .= "oauth_timestamp=".time()."&";
    $params .= "oauth_version=1.0&";

    $params .= "recipe_id=".urlencode($_GET['recipe_id']);
    //$params .= "&format=json";
    $params2 = rawurlencode($params);
    $base .= $params2;

    //encrypt it!
    $sig= base64_encode(hash_hmac('sha1', $base, FS_CONSUMER_SECRET, true)); 
    echo("sig:");
    echo($sig);

    //now get the search results and write them down
    $url = "http://platform.fatsecret.com/rest/server.api?".$params."&oauth_signature=".rawurlencode($sig);
    $food_feed = file_get_contents($url);
    return $food_feed;
    
?>