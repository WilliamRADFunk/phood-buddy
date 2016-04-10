
//*** USE OF SCRIPT REQUIRES WEBPAGE TO INCORPORATE... firebase.js, auth.js ***


/*List of Callback Functions for Frontend use
	
	- cb(boolean) = User resgistration/login was successful or failed
	- grocerycb(Object) = contains user grocerylist object. 

*/



//This function is used as a input for auth functions that manages return of either error or authData
//To be used with: fblogin, twitterlogin, googlelogin.
function authLogin(error, authData)
{
	if (error)
	{
		console.log("Login Failed!", error);
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
	  		console.log("USER MUST CREATE ACCOUNT")
	  		var ref = new Firebase("https://phoodbuddy.firebaseio.com");
	  		ref.unauth();
	  		cb(false);
	  	}
		
		});
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
		fname    : fnameString,
		lname    : lnameString,
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
    		setAccount(userData);
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

function setAccount(userData)
{

	var ref = new Firebase("https://phoodbuddy.firebaseio.com");

	ref.child("users").child(userData.uid).set({
			      provider: "password",
			      name: ""
			    });
}


function fbRegister(cb)
{
	// Simple login for facebook. authData has user data

	//This creates reference to database that than uses that reference call to authenticate with current user. 
	var ref = new Firebase("https://phoodbuddy.firebaseio.com");
	ref.authWithOAuthPopup("facebook", authHandler);
}

function fbLogin(cb)
{
	var ref = new Firebase("https://phoodbuddy.firebaseio.com");
	ref.authWithOAuthPopup("facebook", function(error, authData, cb) {

		if (error)
		{
			console.log("Login Failed!", error);
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
			  	console.log("USER MUST CREATE ACCOUNT")
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
	ref.authWithOAuthPopup("twitter", authHandler);
}

function twitterLogin(cb)
{
	var ref = new Firebase("https://phoodbuddy.firebaseio.com");
	ref.authWithOAuthPopup("twitter", function(error, authData) {

		if (error)
		{
			console.log("Login Failed!", error);
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
			  	console.log("USER MUST CREATE ACCOUNT")
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
	ref.authWithOAuthPopup("google", authHandler);
}

function googleLogin(cb)
{
	var ref = new Firebase("https://phoodbuddy.firebaseio.com");
	ref.authWithOAuthPopup("facebook", function(error, authData) {

		if (error)
		{
			console.log("Login Failed!", error);
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
			  	console.log("USER MUST CREATE ACCOUNT")
			  	var ref = new Firebase("https://phoodbuddy.firebaseio.com");
			  	ref.unauth();
			  	cb(false);
			  }
				
			});
		}

	});
}


function cb(target)
{
	if(target)
	{
		console.log("Its ALIVE!");
	}
	else
	{
		console.log("it worked?");
	}
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
  		cb(false);
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


function getGroceryList()
{
	var ref  = new Firebase("https://phoodbuddy.firebaseio.com/");

	if(ref.getAuth === null)
		{
			return;
		}

	var data = ref.getAuth();
	var gref = new Firebase("https://phoodbuddy.firebaseio.com/grocery/");

	var groceryList = "";

	gref.once('value', function(snapshot){
		if(snapshot.hasChild(data.uid))
		{
			console.log("User has groceryList, proceed normally");
			groceryListSnapshot = snapshot.child(data.uid);
			groceryList = groceryListSnapshot.val();
			cb(groceryList);
		}
		else
		{
			return;
		}
	});	
}

function addGrocery(contentJson)
{

	//DEBUG : WARNING ::: Convert impending input into Javascript object, set equal to 'contentJson
	// DEBUG :  DUMMY VALUE var contentJson = { "name": "apple", "description": "That thing", "quantity": "3", "unit": "loafes", "category": "meat"};

	var ref  = new Firebase("https://phoodbuddy.firebaseio.com/");
	if(ref.getAuth() === null)
	{
		return;
	}

	var data = ref.getAuth();
	var gref = new Firebase("https://phoodbuddy.firebaseio.com/grocery/");

	var newGroceryRef = gref.child(data.uid).push();
	newGroceryRef.set(contentJson);
	console.log(contentJson);

	cb(newGroceryRef.name()); //This cb contains the name of the created key for new object. May not need callback

}

function editGrocery(contentJson)
{
	//WARNING ::: Convert impending input into Javascript object (if not already), and set equal to 'contentJson'
	// DEBUG :  DUMMY VALUE var contentJson = {"-KEnu2ENxPZIixIbbXG4":{"name": "banana", "description": "That other thing", "quantity": "2", "unit": "loafes", "category": "meat"}};

	var keys = Object.keys(contentJson);

	var ref  = new Firebase("https://phoodbuddy.firebaseio.com/");
	if(ref.getAuth() === null)
	{
		return;
	}

	var data = ref.getAuth();
	var gref = new Firebase("https://phoodbuddy.firebaseio.com/grocery/" + data.uid + "/");

	console.log(keys[0]);

	gref.once('value', function(snapshot){

		if(snapshot.hasChild(keys[0]))
		{
			var newGrocery = contentJson[keys[0]];
			gref.child(keys[0]).set(newGrocery);
		}
	});
}

function deleteGrocery(contentKey)
{
	//WARNING ::: Convert impending input into Javascript object, set equal to 'contentJson'

	var ref  = new Firebase("https://phoodbuddy.firebaseio.com/");
	if(ref.getAuth() === null)
	{
		return;
	}

	var data = ref.getAuth();

	//Needs to add key to URL path and remove using 'gref.remove()'
	var gref = new Firebase("https://phoodbuddy.firebaseio.com/grocery/" + data.uid + "/" + contentKey);
	gref.remove();


}



function postRecipe()
{
	var recipeJson = {name:"Tossed Salad and Scambled Eggs", author: "Trump", custom: false};

	var ref = new Firebase("https://phoodbuddy.firebaseio.com/");
	if(ref.getAuth() === null)
	{
		return;
	}

	var data = ref.getAuth();
	var recipeRef = new Firebase("https://phoodbuddy.firebaseio.com/recipe-directory");
	var newRecipeRef = recipeRef.push();
	newRecipeRef.set(recipeJson);
	console.log(newRecipeRef); //DEBUG

	var recipeId = newRecipeRef.key();

	var storeJson = {};
	storeJson[recipeId] = true;

	ref.child("users").child(data.uid).child("created-recipe").update(storeJson);
}

function getUserRecipes(cb)
{
	var ref = new Firebase("https://phoodbuddy.firebaseio.com/");

	if(ref.getAuth() === null)
	{
		return;
	}

	var data = ref.getAuth();

	var checkRef = new Firebase("https://phoodbuddy.firebaseio.com/users/" + data.uid);
	var recipeList;
	var recipeContentString = '{"info":[]}';
	var recipeContentJson = JSON.parse(recipeContentString);
	console.log(recipeContentJson);

	//Check reference point made of user account and check if 'created-recipe' child exists
	checkRef.once('value', function(snapshot){

		//Snapshot contains child 'created-recipe'
		if(snapshot.child("created-recipe").exists())
		{

			//Set recipeList to snapshot value of all content of 'created-recipe' from user
			recipeList = snapshot.child("created-recipe").val();

			var directoryRef = new Firebase("https://phoodbuddy.firebaseio.com/recipe-directory");

			//Retrieve snapshot of all recipes in directory
			directoryRef.once("value", function(snapshot)
			{
				//cycle through each key of previous snapshot
				snapshot.forEach(function(childSnapshot)
				{
					//Set current key of 'recipe-directory' to temporary variable
					//Cycle through the keys provided by snapshot of users 'created-recipe' to find link
					var directoryKey = childSnapshot.key();
					for(var key in recipeList)
					{
						if(recipeList.hasOwnProperty(key))
						{

							//Keys match! Append data to JSON array
							if(key == directoryKey)
							{
								recipeContentJson.info.push(childSnapshot.val());
								break;
							}
						}
					}
				});//End: forEach -> 'recipe-directory'
			});//END: snapshot -> 'recipe-directory'
			cb(recipeContentJson); //This cb will return the JSON of all recipes
		}//END: if user has created recipes
	});//END: snapshot -> 'users/uid'

	console.log(recipeContentJson); //DEBUG: This currently works for retrieving information.
	return recipeContentJson;

}

function getUserCreatedRecipes()
{
	var directoryRef = new Firebase("https://phoodbuddy.firebaseio.com/recipe-directory");

	var recipeContentString = '{"info":[]}';
	var recipeContentJson = JSON.parse(recipeContentString);

	var query = directoryRef.orderByChild("custom").equalTo(true);

	
	query.once("value", function(querySnapshot)
	{
		console.log(querySnapshot.val());

		querySnapshot.forEach(function(childSnapshot){

			recipeContentJson.info.push(childSnapshot.val());

		});

		//cb(recipeContetnJson);

	});


}


