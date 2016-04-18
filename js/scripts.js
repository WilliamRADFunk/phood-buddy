var imageUpload = "";

$(document).ready(function ()
{
	// Starts to upload image once user picks an image
	$("input[type=file]").change(function(){
		imageUpload = $("input[type=file]")[0].files[0];
		var reader = new FileReader();
		reader.readAsDataURL(imageUpload);
		console.log("image uploading");
		reader.onload = function(e)
		{
			// browser completed reading file - display it
			imageUpload = e.target.result;
			console.log("image uploaded");
		};
	});
	// System attempts to log user in through Facebook, Twitter, or Google Plus
	$("#btn-facebook").click(function(){
		$(".modal-body").html("<p>Logging into Facebook failed. Is this your first time at Phood Buddy?</p>");
		fbLogin(loginCallback);
	});
	$("#btn-twitter").click(function(){
		$(".modal-body").html("<p>Logging into Twitter failed. Is this your first time at Phood Buddy?</p>");
		twitterLogin(loginCallback);
	});
	$("#btn-google").click(function(){
		$(".modal-body").html("<p>Logging into Google failed. Is this your first time at Phood Buddy?</p>");
		googleLogin(loginCallback);
	});
	// System tries to login with values provided in the two text fields.
	$("#btn-login").click(function(){
		var email = $("#login-email").val() + "";
		var pwd = $("#login-password").val() + "";
		if( (email === "") || (pwd === "") )
		{
			$("#modal").modal({backdrop: "static", keyboard: false, show: true});
			$(".modal-header").html("Login Failed");
			$(".modal-body").html("<p>We need a valid email and password to log you in.<br/>Is this your first time at Phood Buddy?</p>");
			$("#btn-confirm").click(function(){
				window.location = "http://www.williamrobertfunk.com/applications/phood-buddy/register.html";
			});
		}
		else
		{
			$(".modal-body").html("<p>Logging in failed. Is this your first time at Phood Buddy?</p>");
			customLogin($("login-email").val() + "", $("login-password").val() + "", loginCallback);
		}
	});
	// System attempts to register user in through Facebook, Twitter, or Google Plus
	$("#btn-facebook-reg").click(function(){
		$(".modal-body").html("<p>Registering with Facebook failed.</p>");
		fbRegister(registerCallback);
	});
	$("#btn-twitter-reg").click(function(){
		$(".modal-body").html("<p>Registering with Twitter failed.</p>");
		twitterRegister(registerCallback);
	});
	$("#btn-google-reg").click(function(){
		$(".modal-body").html("<p>Registering with Google failed.</p>");
		googleRegister(registerCallback);
	});
	// System tries to register with values provided in the four text fields.
	$("#btn-register").click(function(){
		console.log("Trying to register");
		var email = $("#register-email").val() + "";
		var pwd = $("#register-password").val() + "";
		var fname = $("#register-fname").val() + "";
		var lname = $("#register-lname").val() + "";
		
		if( (fname === "") || (lname === "") ||	(email === "") || (pwd === "") )
		{
			$("#modal").modal({backdrop: "static", keyboard: false, show: true});
			$(".modal-header").html("Registration Failed");
			$(".modal-body").html("<p>All four fields need to be filled out correctly.</p>");
			$("#btn-cancel").css("display", "none");
			$("#btn-confirm").click(function(){
				$("#btn-cancel").css("display", "inline-block");
			});
		}
		else
		{
			$(".modal-body").html("<p>Manual registration failed. Try a different email?</p>");
			customRegister( fname, lname, email, pwd, registerCallback);
		}
	});
	// Turns content on and off depending on Settings/Profile tab selected.
	$("#btn-personal-profile").click(function(){
		$("#my-profile").css("display", "block");
		$("#btn-edit-profile").css("display", "block");
		$("#btn-personal-profile").addClass("active");
		$("#my-risks").css("display", "none");
		$("#btn-edit-risks").css("display", "none");
		$("#btn-risk-profile").removeClass("active");
		$("#my-exercise").css("display", "none");
		$("#btn-edit-exercise").css("display", "none");
		$("#btn-exercise-profile").removeClass("active");
		$("#my-tastes").css("display", "none");
		$("#btn-edit-tastes").css("display", "none");
		$("#btn-taste-profile").removeClass("active");
	});
	$("#btn-risk-profile").click(function(){
		$("#my-profile").css("display", "none");
		$("#btn-edit-profile").css("display", "none");
		$("#btn-personal-profile").removeClass("active");
		$("#my-risks").css("display", "block");
		$("#btn-edit-risks").css("display", "block");
		$("#btn-risk-profile").addClass("active");
		$("#my-exercise").css("display", "none");
		$("#btn-edit-exercise").css("display", "none");
		$("#btn-exercise-profile").removeClass("active");
		$("#my-tastes").css("display", "none");
		$("#btn-edit-tastes").css("display", "none");
		$("#btn-taste-profile").removeClass("active");
	});
	$("#btn-exercise-profile").click(function(){
		$("#my-profile").css("display", "none");
		$("#btn-edit-profile").css("display", "none");
		$("#btn-personal-profile").removeClass("active");
		$("#my-risks").css("display", "none");
		$("#btn-edit-risks").css("display", "none");
		$("#btn-risk-profile").removeClass("active");
		$("#my-exercise").css("display", "block");
		$("#btn-edit-exercise").css("display", "block");
		$("#btn-exercise-profile").addClass("active");
		$("#my-tastes").css("display", "none");
		$("#btn-edit-tastes").css("display", "none");
		$("#btn-taste-profile").removeClass("active");
	});
	$("#btn-taste-profile").click(function(){
		$("#my-profile").css("display", "none");
		$("#btn-edit-profile").css("display", "none");
		$("#btn-personal-profile").removeClass("active");
		$("#my-risks").css("display", "none");
		$("#btn-edit-risks").css("display", "none");
		$("#btn-risk-profile").removeClass("active");
		$("#my-exercise").css("display", "none");
		$("#btn-edit-exercise").css("display", "none");
		$("#btn-exercise-profile").removeClass("active");
		$("#my-tastes").css("display", "block");
		$("#btn-edit-tastes").css("display", "block");
		$("#btn-taste-profile").addClass("active");
	});
	$("#btn-logout").click(function(){
		window.location = "http://www.williamrobertfunk.com/applications/phood-buddy/login.html";
	});
	// Controls how long between carousel transitions.
	$('.carousel').carousel({
		interval: 4000
	});
	// Specifies content and functionality of modal when
	// user clicks specific links/buttons.
	$("#lost-password").click(function(){
		$("#modal").modal({backdrop: "static", keyboard: false, show: true});
		$(".modal-header").html("Reset Password");
		$(".modal-body").html("<form><label>Registered Email:&nbsp;&nbsp;</label><input type='text' /></form>");
		$("#btn-confirm").click(function(){
			/* TODO: Send reset password email */
		});
	});
	$(".delete-item").click(function(e){
		$("#modal").modal({backdrop: "static", keyboard: false, show: true});
		$(".modal-header").html("Delete Item");
		$(".modal-body").html("<p>Are you sure you want to delete this item from your list?</p>");
		$("#btn-confirm").click(function(){
			/* TODO: Delete item from the list */
			/* TODO: Reload Groceries page */
		});
	});
	$(".edit-item").click(function(e){
		$("#modal").modal({backdrop: "static", keyboard: false, show: true});
		$(".modal-header").html("Edit Item");
		$(".modal-body").html('<div class="row">' +
			'<div id="editing-item">' +
			'<select class="col-lg-12 col-md-12 col-sm-12 col-xs-12">' +
				'<option value="" disabled selected>Category</option>' +
				'<option value="baked goods">Baked Goods</option>' +
				'<option value="beverages">Beverages</option>' +
				'<option value="canned goods">Canned Goods</option>' +
				'<option value="cereals">Cereals</option>' +
				'<option value="condiments">Condiments</option>' +
				'<option value="dairy">Dairy</option>' +
				'<option value="frozen">Frozen Foods</option>' +
				'<option value="meats">Meats, Fish, &amp; Poultry</option>' +
				'<option value="produce">Produce</option>' +
				'<option value="baking and spices">Baking &amp; Spices</option>' +
				'<option value="miscellaneous">Miscellaneous</option>' +
			'</select>' +
			'<input type="text" name="name" placeholder="Name" class="col-lg-12 col-md-12 col-sm-12 col-xs-12"/>' +
			'<input type="text" name="description" placeholder="Description" class="col-lg-12 col-md-12 col-sm-12 col-xs-12"/>' +
			'<input type="number" name="quantity" placeholder="Quantity" class="col-lg-12 col-md-12 col-sm-12 col-xs-12"/>' +
			'<select class="col-lg-12 col-md-12 col-sm-12 col-xs-12">' +
				'<option value="" disabled selected>Unit</option>' +
				'<option value="teaspoons">teaspoons</option>' +
				'<option value="tablespoons">tablespoons</option>' +
				'<option value="fluid ounces">fluid ounces</option>' +
				'<option value="gills">gills</option>' +
				'<option value="cups">cups</option>' +
				'<option value="pints">pints</option>' +
				'<option value="quarts">quarts</option>' +
				'<option value="gallons">gallons</option>' +
				'<option value="milliliters">milliliters</option>' +
				'<option value="liters">liters</option>' +
				'<option value="deciliters">deciliters</option>' +
				'<option value="pounds">pounds</option>' +
				'<option value="ounces">ounces</option>' +
				'<option value="milligrams">milligrams</option>' +
				'<option value="grams">grams</option>' +
				'<option value="kilograms">kilograms</option>' +
				'<option value="millimeters">millimeters</option>' +
				'<option value="centimeters">centimeters</option>' +
				'<option value="meters">meters</option>' +
				'<option value="inches">inches</option>' +
			'</select>');
		$("#btn-confirm").click(function(){
			/* TODO: Send edited data */
			/* TODO: Reload Groceries page */
		});
	});
});
function registerCallback(result)
{
	if(result === true)
	{
		$("#modal").modal({backdrop: "static", keyboard: false, show: true});
		$(".modal-body").html("<p>You're account has been created, using some default value.<br/><br/>For Phood Buddy to give you recipes and information that helps <i>you</i> the most,<br/>it needs to know you better.<br/><br/> Would you like to fill out your profile now?</p>");
		$(".modal-header").html("Registration Successful");
		$("#btn-confirm").click(function(){
			window.location = "http://www.williamrobertfunk.com/applications/phood-buddy/profile.html";
		});
		$("#btn-cancel").click(function(){
			window.location = "http://www.williamrobertfunk.com/applications/phood-buddy/index.html";
		});
	}
	else
	{
		$("#modal").modal({backdrop: "static", keyboard: false, show: true});
		$(".modal-header").html("Registration Failed");
		$("#btn-cancel").css("display", "none");
		$("#btn-confirm").click(function(){
			$("#btn-cancel").css("display", "inline-block");
		});
	}
}
function loginCallback(result)
{
	if(result === true)
	{
		window.location = "http://www.williamrobertfunk.com/applications/phood-buddy/index.html";
	}
	else
	{
		$("#modal").modal({backdrop: "static", keyboard: false, show: true});
		$(".modal-header").html("Login Failed");
		$("#btn-confirm").click(function(){
			window.location = "http://www.williamrobertfunk.com/applications/phood-buddy/register.html";
		});
	}
}
function addItem()
{
	$("#add-item").show();
	$("#add-item-link").hide();
}
function cancelItem()
{
	$("#add-item").hide();
	$("#add-item-link").show();
	/* TODO: Clear all fields */
}
function submitItem()
{
	$("#add-item").hide();
	$("#add-item-link").show();
	/* TODO: Send item to database */
	/* TODO: Have modal show success or failure */
	/* TODO: Reload page with new grocery list */
}
// Adds a new ingredient for user to fill in.
function addIngredient(elem)
{
	// Find all relevant tags once to avoid redundancy.
	var ingredients = $("#ingredients").children();
	var ingrLength = ingredients.length;
	var btnsToHideAdd = $("#ingredients").find(".add-ingredient");
	var btnsToHideDel = $("#ingredients").find(".delete-ingredient");
	var btnsToShow = $("#ingredients").find(".remove-ingredient");
	// Updates the add and remove buttons so only the bottom ingredient has both.
	for(var i = 0; i < btnsToHideAdd.length; i++)
	{
		if(btnsToHideAdd[i]) btnsToHideAdd[i].style.display = "none";
		if(btnsToHideDel[i]) btnsToHideDel[i].style.display = "none";
		if(btnsToShow[i]) btnsToShow[i].style.display = "block";
	}
	// Adds the HTML inputs for a new ingredient.
	$("#ingredients").append(
		'<div id="ingredient-' + ingrLength + '" class="ingredient-chunk">' +
			'<hr/>' +
			'<h3>Ingredient #<span>' + ingrLength + '</span></h3>' +
			'<div class="stand-alone col-lg-12 col-md-12 col-sm-12 col-xs-12">' +
				'<label>Ingredient: </label>' +
				'<input class="ingredient-name" type="text" placeholder="(ie. Carrots)"/>' +
			'</div>' +
			'<div class="stand-alone col-lg-12 col-md-12 col-sm-12 col-xs-12">' +
				'<label>Description: </label>' +
				'<input class="ingredient-desc" type="text" placeholder="(ie. dice into fine pieces)"/>' +
			'</div>' +
			'<div class="stand-alone col-lg-12 col-md-12 col-sm-12 col-xs-12">' +
				'<label>Quantity: </label>' +
				'<input class="ingredient-quant" type="number" placeholder="0"/>' +
			'</div>' +
			'<div class="stand-alone col-lg-12 col-md-12 col-sm-12 col-xs-12">' +
				'<label>Unit: </label>' +
				'<select class="ingredient-unit">' +
					'<option value="" class="placeholder"  disabled selected>Select Unit</option>' +
					'<option value="teaspoons">teaspoons</option>' +
					'<option value="tablespoons">tablespoons</option>' +
					'<option value="fluid ounces">fluid ounces</option>' +
					'<option value="gills">gills</option>' +
					'<option value="cups">cups</option>' +
					'<option value="pints">pints</option>' +
					'<option value="quarts">quarts</option>' +
					'<option value="gallons">gallons</option>' +
					'<option value="milliliters">milliliters</option>' +
					'<option value="liters">liters</option>' +
					'<option value="deciliters">deciliters</option>' +
					'<option value="pounds">pounds</option>' +
					'<option value="ounces">ounces</option>' +
					'<option value="milligrams">milligrams</option>' +
					'<option value="grams">grams</option>' +
					'<option value="kilograms">kilograms</option>' +
					'<option value="millimeters">millimeters</option>' +
					'<option value="centimeters">centimeters</option>' +
					'<option value="meters">meters</option>' +
					'<option value="inches">inches</option>' +
				'</select>' +
			'</div>' +
			'<div class="stand-alone col-lg-6 col-md-6 col-sm-6 col-xs-12">' +
				'<button class="add-ingredient" onclick="addIngredient()">Add Ingredient</button>' +
			'</div>' +
			'<div class="stand-alone col-lg-6 col-md-6 col-sm-6 col-xs-12">' +
				'<button class="delete-ingredient" onclick="removeIngredient(\'ingredient-' + ingrLength + '\')">Remove Ingredient</button>' +
			'</div>' +
			'<div class="stand-alone col-lg-4 col-lg-offset-4 col-md-4 col-md-offset-4 col-sm-4 col-sm-offset-4 col-xs-12">' +
				'<button class="remove-ingredient" onclick="removeIngredient(\'ingredient-' + ingrLength + '\')" style="display:none;">Remove Ingredient</button>' +
			'</div>' +
		'</div>');
}
// Removes an new ingredient for user to fill in.
function removeIngredient(elem)
{
	// Gets rid of the ingredient if it isn't the only one left.
	var ingredients = $("#ingredients").children();
	var ingrLength = ingredients.length - 1;
	if(ingrLength > 1) $("#" + elem).remove();
	// Updated button list.
	var btnsAdd = $("#ingredients").find(".add-ingredient");
	var btnsDel = $("#ingredients").find(".delete-ingredient");
	var btnsRem = $("#ingredients").find(".remove-ingredient");
	// Updates the add and remove buttons so only the bottom ingredient has both.
	if(btnsAdd[btnsAdd.length-1])btnsAdd[btnsAdd.length-1].style.display = "block";
	if(btnsDel[btnsDel.length-1])btnsDel[btnsDel.length-1].style.display = "block";
	if(btnsRem[btnsRem.length-1])btnsRem[btnsRem.length-1].style.display = "none";
	// Updates the ingredient numbers.
	var count = $("#ingredients").find("h3 > span");
	for(var i = 0; i < count.length; i++) { count[i].innerHTML = (i + 1); }
}
// Adds a new direction for user to fill in.
function addDirection(elem)
{
	// Find all relevant tags once to avoid redundancy.
	var directions = $("#directions").children();
	var dirLength = directions.length;
	var btnsToHideAdd = $("#directions").find(".add-direction");
	var btnsToHideDel = $("#directions").find(".delete-direction");
	var btnsToShow = $("#directions").find(".remove-direction");
	// Updates the add and remove buttons so only the bottom direction has both.
	for(var i = 0; i < btnsToHideAdd.length; i++)
	{
		if(btnsToHideAdd[i]) btnsToHideAdd[i].style.display = "none";
		if(btnsToHideDel[i]) btnsToHideDel[i].style.display = "none";
		if(btnsToShow[i]) btnsToShow[i].style.display = "block";
	}
	// Adds the HTML inputs for a new direction.
	$("#directions").append(
		'<div id="direction-' + dirLength + '" class="direction-chunk">' +
			'<hr/>' +
			'<div class="stand-alone col-lg-12 col-md-12 col-sm-12 col-xs-12">' +
				'<label><span>' + dirLength + '</span>: </label>' +
				'<input type="text" placeholder="(ie. cut the veggies)"/>' +
			'</div>' +
			'<div class="stand-alone col-lg-6 col-md-6 col-sm-6 col-xs-12">' +
				'<button class="add-direction" onclick="addDirection()">Add Direction</button>' +
			'</div>' +
			'<div class="stand-alone col-lg-6 col-md-6 col-sm-6 col-xs-12">' +
				'<button class="delete-direction" onclick="removeDirection(\'direction-' + dirLength + '\')">Remove Direction</button>' +
			'</div>' +
			'<div class="stand-alone col-lg-4 col-lg-offset-4 col-md-4 col-md-offset-4 col-sm-4 col-sm-offset-4 col-xs-12">' +
				'<button class="remove-direction" onclick="removeDirection(\'direction-' + dirLength + '\')" style="display:none;">Remove Direction</button>' +
			'</div>' +
		'</div>');
}
// Removes an new direction for user to fill in.
function removeDirection(elem)
{
	// Gets rid of the direction if it isn't the only one left.
	var directions = $("#directions").children();
	var dirLength = directions.length - 1;
	if(dirLength > 1) $("#" + elem).remove();
	// Updated button list.
	var btnsAdd = $("#directions").find(".add-direction");
	var btnsDel = $("#directions").find(".delete-direction");
	var btnsRem = $("#directions").find(".remove-direction");
	// Updates the add and remove buttons so only the bottom direction has both.
	if(btnsAdd[btnsAdd.length-1])btnsAdd[btnsAdd.length-1].style.display = "block";
	if(btnsDel[btnsDel.length-1])btnsDel[btnsDel.length-1].style.display = "block";
	if(btnsRem[btnsRem.length-1])btnsRem[btnsRem.length-1].style.display = "none";
	// Updates the direction numbers.
	var count = $("#directions").find("label > span");
	for(var i = 0; i < count.length; i++) { count[i].innerHTML = (i + 1); }
}
// Collects, validates, and organizes data from "create a recipe" and passes it to the Firebase API.
function submitRecipe()
{
	// Collecting image ul data.
	var img;
	var imagePasted = $("#img-url").val();
	// Checking to see which of the two options for image upload the user chose.
	if(imageUpload === "") img = imagePasted;
	else img = imageUpload;

	// Collect data from all fields.
	var title = $("#recipe-title").val();
	var dominantTaste = $("#taste").val();
	var mealTime = $("#meal-time").val();
	var synopsis = $("#recipe-description").val();
	var ingredients = $("#ingredients").children();
	var ingrLength = ingredients.length - 1;
	var ingNames = $("#ingredients").find(".ingredient-name");
	var ingDescriptions = $("#ingredients").find(".ingredient-desc");
	var ingQuantities = $("#ingredients").find(".ingredient-quant");
	var ingUnits = $("#ingredients").find(".ingredient-unit");
	var directions = $("#directions").find("input");
	var prepTime = $("#pTime").val();
	var cookTime = $("#cTime").val();
	var totalTime = $("#tTime").val();
	var confirm;
	// Verifies user left no field empty. If so, spawn modal and return from function.
	if( (img === "" || img === null || img === undefined) ||
		(title === "" || title === null || title === undefined) ||
		(dominantTaste === "" || dominantTaste === null || dominantTaste === undefined) ||
		(mealTime === "" || mealTime === null || mealTime === undefined) ||
		(synopsis === "" || synopsis === null || synopsis === undefined) ||
		(prepTime === "" || prepTime === null || prepTime === undefined) ||
		(cookTime === "" || cookTime === null || cookTime === undefined) ||
		(totalTime === "" || totalTime === null || totalTime === undefined) )
	{
		spawnModal("Invalid Input", "<p>You left one or more fields empty. Would you like to reset the page</p>", "http://www.williamrobertfunk.com/applications/phood-buddy/create-recipe.html", true);
		return;
	}
	// Collect ingredient data.
	var ingreds = [];
	for(var i = 0; i < ingrLength; i++)
	{
		// Verifies user left no field empty. If so, spawn modal and return from function.
		if( (ingNames[i].value === "" || ingNames[i].value === null || ingNames[i].value === undefined) ||
		(ingDescriptions[i].value === "" || ingDescriptions[i].value === null || ingDescriptions[i].value === undefined) ||
		(ingQuantities[i].value === "" || ingQuantities[i].value === null || ingQuantities[i].value === undefined) ||
		(ingUnits[i].value === "" || ingUnits[i].value === null || ingUnits[i].value === undefined) )
		{
			spawnModal("Invalid Input", "<p>You left one or more fields empty. Would you like to reset the page</p>", "http://www.williamrobertfunk.com/applications/phood-buddy/create-recipe.html", true);
			return;
		}
		// Collects data from each field and inputs into double array.
		ingreds[i] = [];
		ingreds[i].push(ingNames[i].value);
		ingreds[i].push(ingDescriptions[i].value);
		ingreds[i].push(ingQuantities[i].value);
		ingreds[i].push(ingUnits[i].value);
	}
	// Collect direction data.
	var directs = [];
	for(var j = 0; j < directions.length; j++)
	{
		// Verifies user left no field empty. If so, spawn modal and return from function.
		if( (directions[j].value === "" || directions[j].value === null || directions[j].value === undefined) )
		{
			spawnModal("Invalid Input", "<p>You left one or more fields empty. Would you like to reset the page</p>", "http://www.williamrobertfunk.com/applications/phood-buddy/create-recipe.html", true);
			return;
		}
		directs[j] = directions[j].value;
	}
	// Sends collected, and validated data, to the data layer for proper assembly
	assembleRecipe(synopsis, img, title, dominantTaste, ingreds, directs, cookTime, prepTime, totalTime, mealTime, addRecipeReply);
}
// Callback to inform user whether submitted recipe made it to the db or not.
function addRecipeReply(result)
{
	if(result) spawnModal("Submission Success", "<p>Your recipe has found its new home at Phood Buddy</p>", "http://www.williamrobertfunk.com/applications/phood-buddy/create-recipe.html", false);
	else spawnModal("Submission Failed", "<p>Your recipe wasn't submitted. Double check your inputs</p>", "http://www.williamrobertfunk.com/applications/phood-buddy/create-recipe.html", false);
}
// Initiates the content for the weekly schedule page.
function initSchedule()
{
	getPlanner(popScheduleCallback);
}
// Populates the weekly schedule with user's stored choices.
function popScheduleCallback(result)
{
	if(result === false)
	{
		spawnModal("Not Logged In", "<p>You don't appear to be logged in. Go back to the login page.</p>", "http://www.williamrobertfunk.com/applications/phood-buddy/login.html", false);
	}
	else
	{
		var mondayBfast = (result.monday.breakfast.name === "" ? '<div class="breakfast" onclick="openRecipeOptions(\'monday\', \'breakfast\')">Select Breakfast Recipe</div>' : '<div class="breakfast"><a href="recipe.html?' + result.monday.breakfast.recipeId + '">' + result.monday.breakfast.name + '</a><button class="btn-del-choice" onclick="updatePlanner(\'monday\', \'breakfast\', \'\', \'\', deleteScheduledRecipe)">Delete</button></div>');
		var mondayLunch = (result.monday.lunch.name === "" ? '<div class="lunch" onclick="openRecipeOptions(\'monday\', \'lunch\')">Select Lunch Recipe</div>' : '<div class="lunch"><a href="recipe.html?' + result.monday.lunch.recipeId + '">' + result.monday.lunch.name + '</a><button class="btn-del-choice" onclick="updatePlanner(\'monday\', \'lunch\', \'\', \'\', deleteScheduledRecipe)">Delete</button></div>');
		var mondayDinner = (result.monday.dinner.name === "" ? '<div class="dinner" onclick="openRecipeOptions(\'monday\', \'dinner\')">Select Dinner Recipe</div>' : '<div class="dinner"><a href="recipe.html?' + result.monday.dinner.recipeId + '">' + result.monday.dinner.name + '</a><button class="btn-del-choice" onclick="updatePlanner(\'monday\', \'dinner\', \'\', \'\', deleteScheduledRecipe)">Delete</button></div>');
		var tuesdayBfast = (result.tuesday.breakfast.name === "" ? '<div class="breakfast" onclick="openRecipeOptions(\'tuesday\', \'breakfast\')">Select Breakfast Recipe</div>' : '<div class="breakfast"><a href="recipe.html?' + result.tuesday.breakfast.recipeId + '">' + result.tuesday.breakfast.name + '</a><button class="btn-del-choice" onclick="updatePlanner(\'tuesday\', \'breakfast\', \'\', \'\', deleteScheduledRecipe)">Delete</button></div>');
		var tuesdayLunch = (result.tuesday.lunch.name === "" ? '<div class="lunch" onclick="openRecipeOptions(\'tuesday\', \'lunch\')">Select Lunch Recipe</div>' : '<div class="lunch"><a href="recipe.html?' + result.tuesday.lunch.recipeId + '">' + result.tuesday.lunch.name + '</a><button class="btn-del-choice" onclick="updatePlanner(\'tuesday\', \'lunch\', \'\', \'\', deleteScheduledRecipe)">Delete</button></div>');
		var tuesdayDinner = (result.tuesday.dinner.name === "" ? '<div class="dinner" onclick="openRecipeOptions(\'tuesday\', \'dinner\')">Select Dinner Recipe</div>' : '<div class="dinner"><a href="recipe.html?' + result.tuesday.dinner.recipeId + '">' + result.tuesday.dinner.name + '</a><button class="btn-del-choice" onclick="updatePlanner(\'tuesday\', \'dinner\', \'\', \'\', deleteScheduledRecipe)">Delete</button></div>');
		var wednesdayBfast = (result.wednesday.breakfast.name === "" ? '<div class="breakfast" onclick="openRecipeOptions(\'wednesday\', \'breakfast\')">Select Breakfast Recipe</div>' : '<div class="breakfast"><a href="recipe.html?' + result.wednesday.breakfast.recipeId + '">' + result.wednesday.breakfast.name + '</a><button class="btn-del-choice" onclick="updatePlanner(\'wednesday\', \'breakfast\', \'\', \'\', deleteScheduledRecipe)">Delete</button></div>');
		var wednesdayLunch = (result.wednesday.lunch.name === "" ? '<div class="lunch" onclick="openRecipeOptions(\'wednesday\', \'lunch\')">Select Lunch Recipe</div>' : '<div class="lunch"><a href="recipe.html?' + result.wednesday.lunch.recipeId + '">' + result.wednesday.lunch.name + '</a><button class="btn-del-choice" onclick="updatePlanner(\'wednesday\', \'lunch\', \'\', \'\', deleteScheduledRecipe)">Delete</button></div>');
		var wednesdayDinner = (result.wednesday.dinner.name === "" ? '<div class="dinner" onclick="openRecipeOptions(\'wednesday\', \'dinner\')">Select Dinner Recipe</div>' : '<div class="dinner"><a href="recipe.html?' + result.wednesday.dinner.recipeId + '">' + result.wednesday.dinner.name + '</a><button class="btn-del-choice" onclick="updatePlanner(\'wednesday\', \'dinner\', \'\', \'\', deleteScheduledRecipe)">Delete</button></div>');
		var thursdayBfast = (result.thursday.breakfast.name === "" ? '<div class="breakfast" onclick="openRecipeOptions(\'thursday\', \'breakfast\')">Select Breakfast Recipe</div>' : '<div class="breakfast"><a href="recipe.html?' + result.thursday.breakfast.recipeId + '">' + result.thursday.breakfast.name + '</a><button class="btn-del-choice" onclick="updatePlanner(\'thursday\', \'breakfast\', \'\', \'\', deleteScheduledRecipe)">Delete</button></div>');
		var thursdayLunch = (result.thursday.lunch.name === "" ? '<div class="lunch" onclick="openRecipeOptions(\'thursday\', \'lunch\')">Select Lunch Recipe</div>' : '<div class="lunch"><a href="recipe.html?' + result.thursday.lunch.recipeId + '">' + result.thursday.lunch.name + '</a><button class="btn-del-choice" onclick="updatePlanner(\'thursday\', \'lunch\', \'\', \'\', deleteScheduledRecipe)">Delete</button></div>');
		var thursdayDinner = (result.thursday.dinner.name === "" ? '<div class="dinner" onclick="openRecipeOptions(\'thursday\', \'dinner\')">Select Dinner Recipe</div>' : '<div class="dinner"><a href="recipe.html?' + result.thursday.dinner.recipeId + '">' + result.thursday.dinner.name + '</a><button class="btn-del-choice" onclick="updatePlanner(\'thursday\', \'dinner\', \'\', \'\', deleteScheduledRecipe)">Delete</button></div>');
		var fridayBfast = (result.friday.breakfast.name === "" ? '<div class="breakfast" onclick="openRecipeOptions(\'friday\', \'breakfast\')">Select Breakfast Recipe</div>' : '<div class="breakfast"><a href="recipe.html?' + result.friday.breakfast.recipeId + '">' + result.friday.breakfast.name + '</a><button class="btn-del-choice" onclick="updatePlanner(\'friday\', \'breakfast\', \'\', \'\', deleteScheduledRecipe)">Delete</button></div>');
		var fridayLunch = (result.friday.lunch.name === "" ? '<div class="lunch" onclick="openRecipeOptions(\'friday\', \'lunch\')">Select Lunch Recipe</div>' : '<div class="lunch"><a href="recipe.html?' + result.friday.lunch.recipeId + '">' + result.friday.lunch.name + '</a><button class="btn-del-choice" onclick="updatePlanner(\'friday\', \'lunch\', \'\', \'\', deleteScheduledRecipe)">Delete</button></div>');
		var fridayDinner = (result.friday.dinner.name === "" ? '<div class="dinner" onclick="openRecipeOptions(\'friday\', \'dinner\')">Select Dinner Recipe</div>' : '<div class="dinner"><a href="recipe.html?' + result.friday.dinner.recipeId + '">' + result.friday.dinner.name + '</a><button class="btn-del-choice" onclick="updatePlanner(\'friday\', \'dinner\', \'\', \'\', deleteScheduledRecipe)">Delete</button></div>');
		var saturdayBfast = (result.saturday.breakfast.name === "" ? '<div class="breakfast" onclick="openRecipeOptions(\'saturday\', \'breakfast\')">Select Breakfast Recipe</div>' : '<div class="breakfast"><a href="recipe.html?' + result.saturday.breakfast.recipeId + '">' + result.saturday.breakfast.name + '</a><button class="btn-del-choice" onclick="updatePlanner(\'saturday\', \'breakfast\', \'\', \'\', deleteScheduledRecipe)">Delete</button></div>');
		var saturdayLunch = (result.saturday.lunch.name === "" ? '<div class="lunch" onclick="openRecipeOptions(\'saturday\', \'lunch\')">Select Lunch Recipe</div>' : '<div class="lunch"><a href="recipe.html?' + result.saturday.lunch.recipeId + '">' + result.saturday.lunch.name + '</a><button class="btn-del-choice" onclick="updatePlanner(\'saturday\', \'lunch\', \'\', \'\', deleteScheduledRecipe)">Delete</button></div>');
		var saturdayDinner = (result.saturday.dinner.name === "" ? '<div class="dinner" onclick="openRecipeOptions(\'saturday\', \'dinner\')">Select Dinner Recipe</div>' : '<div class="dinner"><a href="recipe.html?' + result.saturday.dinner.recipeId + '">' + result.saturday.dinner.name + '</a><button class="btn-del-choice" onclick="updatePlanner(\'saturday\', \'dinner\', \'\', \'\', deleteScheduledRecipe)">Delete</button></div>');
		var sundayBfast = (result.sunday.breakfast.name === "" ? '<div class="breakfast" onclick="openRecipeOptions(\'sunday\', \'breakfast\')">Select Breakfast Recipe</div>' : '<div class="breakfast"><a href="recipe.html?' + result.sunday.breakfast.recipeId + '">' + result.sunday.breakfast.name + '</a><button class="btn-del-choice" onclick="updatePlanner(\'sunday\', \'breakfast\', \'\', \'\', deleteScheduledRecipe)">Delete</button></div>');
		var sundayLunch = (result.sunday.lunch.name === "" ? '<div class="lunch" onclick="openRecipeOptions(\'sunday\', \'lunch\')">Select Lunch Recipe</div>' : '<div class="lunch"><a href="recipe.html?' + result.sunday.lunch.recipeId + '">' + result.sunday.lunch.name + '</a><button class="btn-del-choice" onclick="updatePlanner(\'sunday\', \'lunch\', \'\', \'\', deleteScheduledRecipe)">Delete</button></div>');
		var sundayDinner = (result.sunday.dinner.name === "" ? '<div class="dinner" onclick="openRecipeOptions(\'sunday\', \'dinner\')">Select Dinner Recipe</div>' : '<div class="dinner"><a href="recipe.html?' + result.sunday.dinner.recipeId + '">' + result.sunday.dinner.name + '</a><button class="btn-del-choice" onclick="updatePlanner(\'sunday\', \'dinner\', \'\', \'\', deleteScheduledRecipe)">Delete</button></div>');
		$("#wrapper").html(
			'<div id="week-schedule">' +
				'<h1>Week\'s Recipes</h1>' +
				'<div class="row">' +
					'<div class="col-lg-8 col-lg-offset-2 col-md-8 col-md-offset-2 col-sm-8 col-sm-offset-2 col-xs-12">' +
						'<div id="monday" class="weekday col-lg-6 col-md-6 col-sm-6 col-xs-12">' +
							'<h3>Monday</h3>' + mondayBfast + mondayLunch + mondayDinner +
						'</div>' +
						'<div id="tuesday" class="weekday col-lg-6 col-md-6 col-sm-6 col-xs-12">' +
							'<h3>Tuesday</h3>' + tuesdayBfast + tuesdayLunch + tuesdayDinner +
						'</div>' +
						'<div id="wednesday" class="weekday col-lg-6 col-md-6 col-sm-6 col-xs-12">' +
							'<h3>Wednesday</h3>' + wednesdayBfast + wednesdayLunch + wednesdayDinner +
						'</div>' +
						'<div id="thursday" class="weekday col-lg-6 col-md-6 col-sm-6 col-xs-12">' +
							'<h3>Thursday</h3>' + thursdayBfast + thursdayLunch + thursdayDinner +
						'</div>' +
						'<div id="friday" class="weekday col-lg-6 col-md-6 col-sm-6 col-xs-12">' +
							'<h3>Friday</h3>' + fridayBfast + fridayLunch + fridayDinner +
						'</div>' +
						'<div id="saturday" class="weekday col-lg-6 col-md-6 col-sm-6 col-xs-12">' +
							'<h3>Saturday</h3>' + saturdayBfast + saturdayLunch + saturdayDinner +
						'</div>' +
						'<div id="sunday" class="weekday col-lg-12 col-md-12 col-sm-12 col-xs-12">' +
							'<h3>Sunday</h3>' + sundayBfast + sundayLunch + sundayDinner +
						'</div>' +
					'</div></div></div>'
		);
	}
}
// User chose a mealtime to populate in the "weekly schedule"
// Options are loaded into the Dom.
function openRecipeOptions(day, mealTime)
{
	var activeDiv = $("#" + day + " > ." + mealTime);
	activeDiv.html(
		"<div class='recipe-options-wrapper col-lg-12 col-md-12 col-sm-12 col-xs-12'>" +
			"<button id='" + day + "-" + mealTime + "-choice' class='phood-buddy-choice col-lg-4 col-md-4 col-sm-4 col-xs-4'>PB Pick</button>" +
			"<button id='" + day + "-" + mealTime + "-fav' class='phood-buddy-fav col-lg-4 col-md-4 col-sm-4 col-xs-4'>Fav Pick</button>" + 
			"<button id='" + day + "-" + mealTime + "-cancel' class='phood-buddy-cancel col-lg-4 col-md-4 col-sm-4 col-xs-4'>Cancel</button>" +
		"</div>"
	);
	$("#" + day + " > ." + mealTime).addClass("active");
	$("#" + day + " > ." + mealTime).removeAttr("onclick");
	
	// When user clicks the PB Pick button, random recipe is selected and name of recipe is placed in slot.
	$("#" + day + " > ." + mealTime + " > .recipe-options-wrapper > .phood-buddy-choice").click(function(event){
		getRandomRecipe(day, mealTime, popPBPick);
	});
	// When user clicks the Fav Pick button, random favorite recipe is selected and name of recipe is placed in slot.
	$("#" + day + " > ." + mealTime + " > .recipe-options-wrapper > .phood-buddy-fav").click(function(event){
		getRandomFavRecipe(day, mealTime, popFavPick);
	});
	// When user clicks the cancel button, all returns to normal.
	$("#" + day + " > ." + mealTime + " > .recipe-options-wrapper > .phood-buddy-cancel").click(function(event){
		$( this ).unbind( event );
		$("#" + day + " > ." + mealTime).html("Select " + mealTime + " Recipe");
		$("#" + day + " > ." + mealTime).removeClass("active");
		setTimeout( function()
		{
			$("#" + day + " > ." + mealTime).attr('onclick', 'openRecipeOptions(\'' + day + '\', \'' + mealTime + '\')');
		}, 200);
	});
}
// Callback function to populate slot when PB finds a recipe for user.
function popPBPick(recipe, day, mealTime)
{
	if(recipe === false)
	{
		spawnModal("Failure to Select Recipe", "<p>We were unable to pick a recipe from your favorite list.<br/><br/>Would you like us to refresh the page?</p>", "http://www.williamrobertfunk.com/applications/phood-buddy/schedule.html", true);
		$("#" + day + " > ." + mealTime).html("Select " + mealTime + " Recipe");
		$("#" + day + " > ." + mealTime).removeClass("active");
		setTimeout( function()
		{
			$("#" + day + " > ." + mealTime).attr('onclick', 'openRecipeOptions(\'' + day + '\', \'' + mealTime + '\')');
		}, 200);
	}
	else
	{
		$("#" + day + " > ." + mealTime).html("<a href='recipe.html?" + recipe.id + "'>" + recipe.name + "</a><button class='btn-del-choice' onclick='updatePlanner(\"" + day + "\", \"" + mealTime + "\", \"\", \"\", deleteScheduledRecipe)'>Delete</button>");
	}
}
// Callback function to populate slot when PB finds a recipe for user.
function popFavPick(recipe, day, mealTime)
{
	if(recipe === false)
	{
		spawnModal("Failure to Select Recipe", "<p>We were unable to pick a recipe to match your tastes (maybe you don't have any recipes favorited).<br/><br/>Would you like us to refresh the page?</p>", "schedule.html", true);
		$("#" + day + " > ." + mealTime).html("Select " + mealTime + " Recipe");
		$("#" + day + " > ." + mealTime).removeClass("active");
		setTimeout( function()
		{
			$("#" + day + " > ." + mealTime).attr('onclick', 'openRecipeOptions(\'' + day + '\', \'' + mealTime + '\')');
		}, 200);
	}
	else
	{
		$("#" + day + " > ." + mealTime).html("<a href='recipe.html?" + recipe.recipeId + "'>" + recipe.name + "</a><button class='btn-del-choice' onclick='updatePlanner(\"" + day + "\", \"" + mealTime + "\", \"\", \"\", deleteScheduledRecipe)'>Delete</button>");
	}
}
// Callback function to delete an already chosen recipe on the recipe list.
function deleteScheduledRecipe(result, day, mealTime)
{
	if(result === false)
	{
		spawnModal("Failed Deletion", "<p>We were unable to update your schedule.<br/><br/>We will refresh the page to let you try again.</p>", "schedule.html", false);
	}
	else
	{
		$("#" + day + " > ." + mealTime).html("Select " + mealTime + " Recipe");
		$("#" + day + " > ." + mealTime).removeClass("active");
		setTimeout( function()
		{
			$("#" + day + " > ." + mealTime).attr('onclick', 'openRecipeOptions(\'' + day + '\', \'' + mealTime + '\')');
		}, 200);
	}
}
// Initiates the content for the favorite recipes page.
function initFavList(cat)
{
	switch(cat)
	{
		case 0:
		{
			getFavAll(counter, popFavListCallback);
			break;
		}
		case 1:
		{
			getFavUserRecipe(counter, popFavListCallback);
			break;
		}
		case 2:
		{
			getFavOther(counter, popFavListCallback);
			break;
		}
	}
}
// Populates the weekly schedule with all user's stored favorites.
function popFavListCallback(result, amount)
{
	/*$("img").on( "error", function(e){
		console.log("ERRRRROOOOOOR: ", e);
		$(this).attr("src", "images/placeholder-recipe.jpg");
	});*/
	if(amount) listCount = amount;
	$("#fav-recipes-container").html("");
	for(var i = 0; i < result.info.length; i++)
	{
		var img = (result.info[i].img === "") ? ("images/placeholder-recipe.jpg") : (result.info[i].img + "");
		$("#fav-recipes-container").append(
			'<div class="fav-recipe row">' +
				'<div class="col-lg-2 col-lg-offset-2 col-md-2 col-md-offset-2 col-sm-2 col-sm-offset-2 col-xs-12">' +
					'<img src=' + img + ' alt="' + result.info[i].name + '">' +
				'</div>' +
				'<div class="col-lg-5 col-lg-offset-1 col-md-5 col-md-offset-1 col-sm-5 col-sm-offset-1 col-xs-12">' +
					'<h3>' + result.info[i].name + '</h3>' +
					'<h4>Taste: <span>' + result.info[i].taste + '</span></h4>' +
					'<p>' + result.info[i].description + '</p>' +
				'</div>' +
				'<div class="col-lg-2 col-md-2 col-sm-2 col-xs-12"></div>' +
			'</div>' +
			'<div class="divider row">' +
				'<div class="col-lg-8 col-lg-offset-2 col-md-8 col-md-offset-2 col-sm-8 col-sm-offset-2 col-xs-12"></div>' +
			'</div>'
		);
	}
	$('img').bind('error', function (e) {
		$(this).attr("src", "images/placeholder-recipe.jpg");
	});
	$("#page-count").html( "Page "+ (counter + 1) + " of " + Math.floor(listCount / 10 + 1) );
}
// Moves right through fav list pagination
function increaseCount()
{
	counter++;
	if((listCount % (counter * 10)) === listCount) counter = 0;
	initFavList(cat);
}
// Moves left through fav list pagination
function decreaseCount()
{
	counter--;
	if(counter < 0) counter = 0;
	initFavList(cat);
}
// Initiates the content for the recipe page.
function initRecipe()
{
	getRandomRecipe("", "", popRecipeCallback);
}
// Populates the recipe data either from random pick, or from the id in the URL.
function popRecipeCallback(result)
{
	console.log(result);
}
// Customizable modal to be reused through all pages.
function spawnModal(header, body, redirect, moreThanOneBtn, cancel)
{
	$("#modal").modal({backdrop: "static", keyboard: false, show: true});
	$(".modal-header").html(header);
	$(".modal-body").html(body);

	if(moreThanOneBtn) $("#btn-cancel").css("display", "inline-block");
	else  $("#btn-cancel").css("display", "none");

	$("#btn-confirm").click(function() {
		window.location = redirect;
		$("#btn-cancel").css("display", "inline-block");
	});
}