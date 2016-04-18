<?php
	require '/libs/firebase-php-master/src/firebaseLib.php';
	$token = 'Bu23qo0TN9kGK0yl6UjsvNK9Ao3YzduX8M480ucR';
	$url = 'https://phoodbuddy.firebaseio.com';
	
	$firebase = new  \Firebase\FirebaseLib($url, $token);
	$data = $firebase->get('/users');
	return $data
	
?>