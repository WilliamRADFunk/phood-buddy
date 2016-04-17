
//Data Construction Functions
function getGroceryList(cb)
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
			cb(false);
		}
	});	
}

function addGrocery(contentJson, cb)
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
	var gref = new Firebase("https://phoodbuddy.firebaseio.com/grocery/");

	var newGroceryRef = gref.child(data.uid).push();
	newGroceryRef.update(contentJson);
	console.log(contentJson);

	cb(newGroceryRef.name()); //This cb contains the name of the created key for new object.

}

function editGrocery(contentJson, cb)
{
	//WARNING ::: Convert impending input into Javascript object (if not already), and set equal to 'contentJson'
	// DEBUG :  DUMMY VALUE var contentJson = {"-KEnu2ENxPZIixIbbXG4":{"name": "banana", "description": "That other thing", "quantity": "2", "unit": "loafes", "category": "meat"}};

	var keys = Object.keys(contentJson);

	var ref  = new Firebase("https://phoodbuddy.firebaseio.com/");
	if(ref.getAuth() === null)
	{
		cb(false);
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
			cb(true);
		}
		else
		{
			cb(false);
		}
	});
}

function deleteGrocery(contentKey, cb)
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
	var gref = new Firebase("https://phoodbuddy.firebaseio.com/grocery/" + data.uid + "/" + contentKey);

	if(gref == null)
	{
		cb(false);
	}

	gref.remove();
	cb(true);
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

	gref.remove();
	cb(true);
}

function assembleRecipe(author, description, img, name, taste, ingredients, directions, cookTime, prepTime, totalTime, mealTime, cb)
{
	
	var ref = new Firebase("https://phoodbuddy.firebaseio.com/");
	var data = ref.getAuth();
	if(data == null)
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
			var miniObject = { "name": ingredients[i][0], "quantity": ingredients[i][1], "unit": ingredients[i][2], "description": ingredients[i][3]}
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
						}

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
	cb(true);
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
								if(count > 0)
								{
									count--;
								}
								else
								{
									if(decount > 0)
									{
									recipeContentJson.info.push(childSnapshot.val());
									decount --;
									}
								}

								break;								
							}
					}

					
				});//End: forEach -> 'recipe-directory'
				cb(recipeContentJson);   //CALL cb here
			});//END: snapshot -> 'recipe-directory'
			//cb(recipeContentJson); //This cb will return the JSON of all recipes
		}//END: if user has created recipes
	});//END: snapshot -> 'users/uid'
}

function getFavFatSecret(count, cb)
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
								if(count > 0)
								{
									count--;
								}
								else
								{
									if(decount > 0)
									{
										recipeContentJson.info.push(childSnapshot.val());
										decount --;
									}

								}

								break;
						
							} 
					}

					
				});//End: forEach -> 'recipe-directory'
				cb(recipeContentJson);   //CALL cb here
			});//END: snapshot -> 'recipe-directory'
			//cb(recipeContentJson); //This cb will return the JSON of all recipes
		}//END: if user has created recipes
	});//END: snapshot -> 'users/uid'
}


function getFavAll(count, day, time, cb)
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

			console.log(array);


			
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
									if(decount > 0)
									{
										recipeContentJson.info.push(childSnapshot.val());
										decount--;
									}
								}

								break;
																				
							}
					}

					
				});//End: forEach -> 'recipe-directory'
				cb(day, time, recipeContentJson);   //CALL cb here
			});//END: snapshot -> 'recipe-directory'
			//cb(recipeContentJson); //This cb will return the JSON of all recipes
		}//END: if user has created recipes
	});//END: snapshot -> 'users/uid'
}

function getRandomFavRecipe(day, time, cb)
{
	var ref = new Firebase("https://phoodbuddy.firebaseio.com/");

	if(ref.getAuth() === null)
	{
		cb(false);
	}

	var data = ref.getAuth();

	var checkRef = new Firebase("https://phoodbuddy.firebaseio.com/users/" + data.uid);
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
								cb(recipeContentJson, day, time);
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
					recipeContentJson.info.push(childSnapshot.val());
					decount--;
				}
			}
		});

		cb(recipeContentJson);

	});
}

function editUserProfile(fname, lname, email, city, country, state, street, age, favdish, favdrink, gender, about, cb) //
{
	var ref = new Firebase("https://phoodbuddy.firebaseio.com/");


	if(ref.getAuth() === null)
	{
		//cb(false);
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

	userRef.child("name").update(fullName);
	userRef.child("profile").update(profileData);
	//cb(true);

}

function getUserProfileSettings()
{
	var ref = new Firebase("https://phoodbuddy.firebaseio.com/");


	if(ref.getAuth() === null)
	{
		//cb(false);
		return;
	}
	//Stores authData of package
	var data = ref.getAuth();

	var userRef = new Firebase("https://phoodbuddy.firebaseio.com/users/" + data.uid + "/profile/");

	userRef.once("value", function(snapshot){
		console.log(snapshot.val());
	});
}


function getUsersSettings(cb)
{
	//Creates reference to firebase to test authentication
	var ref = new Firebase("https://phoodbuddy.firebaseio.com/");

	if(ref.getAuth() === null)
	{
		return;
	}

	//Stores authData of package
	var data = ref.getAuth();

	//Create new reference to users information
	var userRef = new Firebase("https://phoodbuddy.firebaseio.com/users/" + data.uid + "/");

	//Snapshot current userRef to obtain users info JSON
	userRef.once("value", function(snapshot){

		var dataPackage = snapshot.val();
		console.log(dataPackage);

		//Return to callback the data of user (JSON)
		cb(dataPackage);
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

function editTasteProfile(contentJson, cb)
{

	var ref = new Firebase("https://phoodbuddy.firebaseio.com/");

	if(ref.getAuth() === null)
	{
		return;
		cb(false);
	}

	//Stores authData of package
	var data = ref.getAuth();

	console.log(contentJson);

	tasteRef = new Firebase("https://phoodbuddy.firebaseio.com/users/" + data.uid + "/");

	tasteRef.child("taste").update(contentJson);
	cb(true);


}

function getUserAllergies(cb)
{
	var ref = new Firebase("https://phoodbuddy.firebaseio.com/");

	if(ref.getAuth() === null)
	{
		return;
		cb(""); //cb FIX
	}

	//Stores authData of package
	var data = ref.getAuth();

	var allergyRef = new Firebase("https://phoodbuddy.firebaseio.com/users/" + data.uid + "/");

	allergyRef.once("value", function(snapshot)
	{
		if(snapshot.child("allergies").exists())
		{
			var contentJson = snapshot.child("allergies").val()
			cb(contentJson);
		}

	});

}

function editUserAllergies(contentJson, cb)
{
	var ref = new Firebase("https://phoodbuddy.firebaseio.com/");

	if(ref.getAuth() === null)
	{
		return;
		cb(false);
	}
	//Stores authData of package
	var data = ref.getAuth();

	tasteRef = new Firebase("https://phoodbuddy.firebaseio.com/users/" + data.uid + "/");

	tasteRef.child("allergies").update(contentJson);
	cb(true);
}

function getUserHealth(cb) //FIX
{
	var ref = new Firebase("https://phoodbuddy.firebaseio.com/");

	if(ref.getAuth() === null)
	{
		return;
		cb(""); //cb HELP
	}

	//Stores authData of package
	var data = ref.getAuth();

	var allergyRef = new Firebase("https://phoodbuddy.firebaseio.com/users/" + data.uid + "/");

	allergyRef.once("value", function(snapshot)
	{
		if(snapshot.child("allergies").exists())
		{
			var contentJson = snapshot.child("allergies").val()
			cb(contentJson);
		}

	});

}

function editUserHealth(contentJson, cb)
{
	var ref = new Firebase("https://phoodbuddy.firebaseio.com/");

	if(ref.getAuth() === null)
	{
		return;
		cb(false);
	}

	//Stores authData of package
	var data = ref.getAuth();

	

	console.log(contentJson);

	tasteRef = new Firebase("https://phoodbuddy.firebaseio.com/users/" + data.uid + "/");

	tasteRef.child("health").update(contentJson);
	cb(true);
}

function getPlanner(cb)
{
	var ref = new Firebase("https://phoodbuddy.firebaseio.com/");

	if(ref.getAuth() === null)
	{
		return;
		cb(false);
	}
	//Stores authData of package
	var data = ref.getAuth();

	var plannerRef = new Firebase("https://phoodbuddy.firebaseio.com/planner/" + data.uid + "/");

	plannerRef.once("value", function(snapshot){

		cb(snapshot.val());
	});
}

function updatePlanner(dayOfWeek, timeOfDay, name, recipeId, cb)
{
	var ref = new Firebase("https://phoodbuddy.firebaseio.com/");

	if(ref.getAuth() === null)
	{
		return;
		cb(false);
	}
	//Stores authData of package
	var data = ref.getAuth();

	var plannerRef = new Firebase("https://phoodbuddy.firebaseio.com/planner/" + data.uid + "/" + dayOfWeek + "/" + timeOfDay +"/");

	var obj = {"name": name, "recipeId": recipeId};

	plannerRef.update(obj);

	cb(true);
}

function getRecipeById()
{
	var recipe = null;

	var recipeId = "27116";

	$.ajax({
		method: "GET",
		url: "http://williamrobertfunk.com/applications/phood-buddy/actions/fat_secret_get_recipe_by_id.php?recipe_id=" + recipeId,
		dataType:'json',
		async: true,
		success:function(reponseData){
			console.log("AJAX has retrieved recipe from PHP...");
			console.log(responseData);
			recipe = responseData;
			//cb goes here
		},
		error:function(error){
			console.log("AJAX call 'getRecipe' failed" + error.status);
		}
	});
	//return recipe;
}

function favoriteRecipe(recipeId, cb)
{
	var ref = new Firebase("https://phoodbuddy.firebaseio.com/");

	if(ref.getAuth() === null)
	{
		return;
		cb(false);
	}
	//Stores authData of package
	var data = ref.getAuth();

	//Creates reference to users portion in database
	var userRef = new Firebase("https://phoodbuddy.firebaseio.com/users/" + data.uid + "/");

	//Updates path information to include favorited-recipe and the current recipe Id
	userRef.child("favorited-recipe").update({recipeid: true});
	cb(true);
}

function removeFavorited(recipeId, cb)
{
	var ref = new Firebase("https://phoodbuddy.firebaseio.com/");

	if(ref.getAuth() === null)
	{
		return;
		cb(false);
	}
	//Stores authData of package
	var data = ref.getAuth();
	var userRef = new Firebase("https://phoodbuddy.firebaseio.com/users/" + data.uid + "/");
	var favoriteRecipeRef = userRev.child("favorited-recipe").child("recipeId");

	favoriteRecipeRef.remove();

}

function rateRecipe(recipeId, rating, cb)
{
	var ref = new Firebase("https://phoodbuddy.firebaseio.com/");

	if(ref.getAuth() === null)
	{
		return;
		cb(false);
	}
	//Stores authData of package
	var data = ref.getAuth();

	rateRef = new Firebase("https://phoodbuddy.firebaseio.com/recipe-rate/" + recipeId + "/");

	rateRef.once("value", function(snapshot){

		var existing = snapshot.child(raters).child(data.uid).exists();
		if(existing)
		{
			cb(false)
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
		return;
		//cb(false);
	}

	var data = ref.getAuth();

	var userRef = new Firebase("https://phoodbuddy.firebaseio.com/users/facebook:10105047931297062/");

	var recipeReturn;

	userRef.once("value", function(snapshot)
	{
		//Assign Health properties
		var health = snapshot.child("health").val();
		var diab = health["diabetes"];
		var highc = health["high-cholestorol"];
		var hyper = health["hypertension"];
		var hypo = health["hypotension"];
		var veg = health["vegetarian"];
		//Assign Allergy Properties
		var allergies = snapshot.child("allergies").val();
		var cornA = allergies["corn"];
		var eggA = allergies["egg"];
		var fishA = allergies["fish"];
		var gluttenA = allergies["glutten"];
		var MilkA = allergies["milk"];
		var peanutA = allergies["peanut"];
		var redA = allergies["red-meat"];
		var sesameA = allergies["sesame"];
		var shellA = allergies["shell-fish"];
		var soyA = allergies["soy"];
		var treeA = allergies["tree-nut"];

		console.log(diab);

		var recipeRef = new Firebase("https://phoodbuddy.firebaseio.com/recipe-directory/");

		if(hypo || diab || highc || hyper)
		{
			var query = recipeRef.orderByChild("custom").equalTo(false);

			query.once("value", function(childSnapshot){
				var num = childSnapshot.numChildren();
				var newNnum = num / 10;

				childSnapshot.forEach(function(querySnapshot)
				{
					var flag = true;

					var ingredients = querySnapshot.child("ingredients").val();

					for(var i = 0; i < ingredients.length; i++)
					{
						var foodName = ingredients[i].food_name;
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

						checkAllergiesWithIngredients(ingredients, cornA, eggA, fishA, gluttenA, milkA, peanutA, redA, sesameA, shellA, soyA, treeA)
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
						var currentCarbo = querySnapshot.child("nutrition").child("carbohydrates").val();
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
						var currentCarbo = querySnapshot.child("nutrition").child("carbohydrates").val();
						if( Number(currentCarbo) > 35)
						{
							flag = false;
						}
					}

					if(flag)
					{
						cb(day, meal, querySnapshot.val());
						return true;
					}
				});
			});
			//var query = directoryRef.orderByChild("custom").equalTo(false);
		}
	});
}

function checkAllergiesWithIngredients(ingredients, corn, egg, fish, glutten, milk, peanut, redMeat, sesame, shell, soy, treeNut)
{
	var passes = true;
	for(var i = 0; i < ingredients.length; i++)
	{
		var foodName = ingredients[i].food_name;
		if(corn)
		{
			if( (foodName.indexOf("corn") !== -1) && (foodName.indexOf("Corn") !== -1))
			{
				return false;
			}
		}

		if(egg)
		{
			if( (foodName.indexOf("egg") !== -1) && (foodName.indexOf("Egg") !== -1))
			{
				return false;
			}
		}

		if(fish)
		{
			if( (foodName.indexOf("fish") !== -1) && (foodName.indexOf("Fish") !== -1))
			{
				return false;
			}
		}

		if(glutten)
		{
			if( (foodName.indexOf("glutten") !== -1) && (foodName.indexOf("Glutten") !== -1))
			{
				return false;
			}
		}

		if(milk)
		{
			if( (foodName.indexOf("corn") !== -1) && (foodName.indexOf("Corn") !== -1))
			{
				return false;
			}
		}
	}
}

//TEST TEST TEST TEST


function test()
{
	var recipeRef = new Firebase("https://phoodbuddy.firebaseio.com/recipe-directory/");
	//query.once("value", function(childSnapshot){

	//});
}