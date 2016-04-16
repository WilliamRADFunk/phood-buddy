//*** USE OF SCRIPT REQUIRES WEBPAGE TO INCORPORATE... firebase.js, auth.js ***

//This function is used as a input for auth functions that manages return of either error or authData
//To be used with: fblogin, twitterlogin, googlelogin.
function showAuth()
{
	var ref = new Firebase("https://phoodbuddy.firebaseio.com/");

	var data = ref.getAuth();

	console.log(data);
}

function checkAuth()
{
	var ref = new Firebase("https://phoodbuddy.firebaseio.com/");

	if(ref.getAuth() === null)
	{
		return false;	
	}
	else
	{
		return true;
	}

	return true;
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
		cb(false);
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

function customRegister(fnameString, lnameString, emailString, passwordString, cb)
{
	var ref = new Firebase("https://phoodbuddy.firebaseio.com");
	ref.createUser({
		email    : emailString,
		password : passwordString
	}, function(error, userData) {
		if (error) {
			console.log("Error creating user:", error);
			cb(false);
		} 
		else 
		{

			console.log("Successfully created user account with uid:", userData);
			setAccount(userData, fnameString, lnameString, emailString);
			cb(true);
		}
	});
}

function customLogin(emailString, passwordString, cb)
{
	var ref = new Firebase("https://phoodbuddy.firebaseio.com");
	ref.authWithPassword({
		email    : emailString,
		password : passwordString
	}, function(error, authData) {
		if (error) {
			console.log("Login Failed!", error);
			cb(false);
		}
		else
		{
			console.log("Authenticated successfully with payload:", authData);
			cb(true);
		}
	});
}

function setAccount(userData, fnameString, lnameString, emailString)
{

	var fullName = fnameString + " " + lnameString;

	var ref = new Firebase("https://phoodbuddy.firebaseio.com");

	var plannerJsonInit = {sunday:{0:{name:"",recipeId:""},1:{name:"",recipeId:""},2:{name:"",recipeId:""}},monday:{0:{name:"",recipeId:""},1:{name:"",recipeId:""},2:{name:"",recipeId:""}},tuesday:{0:{name:"",recipeId:""},1:{name:"",recipeId:""},2:{name:"",recipeId:""}},wednesday:{0:{name:"",recipeId:""},1:{name:"",recipeId:""},2:{name:"",recipeId:""}},thursday:{0:{name:"",recipeId:""},1:{name:"",recipeId:""},2:{name:"",recipeId:""}},friday:{0:{name:"",recipeId:""},1:{name:"",recipeId:""},2:{name:"",recipeId:""}},sunday:{0:{name:"",recipeId:""},1:{name:"",recipeId:""},2:{name:"",recipeId:""}}};

	ref.child("users").child(userData.uid).set({
					provider: "password",
					"name": fullName,
					profile: {
						fname    : fnameString,
						lname    : lnameString,
						email    : emailString, 
						city     : "",
						state    : "", 
						country  : "",
						street   : "", 
						age      : "",
						favdish  : "",
						favdrink : "",
						gender   : "",
						about    : ""
					},
					allergies: {
						corn          : false,
						egg           : false,
						fish          : false,
						glutten       : false,
						milk          : false,
						peanut        : false,
						"red-meat"    : false,
						sesame        : false,
						"shell-fish"  : false,
						soy           : false,
						"tree-nut"    : false
					},
					taste:{
						bitter: 2.5,
						salty : 2.5,
						sour  : 2.5,
						spicy : 2.5,
						sweet : 2.5
					},
					health:{
						hypertension      : false,
						hypotension       : false,
						"high-cholestorol": false,
						diabetes          : false,
						vegetarian: false
					}
	});

	ref.child("planner").child(userData.uid).set(plannerJsonInit);

}




function fbRegister(cb)
{
	// Simple login for facebook. authData has user data

	//This creates reference to database that than uses that reference call to authenticate with current user. 
	var ref = new Firebase("https://phoodbuddy.firebaseio.com");
	ref.authWithOAuthPopup("facebook", function(error, authData) {
		if (error) 
		{
			console.log("Login Failed!", error);
			cb(false);
		}
		else //Users login attempt successful. Have access to authData
		{
			console.log("Authenticated successfully with payload:", authData);
			checkIfUserExists(authData.uid, authData, cb);  //Checks to see if user payload alaready has account
		}	
	});
}

function fbLogin(cb)
{
	var ref = new Firebase("https://phoodbuddy.firebaseio.com");
	ref.authWithOAuthPopup("facebook", function(error, authData) {

		if (error)
		{
			console.log("Login Failed!", error);
			cb(false);
		}
		else
		{
			console.log("Authenticated successfully with payload:", authData);

			var usersRef = new Firebase("https://phoodbuddy.firebaseio.com/users");
			usersRef.once('value', function(snapshot){
				if(snapshot.hasChild(authData.uid))
				{
					console.log("User stays logged in for having an account");
					cb(true);
				}
				else
				{
					console.log("USER MUST CREATE ACCOUNT");
					var ref = new Firebase("https://phoodbuddy.firebaseio.com");
					ref.unauth();
					cb(false);
				}
			});
		}
	});
}

function twitterRegister(cb) 
{
	//Simple login for twitter. authData has user data

	//This creates reference to database that than uses that reference call to authenticate with current user.
	var ref = new Firebase("https://phoodbuddy.firebaseio.com");
	ref.authWithOAuthPopup("twitter", function(error, authData) {
		if (error) 
		{
			console.log("Login Failed!", error);
			cb(false);
		}
		else //Users login attemp successful. Have access to authData
		{
			console.log("Authenticated successfully with payload:", authData);
			checkIfUserExists(authData.uid, authData, cb);  //Checks to see if user payload alaready has account
		}	
	});
}

function twitterLogin(cb)
{
	var ref = new Firebase("https://phoodbuddy.firebaseio.com");
	ref.authWithOAuthPopup("twitter", function(error, authData) {

		if (error)
		{
			console.log("Login Failed!", error);
			cb(false);
		}
		else
		{
			console.log("Authenticated successfully with payload:", authData);

			var usersRef = new Firebase("https://phoodbuddy.firebaseio.com/users");
			usersRef.once('value', function(snapshot){
				if(snapshot.hasChild(authData.uid))
				{
					console.log("User stays logged in for having an account");
					cb(true);
				}
				else
				{
					console.log("USER MUST CREATE ACCOUNT");
					var ref = new Firebase("https://phoodbuddy.firebaseio.com");
					ref.unauth();
					cb(false);
				}
			});
		}
	});
}


function googleRegister(cb){

	//Simple login for twitter. authData has user data
	//This creates reference to database that than uses that reference call to authenticate with current user.

	var ref = new Firebase("https://phoodbuddy.firebaseio.com");
	ref.authWithOAuthPopup("facebook", function(error, authData) {
		if (error) 
		{
			console.log("Login Failed!", error);
			cb(false);
		}
		else //Users login attemp successful. Have access to authData
		{
			console.log("Authenticated successfully with payload:", authData);
			checkIfUserExists(authData.uid, authData, cb);  //Checks to see if user payload alaready has account
		}	
	});
}

function googleLogin(cb)
{
	var ref = new Firebase("https://phoodbuddy.firebaseio.com");
	ref.authWithOAuthPopup("google", function(error, authData) {

		if (error)
		{
			console.log("Login Failed!", error);
			cb(false);
		}
		else
		{
			console.log("Authenticated successfully with payload:", authData);

			var usersRef = new Firebase("https://phoodbuddy.firebaseio.com/users");
			usersRef.once('value', function(snapshot){
				if(snapshot.hasChild(authData.uid))
				{
					console.log("User stays logged in for having an account");
					cb(true);
				}
				else
				{
					console.log("USER MUST CREATE ACCOUNT");
					var ref = new Firebase("https://phoodbuddy.firebaseio.com");
					ref.unauth();
					cb(false);
				}
			});
		}
	});
}

// find a suitable name based on the meta info given by each provider
function getName(authData)
{
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
function checkIfUserExists(userId, authData, cb) {

	var usersRef = new Firebase("https://phoodbuddy.firebaseio.com/users");
	usersRef.once('value', function(snapshot){
		if(snapshot.hasChild(userId))
		{
			console.log("User Already Exists");
			cb(false);
		}
		else
		{
			var ref = new Firebase("https://phoodbuddy.firebaseio.com");

			var plannerJsonInit = {sunday:{0:{name:"",recipeId:""},1:{name:"",recipeId:""},2:{name:"",recipeId:""}},monday:{0:{name:"",recipeId:""},1:{name:"",recipeId:""},2:{name:"",recipeId:""}},tuesday:{0:{name:"",recipeId:""},1:{name:"",recipeId:""},2:{name:"",recipeId:""}},wednesday:{0:{name:"",recipeId:""},1:{name:"",recipeId:""},2:{name:"",recipeId:""}},thursday:{0:{name:"",recipeId:""},1:{name:"",recipeId:""},2:{name:"",recipeId:""}},friday:{0:{name:"",recipeId:""},1:{name:"",recipeId:""},2:{name:"",recipeId:""}},sunday:{0:{name:"",recipeId:""},1:{name:"",recipeId:""},2:{name:"",recipeId:""}}};

		ref.onAuth(function(authData)
		{
			if (authData)
			{
				console.log("This is a new user!");
				// save the user's profile into the database so we can list users,
				ref.child("users").child(authData.uid).set({
					provider: authData.provider,
					name: getName(authData), // retrieves name from payload
					profile: {
						fname    : "",
						lname    : "",
						email    : "", 
						city     : "",
						state    : "", 
						country  : "",
						street   : "", 
						age      : "",
						favdish  : "",
						favdrink : "",
						gender   : "",
						about    : ""
					},
					allergies: {
						corn          : false,
						egg           : false,
						fish          : false,
						glutten       : false,
						milk          : false,
						peanut        : false,
						"red-meat"    : false,
						sesame        : false,
						"shell-fish"  : false,
						soy           : false,
						"tree-nut"    : false
					},
					taste:{
						bitter: 2.5,
						salty : 2.5,
						sour  : 2.5,
						spicy : 2.5,
						sweet : 2.5
					},
					health:{
						hypertension      : false,
						hypotension       : false,
						"high-cholestorol": false,
						diabetes          : false,
						vegetarian: false
					}
				});
				ref.child("planner").child(userData.uid).set(plannerJsonInit);
				cb(true);
			}
			else
			{
				cb(false);
				console.log("invalid payload");
			}
		});
		}
	});
}




//High Blood Pressure = hypertension
//High Choloestorl
//Diabetes
// Low Blood Pressure = hypotension
//Vegetarian




