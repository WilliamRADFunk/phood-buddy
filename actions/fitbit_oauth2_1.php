<?php
	require_once('/php_config.php');
	require_once('oauth2-fitbit-master/vendor/autoload.php');
	$client_id = '227PST';
	$secret = FBIT_SECRET;
	$key = FBIT_KEY;
	$provider = new djchen\OAuth2\Client\Provider\Fitbit([
		'clientId'		 => $client_id,
		'clientSecret'	 => $secret,
		'redirectUri'      => 'http://www.williamrobertfunk.com/applications/phood-buddy/actions/fitbit_oauth2_1.php'
	]);

	// start the session
	session_start();

	// If we don't have an authorization code then get one
	if (!isset($_GET['code'])) {

		// Fetch the authorization URL from the provider; this returns the
		// urlAuthorize option and generates and applies any necessary parameters
		// (e.g. state).
		$authorizationUrl = $provider->getAuthorizationUrl();
		//echo('Hello');
		//echo ($authorizationUrl);
		// Get the state generated for you and store it to the session.
		$_SESSION['oauth2state'] = $provider->getState();

		// Redirect the user to the authorization URL.
		header('Location: ' . $authorizationUrl);
		exit;

	// Check given state against previously stored one to mitigate CSRF attack
	} elseif (empty($_GET['state']) || ($_GET['state'] !== $_SESSION['oauth2state'])) {
		unset($_SESSION['oauth2state']);
		exit('Invalid state');

	} else {

		try {

			// Try to get an access token using the authorization code grant.
			$accessToken = $provider->getAccessToken('authorization_code', [
				'code' => $_GET['code']
			]);

			// We have an access token, which we may use in authenticated
			// requests against the service provider's API.
			//echo $accessToken->getToken() . "\n";
			//echo $accessToken->getRefreshToken() . "\n";
			//echo $accessToken->getExpires() . "\n";
			//echo ($accessToken->hasExpired() ? 'expired' : 'not expired') . "\n";

			// Using the access token, we may look up details about the
			// resource owner.
			$resourceOwner = $provider->getResourceOwner($accessToken);

			var_export($resourceOwner->toArray());

			// The provider provides a way to get an authenticated API request for
			// the service, using the access token; it returns an object conforming
			// to Psr\Http\Message\RequestInterface.
			
			/*
			Resource URL
			GET https://api.fitbit.com/1/user/[user-id]/profile.json
			user-id	The encoded ID of the user. Use "-" (dash) for current logged-in user
			*/
			
			$request = $provider->getAuthenticatedRequest(
				'GET',
				'https://api.fitbit.com/1/user/-/profile.json',
				$accessToken
			);
			
			// Make the authenticated API request and get the response.
			$response = $provider->getResponse($request);
			$array = json_decode($response , true);
			echo '<pre>'; 
			print_r($array);
			//echo ($response);
			//var_dump($response);

		} catch (\League\OAuth2\Client\Provider\Exception\IdentityProviderException $e) {

			// Failed to get the access token or user details.
			exit($e->getMessage());

		}

	}

?>