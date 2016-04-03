
//*** USE OF SCRIPT REQUIRES WEBPAGE TO INCORPORATE... firebase.js, auth.js ***


//This function is used as a input for auth functions that manages return of either error or authData
//To be used with: fblogin, twitterlogin, googlelogin.
function authHandler(error, authData) 
{

	//DEBUG tool: Checks object returned by user authentication
  if (error) 
  {
    console.log("Login Failed!", error);
  } 
  else 
  {
    console.log("Authenticated successfully with payload:", authData);
  }


	var isNewUser = true;

	var ref = new Firebase("https://phoodbuddy.firebaseio.com");

	ref.onAuth(function(authData) 
	{
		 if (authData && isNewUser) 
		 {
		    // save the user's profile into the database so we can list users,
		    // use them in Security and Firebase Rules, and show profiles
		    ref.child("users").child(authData.uid).set({
		      provider: authData.provider,
		      name: getName(authData)
		    });
		 }
	});
}

function fblogin()
{
	// Simple login for facebook. authData has user data

	//This creates reference to database that than uses that reference call to authenticate with current user. 
	var ref = new Firebase("https://phoodbuddy.firebaseio.com");
	ref.authWithOAuthPopup("facebook", authHandler);
}

function twitterlogin() 
{
	//Simple login for twitter. authData has user data

	//This creates reference to database that than uses that reference call to authenticate with current user.
	var ref = new Firebase("https://phoodbuddy.firebaseio.com");
	ref.authWithOAuthPopup("twitter", authHandler);
}



function googlelogin(){

	//Simple login for twitter. authData has user data
	//This creates reference to database that than uses that reference call to authenticate with current user.

	var ref = new Firebase("https://phoodbuddy.firebaseio.com");
	ref.authWithOAuthPopup("google", authHandler);
}


// find a suitable name based on the meta info given by each provider
function getName(authData) {
  switch(authData.provider) {
     case 'password':
       return authData.password.email.replace(/@.*/, '');
     case 'twitter':
       return authData.twitter.displayName;
     case 'facebook':
       return authData.facebook.displayName;
     case 'google':
     	return authData.google.displayName;
  }
}