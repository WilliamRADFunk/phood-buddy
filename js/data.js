
//Data Construction Functions

function assembleRecipe(author, description, img, name, taste, ingredients, directions, cookTime, prepTime, totalTime, mealTime, cb)
{

	var ingredientList = [];

	for(var i = 0; i < ingredients.length; i++)
	{
		var miniObject = { "name": ingredients[i][0], "quantity": ingredients[i][1], "unit": ingredients[i][2], "description": ingredients[i][3]}
		ingredientList[i] = miniObject;
	}

	var recipeJson =  {
					  "author" : author,
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
}


//AJAX Functions (Hollow)