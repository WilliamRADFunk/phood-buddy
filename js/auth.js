
//*** USE OF SCRIPT REQUIRES WEBPAGE TO INCORPORATE... firebase.js, auth.js ***


//This function is used as a input for auth functions that manages return of either error or authData
//To be used with: fblogin, twitterlogin, googlelogin.
function authLogin(error, authData)
{
	if (error)
	{
		console.log("Login Failed!", error)
	}
	else
	{
		console.log("Authenticated successfully with payload:", authData);

		var usersRef = new Firebase("https://phoodbuddy.firebaseio.com/users");
  		usersRef.once('value', function(snapshot){
	  	if(snapshot.hasChild(authData.uid))
	  	{
	  		console.log("User stays logged in for having an account");
	  	}
	  	else
	  	{
	  		console.log("USER MUST CREATE ACCOUNT")
	  		var ref = new Firebase("https://phoodbuddy.firebaseio.com");
	  		ref.unauth();
	  	}
		
		})
	}
}

function authLogout()
{
	var ref = new Firebase("https://phoodbuddy.firebaseio.com");
	ref.unauth();
}

function authHandler(error, authData) 
{

	//Users login attempt failed
  if (error) 
  {
    console.log("Login Failed!", error);
  } 
  else //Users login attemp successful. Have access to authData
  {
    console.log("Authenticated successfully with payload:", authData);

    checkIfUserExists(authData.uid, authData);  //Checks to see if user payload alaready has account
	
  }	
}

// Create a callback which logs the current auth state
function authDataCallback(authData) {
  if (authData) {
    console.log("User " + authData.uid + " is logged in with " + authData.provider);
  } else {
    console.log("User is logged out");
  }
}

// Register the callback to be fired every time auth state changes
//var ref = new Firebase("https://<YOUR-FIREBASE-APP>.firebaseio.com");
//ref.onAuth(authDataCallback);


function customRegister(emailString, passwordString)
{
	var ref = new Firebase("https://phoodbuddy.firebaseio.com");
	ref.createUser({
  		email    : emailString,
  		password : passwordString
	}, function(error, userData) {
  		if (error) {
   	 		console.log("Error creating user:", error);
  		} 
  		else 
  		{
    		console.log("Successfully created user account with uid:", userData);
  		}
	});
}

function customLogin(emailString, passwordString)
{
	var ref = new Firebase("https://phoodbuddy.firebaseio.com");
	ref.authWithPassword({
  		email    : emailString,
  		password : passwordString
	}, function(error, authData) {
  		if (error) {
    		console.log("Login Failed!", error);
  		} 
  		else 
  		{
    		console.log("Authenticated successfully with payload:", authData);
  		}
	});
}


function fbRegister()
{
	// Simple login for facebook. authData has user data

	//This creates reference to database that than uses that reference call to authenticate with current user. 
	var ref = new Firebase("https://phoodbuddy.firebaseio.com");
	ref.authWithOAuthPopup("facebook", authHandler);
}

function fbLogin()
{
	var ref = new Firebase("https://phoodbuddy.firebaseio.com");
	ref.authWithOAuthPopup("facebook", authLogin);
}

function twitterRegister() 
{
	//Simple login for twitter. authData has user data

	//This creates reference to database that than uses that reference call to authenticate with current user.
	var ref = new Firebase("https://phoodbuddy.firebaseio.com");
	ref.authWithOAuthPopup("twitter", authHandler);
}

function twitterLogin()
{
	var ref = new Firebase("https://phoodbuddy.firebaseio.com");
	ref.authWithOAuthPopup("twitter", authLogin);
}


function googleRegister(){

	//Simple login for twitter. authData has user data
	//This creates reference to database that than uses that reference call to authenticate with current user.

	var ref = new Firebase("https://phoodbuddy.firebaseio.com");
	ref.authWithOAuthPopup("google", authHandler);
}

function googleLogin()
{
	var ref = new Firebase("https://phoodbuddy.firebaseio.com");
	ref.authWithOAuthPopup("google", authLogin);
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

//Checks authentication payload if user already exists. Returns true if UserID does not exist in users tree
function checkIfUserExists(userId, authData) {

  var usersRef = new Firebase("https://phoodbuddy.firebaseio.com/users");
  usersRef.once('value', function(snapshot){
  	if(snapshot.hasChild(userId))
  	{
  		console.log("User Already Exists");
  	}
  	else
  	{
  		var ref = new Firebase("https://phoodbuddy.firebaseio.com");

		ref.onAuth(function(authData) 
		{
			 if (authData)
			 {
			 	console.log("This is a new user!");
			    // save the user's profile into the database so we can list users,
			    ref.child("users").child(authData.uid).set({
			      provider: authData.provider,
			      name: getName(authData)  // retrieves name from payload
			    });
			 }
			 else
			 {
			 	console.log("invalid payload");
			 }
		});
  	}
});
  
}