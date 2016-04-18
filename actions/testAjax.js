function getRecipeById(recipeId)
{
	var recipe = null;

	//var recipeId = "27116";

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