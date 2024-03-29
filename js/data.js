//Data Construction Functions
function getGroceryList(cb)
{
	var ref  = new Firebase("https://phoodbuddy.firebaseio.com/");

	if(ref.getAuth === null)
		{
			cb(false);
		}

	var data = ref.getAuth();
	var gref = new Firebase("https://phoodbuddy.firebaseio.com/grocery/");

	var groceryList;

	gref.once('value', function(snapshot){
		if(snapshot.hasChild(data.uid))
		{
			var userId = data.uid;
			console.log("User has groceryList, proceed normally");
			groceryListSnapshot = snapshot.child(userId);
			groceryList = groceryListSnapshot.val();
			groceryList.id = userId;
			cb(groceryList);
		}
		else
		{
			cb(false);
		}
	});
}

function assembleGrocery(name, desc, amt, unit)
{
	var groceryObj = {
		"name": name,
		"description": desc,
		"quantity": amt,
		"unit": unit
	};
	return groceryObj;
}

function addGrocery(category, item, description, quantity, unit, cb)
{

	//DEBUG : WARNING ::: Convert impending input into Javascript object, set equal to 'contentJson
	// DEBUG :  DUMMY VALUE var contentJson = { "name": "apple", "description": "That thing", "quantity": "3", "unit": "loafes", "category": "meat"};

	var ref  = new Firebase("https://phoodbuddy.firebaseio.com/");
	if(ref.getAuth() === null)
	{
		cb(false);
		return;
	}

	var data = ref.getAuth();
	var groceryItem = assembleGrocery(item, description, quantity, unit);
	var gref = new Firebase("https://phoodbuddy.firebaseio.com/grocery/" + data.uid + "/" + category + "/");

	var newGref = gref.child("items").push();
	newGref.update(groceryItem);

	cb(newGref.key()); //This cb contains the new id of the created item.

}

function editGrocery(id, category, item, description, quantity, unit, cb)
{
	//WARNING ::: Convert impending input into Javascript object (if not already), and set equal to 'contentJson'
	// DEBUG :  DUMMY VALUE var contentJson = {"-KEnu2ENxPZIixIbbXG4":{"name": "banana", "description": "That other thing", "quantity": "2", "unit": "loafes", "category": "meat"}};

	var ref = new Firebase("https://phoodbuddy.firebaseio.com/");
	if(ref.getAuth() === null)
	{
		cb(false);
		return;
	}

	var data = ref.getAuth();
	var grefItems = new Firebase("https://phoodbuddy.firebaseio.com/grocery/" + data.uid + "/" + category + "/items/");

	var groceryObj = assembleGrocery(item, description, quantity, unit);

	grefItems.once('value', function(snapshot){

		if(snapshot.hasChild(id))
		{
			var updateRef = grefItems.child(id);
			console.log(id);
			console.log(groceryObj);
			updateRef.update(groceryObj);
			cb(true);
		}
		else
		{
			cb(false);
		}
	});
}

function deleteGrocery(category, contentKey, cb)
{
	//WARNING ::: Convert impending input into Javascript object, set equal to 'contentJson'

	var ref  = new Firebase("https://phoodbuddy.firebaseio.com/");
	if(ref.getAuth() === null)
	{
		cb(false);
		return;
	}

	var data = ref.getAuth();

	//Needs to add key to URL path and remove using 'gref.remove()'
	var gref = new Firebase("https://phoodbuddy.firebaseio.com/grocery/" + data.uid + "/" + category + "/items/");

	if(gref === null)
	{
		cb(false);
	}
	else
	{
		gref.child(contentKey).remove();
		cb(true);
	}
}

function removeAllGrocery(cb)
{
	var ref  = new Firebase("https://phoodbuddy.firebaseio.com/");
	if(ref.getAuth() === null)
	{
		cb(false);
		return;
	}

	var data = ref.getAuth();

	var gref = new Firebase("https://phoodbuddy.firebaseio.com/grocery/" + data.uid + "/");

	gref.set({
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
	cb(true);
}

function assembleRecipe(description, img, name, taste, ingredients, directions, cookTime, prepTime, totalTime, mealTime, cb)
{
	
	var ref = new Firebase("https://phoodbuddy.firebaseio.com/");
	var data = ref.getAuth();
	if(data === null)
	{
		cb(false);
	}

	var fullName;

	var subRef = ref.child("users/" + data.uid + "/");

	subRef.once("value", function(snapshot){

		var nameSnap = snapshot.child("name");
		fullName = nameSnap.val();

		var ingredientList = [];

		for(var i = 0; i < ingredients.length; i++)
		{
			var miniObject = { "name": ingredients[i][0], "quantity": ingredients[i][1], "unit": ingredients[i][2], "description": ingredients[i][3]};
			ingredientList[i] = miniObject;
		}

		var recipeJson =  {
						  "author" : fullName,
						  "cookTime" : cookTime,
						  "custom" : true,
						  "description" : description,
						  ingredientList,
						  "img" : img,
						  directions,
						  "mealTime" : mealTime,
						  "name" : name,
						  "prepTime" : prepTime,
						  "taste" : taste,
						  "totalTime" : totalTime
						};

		postRecipe(recipeJson, cb);
	});
	
}

function postRecipe(recipeJson, cb)
{
	//var recipeJson = {name:"Tossed Salad and Scambled Eggs", author: "Trump", custom: true};

	var ref = new Firebase("https://phoodbuddy.firebaseio.com/");
	if(ref.getAuth() === null)
	{
		cb(false);
		return;
	}

	var data = ref.getAuth();
	var recipeRef = new Firebase("https://phoodbuddy.firebaseio.com/recipe-directory");
	var newRecipeRef = recipeRef.push();
	newRecipeRef.set(recipeJson);
	//DEBUG console.log(newRecipeRef); 

	var recipeId = newRecipeRef.key();

	var storeJson = {};
	storeJson[recipeId] = true;

	ref.child("users").child(data.uid).child("created-recipe").update(storeJson);
	ref.child("users").child(data.uid).child("favorited-recipe").update(storeJson);
	cb(recipeId);
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
	// DEUBG: console.log(recipeContentJson);

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
}

function getFavUserRecipe(count, cb)
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

	var counter = count * 10;
	var decount = 10;
	// DEUBG: console.log(recipeContentJson);

	//Check reference point made of user account and check if 'favorited' child exists
	checkRef.once('value', function(snapshot){

		//Snapshot contains child 'created-recipe'
		if(snapshot.child("favorited-recipe").exists())
		{

			//Set recipeList to snapshot value of all content of 'favorited-recipe' from user
			recipeList = snapshot.child("favorited-recipe").val();

			var array = [];

			for(var key in recipeList)
			{
				if(key.length == 20)
				{
					array.push(key + "");
				}
			}

			var amount = array.length;

			// DEBUG console.log(array);
			var directoryRef = new Firebase("https://phoodbuddy.firebaseio.com/recipe-directory");

			var query = directoryRef.orderByChild("custom").equalTo(true);

			//Retrieve snapshot of all recipes in directory
			query.once("value", function(snapshot)
			{
				//cycle through each key of previous snapshot
				snapshot.forEach(function(childSnapshot)
				{
					//console.log(childSnapshot.val());
					//Set current key of 'recipe-directory' to temporary variable
					//Cycle through the keys provided by snapshot of users 'created-recipe' to find link
					var directoryKey = childSnapshot.key();
					for(var superkey in array)
					{
							//Keys match! Append data to JSON array
							if(array[superkey] == (directoryKey))
							{
								if(counter > 0)
								{
									counter--;
								}
								else
								{
									if(decount > 0)
									{
										var recipeJson = childSnapshot.val();
										recipeJson.id = childSnapshot.key();
										recipeContentJson.info.push(recipeJson);
										decount--;
									}
								}

								break;								
							}
					}

					
				});//End: forEach -> 'recipe-directory'
				cb(recipeContentJson, amount);   //CALL cb here
			});//END: snapshot -> 'recipe-directory'
			//cb(recipeContentJson); //This cb will return the JSON of all recipes
		}//END: if user has created recipes
	});//END: snapshot -> 'users/uid'
}

function getFavOther(count, cb)
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
	// DEUBG: console.log(recipeContentJson);

	var decount = 10;
	var counter = count * 10;

	//Check reference point made of user account and check if 'favorited' child exists
	checkRef.once('value', function(snapshot){

		//Snapshot contains child 'created-recipe'
		if(snapshot.child("favorited-recipe").exists())
		{

			//Set recipeList to snapshot value of all content of 'favorited-recipe' from user
			recipeList = snapshot.child("favorited-recipe").val();

			var array = [];

			for(var key in recipeList)
			{
				if(key.length != 20)
				{
					array.push(key + "");
				}
			}

			// DEBUG console.log(array);
			var amount = array.length;

			
			var directoryRef = new Firebase("https://phoodbuddy.firebaseio.com/recipe-directory");

			var query = directoryRef.orderByChild("custom").equalTo(false);

			//Retrieve snapshot of all recipes in directory
			query.once("value", function(snapshot)
			{
				//cycle through each key of previous snapshot
				snapshot.forEach(function(childSnapshot)
				{
					//console.log(childSnapshot.val());
					//Set current key of 'recipe-directory' to temporary variable
					//Cycle through the keys provided by snapshot of users 'created-recipe' to find link
					var directoryKey = childSnapshot.key();
					for(var superkey in array)
					{
							//Keys match! Append data to JSON array
							if(array[superkey] == (directoryKey))
							{
								if(counter > 0)
								{
									counter--;
								}
								else
								{
									if(decount > 0)
									{
										var recipeJson = childSnapshot.val();
										recipeJson.id = childSnapshot.key();
										recipeContentJson.info.push(recipeJson);
										decount--;
									}

								}

								break;
						
							} 
					}

					
				});//End: forEach -> 'recipe-directory'
				cb(recipeContentJson, amount);   //CALL cb here
			});//END: snapshot -> 'recipe-directory'
			//cb(recipeContentJson); //This cb will return the JSON of all recipes
		}//END: if user has created recipes
	});//END: snapshot -> 'users/uid'
}


function getFavAll(count, cb)
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

	var counter = count * 10;
	var decount = 10;
	// DEUBG: console.log(recipeContentJson);

	//Check reference point made of user account and check if 'favorited' child exists
	checkRef.once('value', function(snapshot){

		//Snapshot contains child 'created-recipe'
		if(snapshot.child("favorited-recipe").exists())
		{

			//Set recipeList to snapshot value of all content of 'favorited-recipe' from user
			recipeList = snapshot.child("favorited-recipe").val();

			var array = [];

			for(var key in recipeList)
			{
					array.push(key + "");
			}

			//console.log(array);

			var amount = array.length;

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
					for(var superkey in array)
					{
							//Keys match! Append data to JSON array
							if(array[superkey] == (directoryKey))
							{
								if(counter > 0)
								{
									counter--;
								}
								else
								{
									if(decount > 0)
									{
										var recipeJson = childSnapshot.val();
										recipeJson.id = childSnapshot.key();
										recipeContentJson.info.push(recipeJson);
										decount--;
									}
								}

								break;
																				
							}
					}

					
				});//End: forEach -> 'recipe-directory'
				cb(recipeContentJson, amount);   //CALL cb here
			});//END: snapshot -> 'recipe-directory'
			//cb(recipeContentJson); //This cb will return the JSON of all recipes
		}//END: if user has created recipes
		else
		{
			cb(false);
		}
	});//END: snapshot -> 'users/uid'
}

function getRandomFavRecipe(day, time, cb)
{
	var ref = new Firebase("https://phoodbuddy.firebaseio.com/");

	if(ref.getAuth() === null)
	{
		cb(false, day, time);
	}

	var data = ref.getAuth();

	var checkRef = new Firebase("https://phoodbuddy.firebaseio.com/users/" + data.uid + "/");
	var recipeList;
	var recipeContentJson = {};

	var decount = 10;
	// DEUBG: console.log(recipeContentJson);

	//Check reference point made of user account and check if 'favorited' child exists
	checkRef.once('value', function(snapshot){

		//Snapshot contains child 'created-recipe'
		if(snapshot.child("favorited-recipe").exists())
		{

			//Set recipeList to snapshot value of all content of 'favorited-recipe' from user
			recipeList = snapshot.child("favorited-recipe").val();
			var num = snapshot.child("favorited-recipe").numChildren();

			if(num === 0 || num === null)
			{
				cb(false, day, time);
			}

			var count = Math.floor(Math.random() * (num));

			var array = [];

			for(var key in recipeList)
			{
					array.push(key + "");
			}

			console.log(array);

			var amount = array.length;


			
			var directoryRef = new Firebase("https://phoodbuddy.firebaseio.com/recipe-directory");

			//Retrieve snapshot of all recipes in directory
			directoryRef.once("value", function(snapshot)
			{
				//cycle through each key of previous snapshot
				snapshot.forEach(function(childSnapshot)
				{
					//console.log(childSnapshot.val());
					//Set current key of 'recipe-directory' to temporary variable
					//Cycle through the keys provided by snapshot of users 'created-recipe' to find link
					var directoryKey = childSnapshot.key();
					for(var superkey in array)
					{
							//Keys match! Append data to JSON array
						if(array[superkey] == (directoryKey))
						{
							if(count > 0)
							{
								count--;
							}
							else
							{
								var name = childSnapshot.child("name").val();
								var recipeId = directoryKey;
								var recipeContentJson = {"name": name, "id": recipeId};
								updatePlanner(day, time, name, recipeId, cb);  //updatePlanner(dayOfWeek, timeOfDay, name, recipeId, cb)
								//cb(recipeContentJson, day, time);  
								return true;
							}
							break;
						}
					}
				});//End: forEach -> 'recipe-directory'
				   //CALL cb here
			});//END: snapshot -> 'recipe-directory'
			//cb(recipeContentJson); //This cb will return the JSON of all recipes
		}//END: if user has created recipes
		else
		{
			cb(false, day, time);
		}
	});//END: snapshot -> 'users/uid'
}

function getUserCreatedRecipes(count, cb) 
{
	var directoryRef = new Firebase("https://phoodbuddy.firebaseio.com/recipe-directory");

	var recipeContentString = '{"info":[]}';
	var recipeContentJson = JSON.parse(recipeContentString);

	var query = directoryRef.orderByChild("custom").equalTo(true);

	
	query.once("value", function(querySnapshot)
	{
		console.log(querySnapshot.val());

		querySnapshot.forEach(function(childSnapshot){

			if(count > 0)
			{
				count--;
			}
			else
			{
				if(decount > 0)
				{
					recipeContentJson.info.push(childSnapshot.val());
					decount--; 
				}
			}
			
		});

		cb(recipeContentJson);

	});

}

function getFatSecretRecipes (count, cb)
{
	var directoryRef = new Firebase("https://phoodbuddy.firebaseio.com/recipe-directory");

	var recipeContentString = '{"info":[]}';
	var recipeContentJson = JSON.parse(recipeContentString);

	var query = directoryRef.orderByChild("custom").equalTo(false);

	var decount = 10;

	
	query.once("value", function(querySnapshot)
	{
		console.log(querySnapshot.val());

		querySnapshot.forEach(function(childSnapshot){

			if(count > 0)
			{
				count--;
			}
			else
			{
				if(decount > 0)
				{
					recipeContentJson.info.push(childSnapshot.val());
					decount--;
				}
			}

		});

		cb(recipeContentJson);

	});
}

function getAllRecipes(count, cb)
{
	var directoryRef = new Firebase("https://phoodbuddy.firebaseio.com/recipe-directory");

	var recipeContentString = '{"info":[]}';
	var recipeContentJson = JSON.parse(recipeContentString);
	var decount = 10;

	directoryRef.once("value", function(snapshot)
	{
		console.log(snapshot.val());

		snapshot.forEach(function(childSnapshot){

			if(count > 0)
			{
				count--;
			}
			else
			{
				if(decount > 0)
				{
					var recipeJson = childSnapshot.val();
					recipeJson.id = childSnapshot.key();
					recipeContentJson.info.push(recipeJson);
					decount--;
				}
			}
		});

		cb(recipeContentJson);

	});
}

function resetPasswordLoggedIn(cb) //DONT WORRY ABOUT THIS ONE
{
	var ref = new Firebase("https://phoodbuddy.firebaseio.com/");

	if(ref.getAuth() === null)
	{
		cb(false);
		return;
	}

	var data = ref.getAuth();

		var user = new firebase("https://phoodbuddy.firebaseio.com/users/" + data.uid + "/");
		user.once("value", function(snapshot){
			var obj = snapshot.val();
			if(obj.provider == "password")
			{
				console.log("Custom user recognized, proceeding to password reset...");
				var userRef = new Firebase("https://phoodbuddy.firebaseio.com/users/" + data.uid + "/profile/");
				userRef.once("value", function(snapshot2){
				var profile = snapshot2.val();
				emailString = profile.email;

				ref.resetPassword({
					email: emailString
				},function(error){
						if(error)
						{
							console.log(error); //ERROR-D
							console.log("password reset function from firebase failed. Returning false...");//ERROR-D
							cb(false);
						}
						else
						{
							cb(true);
						}
					});
				});
			}
			else
			{
				console.log("User is using 3rd party provider. Inform user of 3rd party password reset.");//ERROR-D
				cb(false);
			}
		});
		
	
}

function resetPassword(emailString, cb)
{
	var ref = new Firebase("https://phoodbuddy.firebaseio.com/");

	ref.resetPassword({
					email: emailString
				},function(error){
						if(error)
						{
							console.log(error); //ERROR-D
							console.log("password reset function from firebase failed. Returning false...");//ERROR-D
							cb(false);
						}
						else
						{
							console.log("message has been sent!");//ERROR-D
							cb(true);
						}
					});
}

function changePassword(oldPassword, newPassword, cb)
{
	var ref = new Firebase("https://phoodbuddy.firebaseio.com/");

	if(ref.getAuth() === null)
	{
		cb(false);
		return;
	}

	var data = ref.getAuth();

		var user = new Firebase("https://phoodbuddy.firebaseio.com/users/" + data.uid + "/");
		user.once("value", function(snapshot){
			var obj = snapshot.val();
			if(obj.provider == "password")
			{
				console.log("Custom user recognized, proceeding to password reset...");
				var userRef = new Firebase("https://phoodbuddy.firebaseio.com/users/" + data.uid + "/profile/");
				userRef.once("value", function(snapshot2){
				var profile = snapshot2.val();
				emailString = profile.email;
					
					ref.changePassword({
					  email: emailString,
					  oldPassword: oldPassword,
					  newPassword: newPassword
					}, function(error) {
						if (error) {
							switch (error.code) {
								case "INVALID_PASSWORD":
								console.log("The specified user account password is incorrect.");
							break;
							case "INVALID_USER":
								console.log("The specified user account does not exist.");
							break;
							default:
								console.log("Error changing password:", error);
							}
						}
						else
						{
							console.log("User password changed successfully!");
							cb(true);
						}
					});

				});
			}
			else
			{
				console.log("User is using 3rd party provider. Inform user of 3rd party password reset.");//ERROR-D
				cb(false);
			}
		});
}

function editUserProfile(fname, lname, email, city, country, state, street, age, favdish, favdrink, gender, about, cb) //
{
	var ref = new Firebase("https://phoodbuddy.firebaseio.com/");

	if(state.length > 2)
	{
		console.log("State length is longer than expected length of 2. Returning false...");//ERROR-D
		cb(false);
	}



	if(ref.getAuth() === null)
	{
		cb(false);
		return;
	}

	//Stores authData of package
	var data = ref.getAuth();

	//Assemble package to store
	var profileData = 
	{ 
		"fname"   : fname, 
		"lname"   : lname, 
		"email"   : email, 
		"city"    : city,
		"state"   : state, 
		"country" : country,
		"street"  : street, 
		"age"     : age,
		"favdish" : favdish,
		"favdrink": favdrink,
		"gender"  : gender,
		"about"   : about
	
	};
		
	//DEBUG console.log(profileData);

	var userRef = new Firebase("https://phoodbuddy.firebaseio.com/users/" + data.uid + "/");

	var fullName = fname + " " + lname;

	userRef.update({"name": fullName});
	userRef.child("profile").update(profileData);
	cb(true);

}

function getUserProfile(cb)
{
	var ref = new Firebase("https://phoodbuddy.firebaseio.com/");

	if(ref.getAuth() === null)
	{
		cb(false);
		return;
	}

	var data = ref.getAuth();

	var userRef = new Firebase("https://phoodbuddy.firebaseio.com/users/" + data.uid + "/");

	userRef.once("value", function(snapshot){
		//Assign the snapshots of each segment of user profile data for profile/settings page
		var tasteSnapshot = snapshot.child("taste");
		var allergiesSnapshot = snapshot.child("allergies");
		var profileSnapshot = snapshot.child("profile");
		var healthSnapshot = snapshot.child("health");
		// Extract JSON from snapshots
		var tasteObj = tasteSnapshot.val();
		var allergiesObj = allergiesSnapshot.val();
		var profileObj = profileSnapshot.val();
		var healthObj = healthSnapshot.val();
		//Build JSON
		var contentJson = {};
		contentJson.taste = tasteObj;
		contentJson.allergies = allergiesObj;
		contentJson.profile = profileObj;
		contentJson.health = healthObj;

		cb(contentJson);
	});
}

function getTasteProfile(cb)
{
	var ref = new Firebase("https://phoodbuddy.firebaseio.com/");

	if(ref.getAuth() === null)
	{
		cb("");
		return;
	}

	//Stores authData of package
	var data = ref.getAuth();

	var tasteRef = new Firebase("https://phoodbuddy.firebaseio.com/users/" + data.uid + "/");

	tasteRef.child("taste").once("value", function(snapshot){
		
		var tasteJson = snapshot.val();
		cb(tasteJson);

	});

}

function editTasteProfile(bitter, salty, sour, spicy, sweet, cb)
{

	if( ((parseInt(bitter) < 0) || (parseInt(bitter) > 5)) || ((parseInt(salty) < 0) || (parseInt(salty) > 5)) || ((parseInt(sweet) < 0) || (parseInt(sweet) > 5)) || ((parseInt(sour) < 0) || (parseInt(sour) > 5)) || ((parseInt(spicy) < 0) || (parseInt(spicy) > 5)))
	{
		console.log("A taste paremeter is not within expected bounds [0 - 5] ")//ERROR-D
		cb(false);
		return;
	}


	var ref = new Firebase("https://phoodbuddy.firebaseio.com/");

	if(ref.getAuth() === null)
	{
		cb(false);
		return;
	}

	//Stores authData of package
	var data = ref.getAuth();

	tasteRef = new Firebase("https://phoodbuddy.firebaseio.com/users/" + data.uid + "/taste");

	//Create taste object to update into taste directory of database of user
	tasteObj = {
		"bitter": bitter,
		"salty": salty,
		"sour": sour,
		"spicy": spicy,
		"sweet": sweet
	};
	//Update database reference with constructed object.
	tasteRef.update(tasteObj);
	cb(true);


}

function getUserAllergies(cb)
{
	var ref = new Firebase("https://phoodbuddy.firebaseio.com/");

	if(ref.getAuth() === null)
	{
		cb(false);
			return;
	}

	//Stores authData of package
	var data = ref.getAuth();

	var allergyRef = new Firebase("https://phoodbuddy.firebaseio.com/users/" + data.uid + "/");

	allergyRef.once("value", function(snapshot)
	{
		if(snapshot.child("allergies").exists())
		{
			var contentJson = snapshot.child("allergies").val();
			cb(contentJson);
		}

	});

}

function editUserAllergies(contentJson, cb)
{
	var ref = new Firebase("https://phoodbuddy.firebaseio.com/");

	if(ref.getAuth() === null)
	{
		cb(false);
		return;
	}
	//Stores authData of package
	var data = ref.getAuth();

	tasteRef = new Firebase("https://phoodbuddy.firebaseio.com/users/" + data.uid + "/");

	tasteRef.child("allergies").update(contentJson);
	cb(true);
}

function getUserHealth(cb)
{
	var ref = new Firebase("https://phoodbuddy.firebaseio.com/");

	if(ref.getAuth() === null)
	{
		cb(""); //cb HELP
		return;
	}

	//Stores authData of package
	var data = ref.getAuth();

	var allergyRef = new Firebase("https://phoodbuddy.firebaseio.com/users/" + data.uid + "/");

	allergyRef.once("value", function(snapshot)
	{
		if(snapshot.child("health").exists())
		{
			var contentJson = snapshot.child("health").val();
			cb(contentJson);
		}
		else
		{
			var contentJson1 = {"empty": true};
			cb(contentJson1);
		}

	});

}

function editUserHealth(healthObj, allergyObj, cb)
{
	var ref = new Firebase("https://phoodbuddy.firebaseio.com/");

	var healthKeys = Object.keys(healthObj);
	var allergyKeys = Object.keys(allergyObj);

	if(ref.getAuth() === null)
	{
		cb(false);
		return;
	}

	if(healthKeys.length === 5)
	{
		if(!(("diabetes" in healthObj) && ("high-cholestorol" in healthObj) && ("hypertension" in healthObj) && ("hypotension" in healthObj) && ("vegetarian" in healthObj)))
		{
			console.log("Expected health object keys are not all contained in health object. Returning false");//ERROR-D
			cb(false);
		}
	}
	else
	{
		console.log("Health Object length is not of correct length (5). It is currently " + healthKeys.length);//ERROR-D
		cb(false);
	}

	if(allergyKeys.length === 11)
	{
		if(!(("corn" in allergyObj) && ("egg" in allergyObj) && ("fish" in allergyObj) && ("glutten" in allergyObj) && ("milk" in allergyObj) && ("peanut" in allergyObj) && ("red-meat" in allergyObj) && ("sesame" in allergyObj) && ("shell-fish" in allergyObj) && ("soy" in allergyObj) && ("tree-nut" in allergyObj)))
		{
			console.log("Expected allergy object keys are not all contained in health object. Returning false...");//ERROR-D
			cb(false);
		}
	}
	else
	{
		console.log("Allergy Object length is not of correct length (11). It is currently " + allergyKeys.length);//ERROR-D
		cb(false);
	}

	var ref = new Firebase("https://phoodbuddy.firebaseio.com/");

	//Stores authData of package
	var data = ref.getAuth();
	var userRef = new Firebase("https://phoodbuddy.firebaseio.com/users/" + data.uid + "/");

	//Store objects provided to correct paths.
	userRef.child("allergies").update(allergyObj);
	userRef.child("health").update(healthObj);
	cb(true);
}

function getPlanner(cb)
{
	var ref = new Firebase("https://phoodbuddy.firebaseio.com/");

	if(ref.getAuth() === null)
	{
		cb(false);
		return;
	}
	//Stores authData of package
	var data = ref.getAuth();

	var plannerRef = new Firebase("https://phoodbuddy.firebaseio.com/planner/" + data.uid + "/");

	plannerRef.once("value", function(snapshot){
		var plannerJson = snapshot.val();
		cb(plannerJson);
	});
}

function updatePlanner(dayOfWeek, timeOfDay, foodName, id, cb)
{
	var ref = new Firebase("https://phoodbuddy.firebaseio.com/");

	if(ref.getAuth() === null)
	{
		cb(false);
		return;
	}
	//Stores authData of package
	var data = ref.getAuth();

	var plannerRef = new Firebase("https://phoodbuddy.firebaseio.com/planner/" + data.uid + "/" + dayOfWeek + "/" + timeOfDay +"/");
	var obj = {};
	obj.name = foodName;
	obj.recipeId = id;

	plannerRef.update(obj);

	cb(obj, dayOfWeek, timeOfDay);
}

function favoriteRecipe(recipeId, cb)
{
	var ref = new Firebase("https://phoodbuddy.firebaseio.com/");

	if(ref.getAuth() === null)
	{
		cb(false);
		return;
	}
	else
	{
		var data = ref.getAuth();

		//Creates reference to users portion in database
		var userRef = new Firebase("https://phoodbuddy.firebaseio.com/users/" + data.uid + "/");
		//Creates object to save
		var recipeSave = {};
		recipeSave[recipeId] = {};
		recipeSave[recipeId] = true;

		//Updates favorited recipes to contain favorited recipe.
		userRef.child("favorited-recipe").update(recipeSave);
		cb(true);
	}
}

function removeFavorite(recipeId, cb)
{
	var ref = new Firebase("https://phoodbuddy.firebaseio.com/");

	if(ref.getAuth() === null)
	{
		cb(false);
		return;
	}
	else
	{
		var data = ref.getAuth();
		var userRef = new Firebase("https://phoodbuddy.firebaseio.com/users/" + data.uid + "/");
		var favoriteRecipeRef = userRef.child("favorited-recipe").child(recipeId);

		favoriteRecipeRef.remove();
		cb(true);
	}
}

function rateRecipe(recipeId, rating, cb)
{
	var ref = new Firebase("https://phoodbuddy.firebaseio.com/");

	if(ref.getAuth() === null)
	{
		cb(false);
		return;
	}
	//Stores authData of package
	var data = ref.getAuth();

	rateRef = new Firebase("https://phoodbuddy.firebaseio.com/recipe-rate/" + recipeId + "/");

	rateRef.once("value", function(snapshot){

		var existing = snapshot.child(raters).child(data.uid).exists();
		if(existing)
		{
			cb(false);
		}
		else
		{
			var uid = data.uid;
			var obj = {};
			obj[uid] = true;
			//Math to update rating system.
			var rate = snapshot.child("rate");
			var amountRated = snapshot.child("amountRated");
			var top = (1.0 * rate * amountRated) + rating;
			var bottom = amountedRated + 1;
			var newRate = top/bottom;

			var rateContentJson = {
					"amountRated": bottom,
					"rate": newRate
			};
			rateRef.update(rateContentJson);
			rateRef.child("raters").update(obj);
			cb(true);
		}
	});
}

function getRandomRecipe(day, meal, cb)
{
	var ref = new Firebase("https://phoodbuddy.firebaseio.com/");

	if(ref.getAuth() === null)
	{
		cb(false, day, meal);
		return;
		
	}

	var data = ref.getAuth();

	var userRef = new Firebase("https://phoodbuddy.firebaseio.com/users/facebook:10105047931297062/");

	var recipeReturn;

	userRef.once("value", function(snapshot)
	{
		//Assign Health properties
		var health = snapshot.child("health").val();
		var diab = health.diabetes;
		var highc = health["high-cholestorol"];
		var hyper = health.hypertension;
		var hypo = health.hypotension;
		var veg = health.vegetarian;
		//Assign Allergy Properties
		var allergies = snapshot.child("allergies").val();
		var cornA = allergies.corn;
		var eggA = allergies.egg;
		var fishA = allergies.fish;
		var gluttenA = allergies.glutten;
		var milkA = allergies.milk;
		var peanutA = allergies.peanut;
		var redA = allergies["red-meat"];
		var sesameA = allergies.sesame;
		var shellA = allergies["shell-fish"];
		var soyA = allergies.soy;
		var treeA = allergies["tree-nut"];
		//Assign Taste Properties
		var tastes = snapshot.child("taste").val();
		var bitter = tastes.bitter;
		var salty = tastes.salty;
		var sour = tastes.sour;
		var spicy = tastes.spicy;
		var sweet = tastes.sweet;

		var dominantTaste = "";
		var currentTasteVal = 0.1;

		if(bitter >= currentTasteVal)
		{
			dominantTaste = "bitter";
			currentTasteVal = bitter;
		}
		if(sour >= currentTasteVal)
		{
			dominantTaste = "sour";
			currentTasteVal = sour;
		}
		if(sweet >= currentTasteVal)
		{
			dominantTaste = "sweet";
			currentTasteVal = sweet;
		}
		if(spicy >= currentTasteVal)
		{
			dominantTaste = "spicy";
			currentTasteVal = spicy;
		}
		if(salty >= currentTasteVal)
		{
			dominantTaste = "salty";
			currentTasteVal = salty;
		}

		if(dominantTaste === "")
		{
			dominantTaste = "salty";
		}

		console.log("Your dominant taste is" + dominantTaste);

		var recipeRef = new Firebase("https://phoodbuddy.firebaseio.com/recipe-directory/");

		var randomDecide = Math.random();

		console.log(randomDecide);
		if(hypo || diab || highc || hyper)
		{
			console.log("We are tailoring to your needs...");

			//var query = recipeRef.orderByChild("custom").equalTo(false);

			var query = recipeRef;

			if(randomDecide > 0.25)
			{
				console.log("Firebase will choose a taste oriented choice of your liking");
				query = query.orderByChild("taste").equalTo(dominantTaste);
			}

			query.once("value", function(childSnapshot){
				var num = childSnapshot.numChildren();
				var newNnum = num / 10;

				var childCount = childSnapshot.numChildren();
				var counter = Math.floor(Math.random() * (childCount));
				counter = Math.floor(counter * 0.75);

				var flagger = true;
				childSnapshot.forEach(function(querySnapshot)
				{
					
					var flag = true;

					if(childSnapshot.key().length == 20)
					{
						flag = false;
					}

					if(counter > 0)
					{
						counter--;
						flag = false;
					}

					var ingredients = null;

					if(flag)
					{
						ingredients = querySnapshot.child("ingredientList").val();
					}

					if(ingredients === null)
					{
						flag = false;
					}

					if(flag)
					{
						for(var i = 0; i < ingredients.length; i++)
						{
							var foodName = ingredients[i].name;
							if(veg)
							{
								if( (foodName.indexOf("meat") !== -1) || (foodName.indexOf("Meat") !== -1) || (foodName.indexOf("chicken") !== -1) || (foodName.indexOf("Chicken") !== -1))
								{
									flag = false;
									break;
								}
								else
								{
									continue;
								}
							}

							if( (checkAllergiesWithIngredients(foodName, cornA, eggA, fishA, gluttenA, milkA, peanutA, redA, sesameA, shellA, soyA, treeA)) === false)
							{
								flag = false;
								break;
							}
							
						}
					}

					if(hyper && flag)
					{
						var currentSodium = querySnapshot.child("nutrition").child("sodium").val();
						if (Number(currentSodium) > 400)
						{
							flag = false;
						}
					}

					if(diab && flag)
					{
						var currentCarbo = querySnapshot.child("nutrition").child("carbohydrate").val();
						if( Number(currentCarbo) > 30)
						{
							flag = false;
						}
					}

					if(highc && flag)
					{
						var transFat = querySnapshot.child("nutrition").child("trans_fat").val();
						var totalFat = querySnapshot.child("nutrition").child("fat").val();

						if(Number(transFat) > 1)
						{
							flag = false;
						}

						if(Number(totalFat) > 25)
						{
							flag = false;
						}
					}

					if(hypo && flag)
					{
						var currentCarbon = querySnapshot.child("nutrition").child("carbohydrate").val();
						if( Number(currentCarbon) > 35)
						{
							flag = false;
						}
					}

					if(flag)
					{
						flagger = false;
						var jsonRecipe = querySnapshot.val();
						jsonRecipe.id = querySnapshot.key();
						var recipeId = querySnapshot.key();
						var name = querySnapshot.child("name").val();

						if(meal === "")
						{
							cb(jsonRecipe, day, meal);
						}
						else
						{
							updatePlanner(day, meal, name, recipeId, cb);
						}
						return true;
					}
				});
				if(flagger)
				{
					cb(false, day, meal);
				}
			});
			//var query = directoryRef.orderByChild("custom").equalTo(false);
		}
		else
		{
			//var customQuery = recipeRef.orderByChild("custom").equalTo(true);

			var customQuery = recipeRef;

			if(randomDecide > 0.25)
			{
				console.log("Firebase will choose a taste oriented choice of your liking");
				customQuery = recipeRef.orderByChild("taste").equalTo(dominantTaste);
			}

			customQuery.once("value", function(childSnapshot){

				var childCount = childSnapshot.numChildren();
				var counter = Math.floor(Math.random() * (childCount));
				counter = Math.floor(counter * 0.75);

				var flagger = true;
				childSnapshot.forEach(function(querySnapshot){

					var flag = true;

					if(counter > 0)
					{
						counter--;
						flag = false;
					}

					var ingredients = querySnapshot.child("ingredientList").val();

					if (ingredients === null)
					{
						flag = false;
					}

					if(flag)
					{
						for(var i = 0; i < ingredients.length; i++)
						{
							var foodName = ingredients[i].name;
							if(veg)
							{
								if( (foodName.indexOf("meat") !== -1) || (foodName.indexOf("Meat") !== -1) || (foodName.indexOf("chicken") !== -1) || (foodName.indexOf("Chicken") !== -1))
								{
									flag = false;
									break;
								}
								else
								{
									continue;
								}
							}

							if( (checkAllergiesWithIngredients(foodName, cornA, eggA, fishA, gluttenA, milkA, peanutA, redA, sesameA, shellA, soyA, treeA)) === false)
							{
								flag = false;
								break;
							}
						}
					}

					if(flag)
					{
						flagger = false;
						var jsonRecipe = querySnapshot.val();
						jsonRecipe.id = querySnapshot.key();
						var recipeId = querySnapshot.key();
						var name = querySnapshot.child("name").val();

						if(meal === "")
						{
							cb(jsonRecipe, day, meal);
						}
						else
						{
							updatePlanner(day, meal, name, recipeId, cb);
						}
						return true;
					}

				});

				if(flagger)
				{
					cb(false, day, meal);
				}
			});
		}
	});
}

function checkAllergiesWithIngredients(ingredients, corn, egg, fish, glutten, milk, peanut, redMeat, sesame, shell, soy, treeNut)
{
	var passes = true;
	
		var foodName = ingredients;
		if(corn)
		{
			if( (foodName.indexOf("corn") !== -1) || (foodName.indexOf("Corn") !== -1))
			{
				return false;
			}
		}

		if(egg)
		{
			if( (foodName.indexOf("egg") !== -1) || (foodName.indexOf("Egg") !== -1))
			{
				return false;
			}
		}

		if(fish)
		{
			if( (foodName.indexOf("fish") !== -1) || (foodName.indexOf("Fish") !== -1))
			{
				return false;
			}
		}

		if(glutten)
		{
			if( (foodName.indexOf("glutten") !== -1) || (foodName.indexOf("Glutten") !== -1) || (foodName.indexOf("wheat") !== -1) || (foodName.indexOf("Wheat") !== -1) || (foodName.indexOf("barley") !== -1) || (foodName.indexOf("Barley") !== -1) || (foodName.indexOf("barley") !== -1) || (foodName.indexOf("Barley") !== -1))
			{
				return false;
			}
		}

		if(milk)
		{
			if( (foodName.indexOf("milk") !== -1) || (foodName.indexOf("Milk") !== -1))
			{
				return false;
			}
		}

		if(peanut)
		{
			if( (foodName.indexOf("peanut") !== -1) || (foodName.indexOf("Peanut") !== -1))
			{
				return false;
			}
		}

		if(redMeat)
		{
			if( (foodName.indexOf("Steak") !== -1) || (foodName.indexOf("steak") !== -1) || (foodName.indexOf("beef") !== -1) || (foodName.indexOf("Beef") !== -1) || (foodName.indexOf("red meat") !== -1) || (foodName.indexOf("meat") !== -1) || (foodName.indexOf("Meat") !== -1))
			{
				return false;
			}
		}

		if(sesame)
		{
			if( (foodName.indexOf("sesame") !== -1) || (foodName.indexOf("Sesame") !== -1))
			{
				return false;
			}
		}

		if(shell)
		{
			if( (foodName.indexOf("shrimp") !== -1) || (foodName.indexOf("Shrimp") !== -1) || (foodName.indexOf("Lobster") !== -1) || (foodName.indexOf("lobster") !== -1) || (foodName.indexOf("crab") !== -1) || (foodName.indexOf("Crab") !== -1) || (foodName.indexOf("Prawn") !== -1) || (foodName.indexOf("prawn") !== -1) || (foodName.indexOf("scampi") !== -1) || (foodName.indexOf("Scampi") !== -1) || (foodName.indexOf("crawfish") !== -1) || (foodName.indexOf("Crawfish") !== -1) || (foodName.indexOf("barnacle") !== -1) || (foodName.indexOf("barnacle") !== -1))
			{
				return false;
			}
		}

		if(soy)
		{
			if( (foodName.indexOf("soy") !== -1) || (foodName.indexOf("Spy") !== -1))
			{
				return false;
			}
		}

		if(treeNut)
		{
			if( (foodName.indexOf("tree nut") !== -1) || (foodName.indexOf("Tree Nut") !== -1) || (foodName.indexOf("tree Nut") !== -1) || (foodName.indexOf("Tree nut") !== -1))
			{
				return false;
			}
		}

	return true;
}

function getRecipe(id, cb)
{
	var ref = new Firebase("https://phoodbuddy.firebaseio.com/");

	if(ref.getAuth() === null)
	{
		cb(false, id);
		return;
	}
	//Stores authData of package
	var data = ref.getAuth();

	//ref.child("recipe-directory").child(id).exists();  ~~DEBUG: TAKEN OUT. WHY WAS THIS HERE?

	var recipeRef = new Firebase("https://phoodbuddy.firebaseio.com/recipe-directory/" + id + "/");

	recipeRef.once("value", function(snapshot){

		if(snapshot.exists() === false)
		{
			cb(false, id);
		}
		else
		{
			var recipeJson = snapshot.val();
			cb(recipeJson, id);
		}
	});
}

//TEST TEST TEST TEST


function test()
{
	var recipeRef = new Firebase("https://phoodbuddy.firebaseio.com/recipe-directory/");
//query.once("value", function(childSnapshot){

//});
}