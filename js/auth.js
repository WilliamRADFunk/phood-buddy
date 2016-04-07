
//*** USE OF SCRIPT REQUIRES WEBPAGE TO INCORPORATE... firebase.js, auth.js ***


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
    		setAccount(userData);
   

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

function setAccount(userData)
{

	var ref = new Firebase("https://phoodbuddy.firebaseio.com");

	ref.child("users").child(userData.uid).set({
			      provider: "password",
			      name: ""
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

function createGroceryList()
{
	var ref  = new Firebase("https://phoodbuddy.firebaseio.com/");

	if(ref.getAuth == null)
		{
			return;
		}
	
	var data = ref.getAuth();
    var gref = new Firebase("https://phoodbuddy.firebaseio.com/grocery")
	
	  	console.log("Creating new grocery list... even if there was an old one...")
	  	gref.child(data.uid).set({
	  		baby: "",
	  		bakery: "",
	  		beverages: "",
	  		"canned goods": "",
	  		cereals: "",
	  		"cleaning and household": "",
	  		condiments: "",
	  		dairy: "",
	  		frozen: "",
	  		meats: "",
	  		produce: "",
	  		"baking and spices": "",
	  		miscellaneous: ""
	  		
	})

}

function getGroceryList()
{
	var ref  = new Firebase("https://phoodbuddy.firebaseio.com/");

	if(ref.getAuth == null)
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
		}
		else
		{
			return;
		}
	})

	return groceryList;
	
}


function setGroceryList(list)
{
	var ref  = new Firebase("https://phoodbuddy.firebaseio.com/");
	if(ref.getAuth() == null)
	{
		return;
	}

	var data = ref.getAuth();
	var gref = new Firebase("https://phoodbuddy.firebaseio.com/grocery/");

	gref.child(data.uid).set(list);
}

function postRecipe()
{
	var recipeJson = {name:"Tossed Salad and Scambled Eggs", author: "Trump"} 

	var ref = new Firebase("https://phoodbuddy.firebaseio.com/");
	if(ref.getAuth() == null)
	{
		return;
	}

	var data = ref.getAuth();
	var recipeRef = new Firebase("https://phoodbuddy.firebaseio.com/recipe-directory");
	var newRecipeRef = recipeRef.push();
	newRecipeRef.set(recipeJson);

	var recipeId = newRecipeRef.key();

	var storeJson = {};
	storeJson[recipeId] = true;

	ref.child("users").child(data.uid).child("created-recipe").update(storeJson);
}

function getUserRecipes()
{
	var ref = new Firebase("https://phoodbuddy.firebaseio.com/");

	if(ref.getAuth() == null)
	{
		return;
	}

	var data = ref.getAuth();

	var checkRef = new Firebase("https://phoodbuddy.firebaseio.com/users/" + data.uid);
	var recipesExist;
	var recipeList;
	var recipeContent;

	//Check reference point made of user account and check if 'created-recipe' child exists
	checkRef.once('value', function(snapshot){

		//Snapshot contains child 'created-recipe'
		if(snapshot.child("created-recipe").exists())
		{
			recipesExists = true;
			//Set recipeList to snapshot value of 
			recipeList = snapshot.child("created-recipe");
		}
	});



	if(recipesExist)
	{
		recipeContent = getUserRecipeContent(recipeList);


	}
	else
	{
		return null;
	}

}

function getUserRecipeContent(rList)
{
	var ref = new Firebase("https://phoodbuddy.firebaseio.com/recipe-directory");

	var recipeData;

	 ref.once("value", function(snapshot){
	 	rList.forEach(function (rListSnapshot){
	 		snapshot.forEach(function(childSnapshot){

	 			if(rListSnapshot.key() == childSnapshot.key())
	 			{
	 				recipeData += childSnapshot; 
	 			}

	 		})
	 	})
	 	
	 })
}


