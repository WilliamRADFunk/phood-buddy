<?php
	require '/libs/firebase-php-master/src/firebaseLib.php';
	$token = 'Bu23qo0TN9kGK0yl6UjsvNK9Ao3YzduX8M480ucR';
	$url = 'https://phoodbuddy.firebaseio.com';
	
	$firebase = new  \Firebase\FirebaseLib($url, $token);
	$data = $firebase->get('/users/user1/taste');
	//$data = $firebase->get('/users/user1/taste');
	//var_dump($data);
	$array = json_decode($data, true);
	echo '<pre>'; 
	print_r($array);
/*


//$firebase->get('something/from/somewhere');

/*$server   = "localhost";
$database = "database";
$username = "user";
$password = "password";

if (!$mysqlConnection)
{
  echo "Please try later.";
}
else
{
mysql_select_db($database, $mysqlConnection);
}
*/
?>