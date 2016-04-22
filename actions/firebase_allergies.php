<?php
    require_once('/php_config.php');
	require '/libs/firebase-php-master/src/firebaseLib.php';

	$token = FB_TOKEN;
	$url = 'https://phoodbuddy.firebaseio.com';
	
	$firebase = new  \Firebase\FirebaseLib($url, $token);
	$user = 'user1';
	$data = $firebase->get("/users/{$user}/allergy-list");
	//$data = $firebase->get('/users/user1/taste');
	//var_dump($data);
	$array = json_decode($data, true);
	echo '<pre>'; 
	print_r($array);
	$allergy_array = explode(',', $array);
	$allergy_list = "";
	foreach ($allergy_array as $value)
	{
		$allergy_list .= json_decode($firebase->get("/allergies/{$value}"));
		$allergy_list .=",";		
	} 
	//remove last comma
	$allergy_list = substr($allergy_list, 0, -1);
	echo '<pre>'; 
	print($allergy_list);
?>