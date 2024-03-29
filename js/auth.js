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
	console.log("The email provided is" + emailString);

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

	var plannerJsonInit = {sunday:{"breakfast":{name:"",recipeId:""},"lunch":{name:"",recipeId:""},"dinner":{name:"",recipeId:""}},monday:{"breakfast":{name:"",recipeId:""},"lunch":{name:"",recipeId:""},"dinner":{name:"",recipeId:""}},tuesday:{"breakfast":{name:"",recipeId:""},"lunch":{name:"",recipeId:""},"dinner":{name:"",recipeId:""}},wednesday:{"breakfast":{name:"",recipeId:""},"lunch":{name:"",recipeId:""},"dinner":{name:"",recipeId:""}},thursday:{"breakfast":{name:"",recipeId:""},"lunch":{name:"",recipeId:""},"dinner":{name:"",recipeId:""}},friday:{"breakfast":{name:"",recipeId:""},"lunch":{name:"",recipeId:""},"dinner":{name:"",recipeId:""}},saturday:{"breakfast":{name:"",recipeId:""},"lunch":{name:"",recipeId:""},"dinner":{name:"",recipeId:""}},sunday:{"breakfast":{name:"",recipeId:""},"lunch":{name:"",recipeId:""},"dinner":{name:"",recipeId:""}}};

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

	ref.child("grocery").child(userData.uid).set({
		"bakery":{
			name:"Bakery"
		},
		"bakingSpices":{
			name: "Baking and Spices"
		},
		"cannedGoods":{
			"name": "Beverages"
		},
		"cereals":{
			"name": "Cereals"
		},
		"condiments":{
			name:"Condiments"
		},
		"dairy":{
			name: "Dairy"
		},
		"frozen":{
			"name": "Frozen"
		},
		"meats":{
			"name": "Meats"
		},
		"miscellaneous":{
			"name": "Miscellaneous"
		},
		"produce":{
			"name": "Produce"
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
			console.log("Auth failed with popup");
			ref.authWithOAuthRedirect("facebook", function(error, authData){
				if(error)
				{
					console.log("login failed with redirect");
					console.log(error);
					cb(false);
				}
				else
				{
					console.log("Works with authRedirect!");
					console.log(authData);
					checkIfUserExists(authData.uid, authData, cb);
				}
			});
			
		}
		else //Users login attempt successful. Have access to authData
		{
			console.log("Authenticated successfully with authPopup, with payload:", authData);
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
			ref.authWithOAuthRedirect("facebook", function(error, authData){
				if(error)
				{
					console.log("login failed with redirect");
					cb(false);
				}
				else
				{
					console.log("Works with authRedirect!");
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
			console.log("Login Failed with popup!", error);
			ref.authWithOAuthRedirect("twitter", function(error, authData){
				if(error)
				{
					console.log("login failed with redirect");
					console.log(error);
					cb(false);
				}
				else
				{
					console.log("Works with authRedirect!");
					console.log(authData);
					checkIfUserExists(authData.uid, authData, cb);
				}
			});
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
			ref.authWithOAuthRedirect("twitter", function(error, authData){
				if(error)
				{
					console.log("login failed with redirect");
					console.log(error);
					cb(false);
				}
				else
				{
					console.log("Works with authRedirect!");
					console.log(authData);
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
	ref.authWithOAuthPopup("google", function(error, authData) {
		if (error) 
		{
			console.log("Login Failed with popup!", error);
			ref.authWithOAuthRedirect("google", function(error, authData){
				if(error)
				{
					console.log("login failed with redirect");
					console.log(error);
					cb(false);
				}
				else
				{
					console.log("Works with authRedirect!");
					console.log(authData);
					checkIfUserExists(authData.uid, authData, cb);
				}
			});
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
			console.log("Login Failed with popup!", error);
			ref.authWithOAuthRedirect("google", function(error, authData){
				if(error)
				{
					console.log("login failed with redirect");
					console.log(error);
					cb(false);
				}
				else
				{
					console.log("Works with authRedirect!");
					console.log(authData);
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

			var plannerJsonInit = {sunday:{"breakfast":{name:"",recipeId:""},"lunch":{name:"",recipeId:""},"dinner":{name:"",recipeId:""}},monday:{"breakfast":{name:"",recipeId:""},"lunch":{name:"",recipeId:""},"dinner":{name:"",recipeId:""}},tuesday:{"breakfast":{name:"",recipeId:""},"lunch":{name:"",recipeId:""},"dinner":{name:"",recipeId:""}},wednesday:{"breakfast":{name:"",recipeId:""},"lunch":{name:"",recipeId:""},"dinner":{name:"",recipeId:""}},thursday:{"breakfast":{name:"",recipeId:""},"lunch":{name:"",recipeId:""},"dinner":{name:"",recipeId:""}},friday:{"breakfast":{name:"",recipeId:""},"lunch":{name:"",recipeId:""},"dinner":{name:"",recipeId:""}},saturday:{"breakfast":{name:"",recipeId:""},"lunch":{name:"",recipeId:""},"dinner":{name:"",recipeId:""}},sunday:{"breakfast":{name:"",recipeId:""},"lunch":{name:"",recipeId:""},"dinner":{name:"",recipeId:""}}};

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

				ref.child("grocery").child(authData.uid).set({
					"bakery":{
						name:"Bakery"
					},
					"bakingSpices":{
						name: "Baking and Spices"
					},
					"cannedGoods":{
						"name": "Beverages"
					},
					"cereals":{
						"name": "Cereals"
					},
					"condiments":{
						name:"Condiments"
					},
					"dairy":{
						name: "Dairy"
					},
					"frozen":{
						"name": "Frozen"
					},
					"meats":{
						"name": "Meats"
					},
					"miscellaneous":{
						"name": "Miscellaneous"
					},
					"produce":{
						"name": "Produce"
					}
				});
				ref.child("planner").child(authData.uid).set(plannerJsonInit);
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

function fbRegisterTest()
{
	// Simple login for facebook. authData has user data

	//This creates reference to database that than uses that reference call to authenticate with current user. 
	var ref = new Firebase("https://phoodbuddy.firebaseio.com");
	ref.authWithOAuthPopup("facebook", function(error, authData) {
		if (error) 
		{
			console.log("Auth failed with popup");
			ref.authWithOAuthRedirect("facebook", function(error, authData){
				if(error)
				{
					console.log("login failed with redirect");
					console.log(error);
					//cb(false);
				}
				else
				{
					console.log("Works with authRedirect!");
					console.log(authData);
					//checkIfUserExists(authData.uid, authData, cb);
				}
			});
			
		}
		else //Users login attempt successful. Have access to authData
		{
			console.log("Authenticated successfully with authPopup, with payload:", authData);
			//checkIfUserExists(authData.uid, authData, cb);  //Checks to see if user payload alaready has account
		}	
	});
}
//High Blood Pressure = hypertension   === 400 sodium or less
//High Choloestorl 
//Diabetes
// Low Blood Pressure = hypotension  === Raisins, milk, almonds, carrots, lemon, salt, garlic, caffeinated, small frequent meals, limit carbohydrates (35 g of carbohydrates)
//Vegetarian (no meats)




