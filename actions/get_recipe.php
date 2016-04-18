<?php require_once("/client.php"); 
	   require_once("/lib/config.php");
	   require_once("/lib/FatSecretAPI.php");

?>

<?php 
	$consumer_key = "4d7aafe8c2bb44e39c716cbead1f8c3d"; 
	$secret_key = "33cc603c4e33407da31c0d9ce1cc057e"; 
	//Signature Base String 
	//<HTTP Method>&<Request URL>&<Normalized Parameters> 
	$base = rawurlencode("GET")."&"; 
	$base .= "http%3A%2F%2Fplatform.fatsecret.com%2Frest%2Fserver. 
	api&"; 
	//sort params by abc....necessary to build a correct unique signature 
	$params = "method=foods.search&"; 
	$params .= "oauth_consumer_key=$consumer_key&"; // ur consumer key 
	$params .= "oauth_nonce=123&"; 
	$params .= "oauth_signature_method=HMAC-SHA1&"; 
	$params .= "oauth_timestamp=".time()."&"; 
	$params .= "oauth_version=1.0&"; 
	$params .= "search_expression=".urlencode($_GET['query']); 
	$params2 = rawurlencode($params); 
	$base .= $params2; 
	//encrypt it! 
	$sig= base64_encode(hash_hmac('sha1', $base, "$secret_key&", 
	true)); // replace xxx with Consumer Secret 
	//now get the search results and write them down 
	$url = "http://platform.fatsecret.com/rest/server.api?". 
	$params."&oauth_signature=".rawurlencode($sig); 
	//$food_feed = file_get_contents($url); 
	
	list($output,$error,$info) = loadFoods($url); 
	var_dump($info);
	var_dump($error);
	var_dump($output);
	echo '<pre>'; 
	if($error == 0){ 
		if($info['http_code'] == '200') 
			echo $output; 
		else 
			die('Status INFO : '.$info['http_code']); 
	} 

	else 
		die('Status ERROR : '.$error); 
	function loadFoods($url) 
	{ 
			// create curl resource 
			$ch = curl_init(); 
			// set url 
			curl_setopt($ch, CURLOPT_URL, $url); 
			//return the transfer as a string 
			curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1); 
			// $output contains the output string 
			$output = curl_exec($ch); 
			$error = curl_error($ch); 
			$info = curl_getinfo($ch); 
			// close curl resource to free up system resources 
			curl_close($ch); 
			//return array($output,$error,$info); 
			return ($output); 
	} 

?> 