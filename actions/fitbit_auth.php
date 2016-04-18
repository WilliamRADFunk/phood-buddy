<?php
	
	require_once('oauth2-fitbit-master/vendor/autoload.php');
	//require_once("");
	//require_once("");
	$client_id = '227PST';
	$secret = "0808955b42f81e0d5092a299fe543b77";
	$key = "5985e8c8fb09163af879202fcdd7cd79";
	$provider = new djchen\OAuth2\Client\Provider\Fitbit([
		'clientId'		 => $client_id,
		'clientSecret'	 => $secret,
		'redirectUri'      => 'https://phoodbuddy.firebaseapp.com/'
	]);

	// start the session
	session_start();

	// If we don't have an authorization code then get one
	if (!isset($_GET['code'])) {

		// Fetch the authorization URL from the provider; this returns the
		// urlAuthorize option and generates and applies any necessary parameters
		// (e.g. state).
		$authorizationUrl = $provider->getAuthorizationUrl();

		// Get the state generated for you and store it to the session.
		$_SESSION['oauth2state'] = $provider->getState();

		// Redirect the user to the authorization URL.
		header('Location: ' . $authorizationUrl);
		exit;

	// Check given state against previously stored one to mitigate CSRF attack
	} elseif (empty($_GET['state']) || ($_GET['state'] !== $_SESSION['oauth2state'])) {
		unset($_SESSION['oauth2state']);
		exit('Invalid state');

	} 
	else {

		try {

			// Try to get an access token using the authorization code grant.
			$accessToken = $provider->getAccessToken('authorization_code', [
				'code' => $_GET['code']
			]);

			// We have an access token, which we may use in authenticated
			// requests against the service provider's API.
			echo $accessToken->getToken() . "\n";
			echo $accessToken->getRefreshToken() . "\n";
			echo $accessToken->getExpires() . "\n";
			echo ($accessToken->hasExpired() ? 'expired' : 'not expired') . "\n";

			// Using the access token, we may look up details about the
			// resource owner.
			$resourceOwner = $provider->getResourceOwner($accessToken);

			var_export($resourceOwner->toArray());

			// The provider provides a way to get an authenticated API request for
			// the service, using the access token; it returns an object conforming
			// to Psr\Http\Message\RequestInterface.
			$endpoint = $provider->getBaseApiUrl() . "user/-/profile." . FitBit::FORMAT_JSON;
			$request = $provider->getAuthenticatedRequest(
				'GET',
				$endpoint,
				$accessToken
			);
			/*
			$endpoint = $provider->getBaseApiUrl() . "user/-/profile." . FitBit::FORMAT_JSON;
			// endpoint: https://api.fitbit.com/1/user/-/profile.json 
			$provider = new FitBit([
				'clientId'      => $my_client_id_from_fitbit,
				'clientSecret'  => $my_client_secret_from_fitbit,
				'redirectUri'   => $my_callback_url,
			]);

			$request = $provider->getAuthenticatedRequest(
				FitBit::METHOD_GET,
				$endpoint,
				$_SESSION['fitbit']['oauth2']['accessToken']
			);

			$response = $provider->getResponse($request);
			
			
			*/
			// Make the authenticated API request and get the response.
			$response = $provider->getResponse($request);
			var_dump($response);

		} catch (\League\OAuth2\Client\Provider\Exception\IdentityProviderException $e) {

			// Failed to get the access token or user details.
			exit($e->getMessage());

		}

	}

?>