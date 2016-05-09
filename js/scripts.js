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
// Launches the call for favorited recipes to populate landing page.
function initMainPageRecipes()
{
	if(checkAuth())
	{
		loggedIn();
		getFavAll(0, popMainPageRecipesCallback);
	}
	else
	{
		window.location = "http://www.williamrobertfunk.com/applications/phood-buddy/login.html";
	}
}
// Once backend responds with favorited recipes, it uses it to
// populate the landing page's carousel.
function popMainPageRecipesCallback(result)
{
	if(result === false)
	{
		var favRecipes = '';
		favRecipes +=	'<div class="col-lg-2 col-lg-offset-2 col-md-2 col-md-offset-2 col-sm-2 col-sm-offset-2 col-xs-12">' +
							'<a href="favorite-recipes.html" target="_self"><img class="img-responsive" src="images/img-category-favrecipes.jpg"></a>' +
						'</div>' +
						'<div class="col-lg-6 col-md-6 col-sm-6 col-xs-12">' +
							'<div id="carousel-recipes" class="carousel slide" data-ride="carousel">' +
								'<!-- Wrapper for slides -->' +
								'<div class="carousel-inner" role="listbox">' +
								'<div class="item active row">' +
									'<div class="col-lg-2 col-lg-offset-2 col-md-2 col-md-offset-2 col-sm-2 col-sm-offset-2 col-xs-12">' +
										'<img src="images/placeholder-recipe.jpg" alt="Your Favorite Recipes Here">' +
									'</div>' +
									'<div class="col-lg-6 col-lg-offset-1 col-md-6 col-md-offset-1 col-sm-6 col-sm-offset-1 col-xs-12">' +
										'<h3>Your Favorite Recipes Here</h3>' +
										'<h4><span> </span> </h4>' +
										'<p>No favorite recipes found.</p>' +
									'</div>' +
								'</div>' +
								'</div>' +
								'<!-- Left and right controls -->' +
								'<a class="left carousel-control" href="#carousel-recipes" role="button" data-slide="prev">' +
									'<span class="glyphicon glyphicon-chevron-left turquois" aria-hidden="true"></span>' +
									'<span class="sr-only">Previous</span>' +
								'</a>' +
								'<a class="right carousel-control" href="#carousel-recipes" role="button" data-slide="next">' +
									'<span class="glyphicon glyphicon-chevron-right turquois" aria-hidden="true"></span>' +
									'<span class="sr-only">Next</span>' +
								'</a>' +
							'</div>' +
						'</div>';
		$("#main-recipes").html('');
		$("#main-recipes").html(favRecipes);
	}
	else
	{
		var favRecipes = '';
		favRecipes +=	'<div class="col-lg-2 col-lg-offset-2 col-md-2 col-md-offset-2 col-sm-2 col-sm-offset-2 col-xs-12">' +
							'<a href="favorite-recipes.html" target="_self"><img class="img-responsive" src="images/img-category-favrecipes.jpg"></a>' +
						'</div>' +
						'<div class="col-lg-6 col-md-6 col-sm-6 col-xs-12">' +
							'<div id="carousel-recipes" class="carousel slide" data-ride="carousel">' +
								'<!-- Wrapper for slides -->' +
								'<div class="carousel-inner" role="listbox">';
						for(var i = 0; i < result['info'].length; i++)
						{
							var img = (result.info[i].img === "") ? ("images/placeholder-recipe.jpg") : ((Array.isArray(result.info[i].img)) ? result.info[i].img[0] + "" : result.info[i].img + "");
							var calories = (result.info[i].nutrition && result.info[i].nutrition['calories'] === "") ? "?" : (result.info[i].nutrition['calories'] + "");
							var description = (result.info[i].description.length >= 50) ? (result.info[i].description.substr(0, 50) + " ...") : (result.info[i].description + "");
							var taste = (result.info[i].taste === "") ? "(dominant taste: unknown)" : ("(dominant taste: " + result.info[i].taste + ")");
							var id = result.info[i].id.trim();
							var firstItem = (i === 0) ? " active" : "";
							favRecipes +=	'<div class="item' + firstItem + ' row" onclick="goToRecipe(' + id + ')">' +
												'<div class="img-container col-lg-3 col-lg-offset-1 col-md-3 col-md-offset-1 col-sm-3 col-sm-offset-1 col-xs-12">' +
													'<img src="' + img + '" alt="' + result.info[i].name + '">' +
												'</div>' +
												'<div class="details-container col-lg-5 col-md-5 col-sm-5 col-xs-12">' +
													'<h3>' + result.info[i].name + '</h3>' +
													'<h4><span>' + result.info[i].nutrition['calories'] + '</span> calories <br/>' + taste + '</h4>' +
													'<p>' + description + '</p>' +
												'</div>' +
											'</div>';
						}
				favRecipes +=	'</div>' +
								'<!-- Left and right controls -->' +
								'<a class="left carousel-control" href="#carousel-recipes" role="button" data-slide="prev">' +
									'<span class="glyphicon glyphicon-chevron-left turquois" aria-hidden="true"></span>' +
									'<span class="sr-only">Previous</span>' +
								'</a>' +
								'<a class="right carousel-control" href="#carousel-recipes" role="button" data-slide="next">' +
									'<span class="glyphicon glyphicon-chevron-right turquois" aria-hidden="true"></span>' +
									'<span class="sr-only">Next</span>' +
								'</a>' +
							'</div>' +
						'</div>';
		$("#main-recipes").html('');
		$("#main-recipes").html(favRecipes);
		$('#carousel-recipes').carousel();
	}
	initMainPageGroceries();
}
// Launches the call for favorited recipes to populate landing page.
function initMainPageGroceries()
{
	if(checkAuth())
	{
		loggedIn();
		getGroceryList(popMainPageGroceriesCallback);
	}
	else
	{
		window.location = "http://www.williamrobertfunk.com/applications/phood-buddy/login.html";
	}
}
// Once backend responds with favorited recipes, it uses it to
// populate the landing page's carousel.
function popMainPageGroceriesCallback(result)
{
	if(result !== false)
	{
		var cats = Object.keys(result);
		var itemCounter = 0;
		for(var it = 0; it < cats.length-1; it++)
		{
			var tempObj = result[cats[it]];
			if( !('items' in tempObj) ) { continue; }
			else { itemCounter++; }
		}
		if(itemCounter <= 0) { result = false; }
	}
	if(result === false)
	{
		var groceryList = '';
		groceryList += '<div class="col-lg-2 col-lg-offset-2 col-md-2 col-md-offset-2 col-sm-2 col-sm-offset-2 col-xs-12">' +
							'<a href="groceries.html" target="_self"><img class="img-responsive" src="images/img-category-groceries.jpg"></a>' +
						'</div>' +
						'<div class="col-lg-6 col-md-6 col-sm-6 col-xs-12">' +
							'<div id="carousel-groceries" class="carousel slide" data-ride="carousel">' +
								'<!-- Wrapper for slides -->' +
								'<div class="carousel-inner" role="listbox">' +
									'<div class="item active row food-cat" onclick="window.location = \'http://www.williamrobertfunk.com/applications/phood-buddy/groceries.html\';">' +
										'<h3>NO ITEMS IN GROCERY LIST</h3>' +
										'<div class="col-lg-10 col-lg-offset-2 col-md-10 col-md-offset-2 col-sm-10 col-sm-offset-2 col-xs-10 col-xs-offset-2">' +
											'<ul>' +
												'<li>Empty Item</li>' +
												'<li>Empty Item</li>' +
												'<li>Empty Item</li>' +
												'<li>Empty Item</li>' +
											'</ul>' +
											'<ul>' +
												'<li>Empty Item</li>' +
												'<li>Empty Item</li>' +
												'<li>Empty Item</li>' +
												'<li>Empty Item</li>' +
											'</ul>' +
											'<ul>' +
												'<li>Empty Item</li>' +
												'<li>Empty Item</li>' +
												'<li>Empty Item</li>' +
												'<li>Empty Item</li>' +
											'</ul>' +
										'</div>' +
									'</div>' +
								'</div>' +
								'<!-- Left and right controls -->' +
								'<a class="left carousel-control" href="#carousel-groceries" role="button" data-slide="prev">' +
									'<span class="glyphicon glyphicon-chevron-left turquois" aria-hidden="true"></span>' +
									'<span class="sr-only">Previous</span>' +
								'</a>' +
								'<a class="right carousel-control" href="#carousel-groceries" role="button" data-slide="next">' +
									'<span class="glyphicon glyphicon-chevron-right turquois" aria-hidden="true"></span>' +
									'<span class="sr-only">Next</span>' +
								'</a>' +
							'</div>' +
						'</div>';
		$("#main-groceries").html("");
		$("#main-groceries").html(groceryList);
		$('#carousel-groceries').carousel();
	}
	else
	{
		var categories = Object.keys(result);
		var groceryList = "";
		groceryList += '<div class="col-lg-2 col-lg-offset-2 col-md-2 col-md-offset-2 col-sm-2 col-sm-offset-2 col-xs-12">' +
							'<a href="groceries.html" target="_self"><img class="img-responsive" src="images/img-category-groceries.jpg"></a>' +
						'</div>' +
						'<div class="col-lg-6 col-md-6 col-sm-6 col-xs-12">' +
							'<div id="carousel-groceries" class="carousel slide" data-ride="carousel">' +
								'<!-- Wrapper for slides -->' +
								'<div class="carousel-inner" role="listbox">';
				for(var i = 0; i < categories.length-1; i++)
				{
					var obj = result[categories[i]];
					var items = 0;
					if( !('items' in obj) ) { items = []; }
					else { items = Object.keys(obj.items); }
					var firstCat = (i === 0) ? ' active' : '';
					groceryList += 	'<div class="item' + firstCat + ' row food-cat" onclick="window.location = \'http://www.williamrobertfunk.com/applications/phood-buddy/groceries.html\';">' +
										'<h3>' + obj.name + '</h3>' +
										'<div class="col-lg-10 col-lg-offset-2 col-md-10 col-md-offset-2 col-sm-10 col-sm-offset-2 col-xs-10 col-xs-offset-2">';
					for(var j = 0; j < 12; j++)
					{				
						if( (j !== 0) && (j % 4 === 0) ) { groceryList +=  '</ul>'; }	
						if(j % 4 === 0) { groceryList += '<ul>'; }
						if(j < items.length) { groceryList += '<li>' + obj.items[items[j]].name + '</li>'; }
						else { groceryList += '<li>Empty Item</li>'; }
						/*	<ul>
								<li>Item #1</li>
								<li>Item #2</li>
								<li>Item #3</li>
								<li>Item #4</li>
							</ul>	*/
					}
					groceryList += 		'</div>' +
									'</div>';
				}
				groceryList +=	'</div>' +
								'<!-- Left and right controls -->' +
								'<a class="left carousel-control" href="#carousel-groceries" role="button" data-slide="prev">' +
									'<span class="glyphicon glyphicon-chevron-left turquois" aria-hidden="true"></span>' +
									'<span class="sr-only">Previous</span>' +
								'</a>' +
								'<a class="right carousel-control" href="#carousel-groceries" role="button" data-slide="next">' +
									'<span class="glyphicon glyphicon-chevron-right turquois" aria-hidden="true"></span>' +
									'<span class="sr-only">Next</span>' +
								'</a>' +
							'</div>' +
						'</div>';
		$("#main-groceries").html("");
		$("#main-groceries").html(groceryList);
		$('#carousel-groceries').carousel();
	}
}
// If user clicks on recipe in landing page, this takes them to the recipe.
function goToRecipe(recipeId)
{
	if(recipeId)
	{
		window.location = "http://www.williamrobertfunk.com/applications/phood-buddy/recipe.html?" + recipeId;
	}
	else
	{
		return false;
	}
}
// Modal response for whether registration was, or wasn't, successful.
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
// Modal response for whether login was, or wasn't, successful.
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
	if(checkAuth())
	{
		loggedIn();
		getPlanner(popScheduleCallback);
	}
	else
	{
		window.location = "http://www.williamrobertfunk.com/applications/phood-buddy/login.html";
	}
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
						'<a id="print-recipe" class="col-lg-12 col-md-12 col-sm-12 col-xs-12" href="javascript:window.print()">Print Schedule</a>' +
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
		spawnModal("Failure to Select Recipe", "<p>We were unable to pick a recipe to match your tastes (maybe you don't have any recipes favorited).<br/><br/>Would you like us to refresh the page?</p>", "http://www.williamrobertfunk.com/applications/phood-buddy/schedule.html", true);
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
		spawnModal("Failed Deletion", "<p>We were unable to update your schedule.<br/><br/>We will refresh the page to let you try again.</p>", "http://www.williamrobertfunk.com/applications/phood-buddy/schedule.html", false);
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
// Initiates the content for the groceries page.
function initGroceries()
{
	if(checkAuth())
	{
		loggedIn();
		getGroceryList(popGroceryCallback);
	}
	else { window.location = "http://www.williamrobertfunk.com/applications/phood-buddy/login.html"; }
}
// Populates the grocery list with user's stored grocery items.
function popGroceryCallback(result)
{
	if(result === false)
	{
		spawnModal("Not Logged In", "<p>You don't appear to be logged in. Go back to the login page.</p>", "http://www.williamrobertfunk.com/applications/phood-buddy/login.html", false);
	}
	else
	{
		$("#wrapper").html('');
		var categories = Object.keys(result);
		var itemCount = 0;
		for(var it = 0; it < categories.length-1; it++)
		{
			var obj = result[categories[it]];
			if( !('items' in obj) ) { continue; }
			else { itemCount++; }
		}
		var deleteList = (itemCount > 0) ? '<a id="delete-list" href="javascript:deleteList()">Delete Grocery List</a>' : '';
		var page= '' +
			'<div id="groceries">' +
				'<div class="row">' +
					'<div class="col-lg-8 col-lg-offset-2 col-md-8 col-md-offset-2 col-sm-8 col-sm-offset-2 col-xs-12">' +
						'<h2>Grocery List</h2>' +
						'<a id="print-list" href="javascript:window.print()">Print Grocery List</a>' +
						deleteList +
					'</div>' +
				'</div>' +
				'<div class="divider row">' +
					'<div class="col-lg-8 col-lg-offset-2 col-md-8 col-md-offset-2 col-sm-8 col-sm-offset-2 col-xs-12"></div>' +
				'</div>' +
				'<div class="row">' +
					'<div class="col-lg-8 col-lg-offset-2 col-md-8 col-md-offset-2 col-sm-8 col-sm-offset-2 col-xs-12">' +
						'<div class="row">' +
							'<a id="add-item-link" href="javascript:addItem()">Add Item</a>' +
							'<div id="add-item">' +
							'<select class="col-lg-2 col-md-12 col-sm-12 col-xs-12" name="addCat">' +
								'<option value="" disabled selected>Category</option>';
					for(var i = 0; i < categories.length-1; i++)
					{
						page += '<option value="' + categories[i] + '">' + result[categories[i]].name + '</option>';
					}
					page += '</select>' +
								'<input type="text" name="name" placeholder="Name" class="col-lg-2 col-md-12 col-sm-12 col-xs-12"/>' +
								'<input type="text" name="description" placeholder="Description" class="col-lg-2 col-md-12 col-sm-12 col-xs-12"/>' +
								'<input type="number" name="quantity" placeholder="Quantity" class="col-lg-2 col-md-12 col-sm-12 col-xs-12"/>' +
								'<select class="col-lg-2 col-md-12 col-sm-12 col-xs-12" name="addUnit">' +
									'<option value="" disabled selected>Unit</option>' +
									'<option value="pieces">pieces</option>' +
									'<option value="cans">cans</option>' +
									'<option value="cans">boxes</option>' +
									'<option value="" disabled>----- Volume -----</option>' +
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
									'<option value="" disabled>----- Weight -----</option>' +
									'<option value="pounds">pounds</option>' +
									'<option value="ounces">ounces</option>' +
									'<option value="milligrams">milligrams</option>' +
									'<option value="grams">grams</option>' +
									'<option value="kilograms">kilograms</option>' +
									'<option value="" disabled>----- Length -----</option>' +
									'<option value="millimeters">millimeters</option>' +
									'<option value="centimeters">centimeters</option>' +
									'<option value="meters">meters</option>' +
									'<option value="inches">inches</option>' +
								'</select>' +
								'<button id="submit-item" onclick="submitItem()" class="col-lg-1 col-md-6 col-sm-6 col-xs-6">Add</button>' +
								'<button id="cancel-item" onclick="cancelItem()" class="col-lg-1 col-md-6 col-sm-6 col-xs-6">Cancel</button>' +
							'</div>' +
						'</div>' +
					'</div>' +
				'</div>' +
				'<div class="divider row">' +
					'<div class="col-lg-8 col-lg-offset-2 col-md-8 col-md-offset-2 col-sm-8 col-sm-offset-2 col-xs-12"></div>' +
				'</div>';
	for(var j = 0; j < categories.length-1; j++)
	{
		var obj = result[categories[j]];
		if( !('items' in obj) )
		{
			continue;
		}
		var itemList = Object.keys(obj['items']);

		page += '<div class="row">' +
					'<div class="col-lg-8 col-lg-offset-2 col-md-8 col-md-offset-2 col-sm-8 col-sm-offset-2 col-xs-12 table-responsive">' +
						'<h3>' + obj.name + '</h3>' +
						'<table class="table">' +
							'<tr>' +
								'<th class="col-1">Delete</th>' +
								'<th class="col-2">Edit</th>' +
								'<th class="col-3">Item</th>' +
								'<th class="col-4">Description</th>' +
								'<th class="col-5">Quantity</th>' +
								'<th class="col-6">Unit</th>' +
							'</tr>';
					
				for(var k = 0; k < itemList.length; k++)
				{
					page += '<tr id="' + categories[j] + '_' + itemList[k] + '_1">' +
								'<td class="grocery-options"><a id="delete-item-1" class="delete-item" href="javascript:deleteItem(\'' + categories[j] + '_' + itemList[k] + '\')">Delete</a></td>' +
								'<td class="grocery-options"><a id="edit-item-1" class="edit-item" href="javascript:editItem(\'' + categories[j] + '_' + itemList[k] + '\')">Edit</a></td>' +
								'<td>' + obj.items[itemList[k]].name + '</td>' +
								'<td>' + obj.items[itemList[k]].description + '</td>' +
								'<td>' + obj.items[itemList[k]].quantity + '</td>' +
								'<td class="grocery-unit">' + obj.items[itemList[k]].unit + '</td>' +
							'</tr>' +
							'<tr id="' + categories[j] + '_' + itemList[k] + '_2" class="editable">' +
								'<td class="grocery-options"><a id="delete-item-1" class="delete-item" href="javascript:cancelEdit(\'' + categories[j] + '_' + itemList[k] + '\')">Cancel</a></td>' +
								'<td class="grocery-options"><a id="edit-item-1" class="edit-item" href="javascript:submitEdit(\'' + categories[j] + '_' + itemList[k] + '\')">Submit</a></td>' +
								'<td><input type="text" name="editName" value="' + obj.items[itemList[k]].name + '"/></td>' +
								'<td><input type="text" name="editDesc" value="' + obj.items[itemList[k]].description + '"/></td>' +
								'<td><input type="number" name="editQuant" value="' + obj.items[itemList[k]].quantity + '"/></td>' +
								'<td><select name="editUnit">' +
									'<option value="" disabled selected>Unit</option>' +
									'<option value="pieces">pieces</option>' +
									'<option value="cans">cans</option>' +
									'<option value="cans">boxes</option>' +
									'<option value="" disabled>----- Volume -----</option>' +
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
									'<option value="" disabled>----- Weight -----</option>' +
									'<option value="pounds">pounds</option>' +
									'<option value="ounces">ounces</option>' +
									'<option value="milligrams">milligrams</option>' +
									'<option value="grams">grams</option>' +
									'<option value="kilograms">kilograms</option>' +
									'<option value="" disabled>----- Length -----</option>' +
									'<option value="millimeters">millimeters</option>' +
									'<option value="centimeters">centimeters</option>' +
									'<option value="meters">meters</option>' +
									'<option value="inches">inches</option>' +
								'</select></td>' +
							'</tr>';
				}
				page += '</table>' +
					'</div>' +
				'</div>';
	}
		page +=	'<div class="divider row">' +
					'<div class="col-lg-8 col-lg-offset-2 col-md-8 col-md-offset-2 col-sm-8 col-sm-offset-2 col-xs-12"></div>' +
				'</div>' +
			'</div>';
		$("#wrapper").html(page);
	}
}
// Deletes the entire grocery list
function deleteList()
{
	removeAllGrocery(deleteListCallback);
}
// Informs the user as the outcome of their delete list attempt.
function deleteListCallback(result)
{
	if(result === false)
	{
		spawnModal("Delete List Failed", "<p>We had trouble deleting your list.<br/><br/>Want to refresh the page<br/>and try again?</p>", "http://www.williamrobertfunk.com/applications/phood-buddy/groceries.html", true);
	}
	else
	{
		spawnModal("Delete List Success", "<p>Your list has been deleted.</p>", "http://www.williamrobertfunk.com/applications/phood-buddy/groceries.html", false);
	}
}
// Toggle add grocery item buttons/links.
function addItem()
{
	$("#add-item").show();
	$("#add-item-link").hide();
}
// Toggle add grocery item buttons/links.
function editItem(id)
{
	var unitValue = $("#" + id + "_1 .grocery-unit").html();
	$("#" + id + "_2 select[name='editUnit']").val(unitValue).change();
	$("#" + id + "_2").show();
	$("#" + id + "_1").hide();
}
// Toggle cancel grocery item buttons/links.
function cancelItem()
{
	$("#add-item").hide();
	$("#add-item-link").show();
	$("select[name='addCat']").prop("selectedIndex", 0);
	$("input[name='name']").val("");
	$("input[name='description']").val("");
	$("input[name='quantity']").val("");
	$("select[name='addUnit']").prop("selectedIndex", 0);
}
// Toggle cancel grocery item edit buttons/links.
function cancelEdit(id)
{
	$("#" + id + "_2").hide();
	$("#" + id + "_1").show();
}
// Submit grocery item to database.
function submitItem(id)
{
	$("#add-item").hide();
	$("#add-item-link").show();
	var category = $("select[name='addCat'] option:selected").val();
	var item = $("input[name='name']").val();
	var description = $("input[name='description']").val();
	var quantity = $("input[name='quantity']").val();
	var unit = $("select[name='addUnit'] option:selected").val();
	if(category == "" || item == "" || description == "" || quantity == "" || unit == "")
	{
		submitItemCallback(false);
	}
	else
	{
		addGrocery(category, item, description, quantity, unit, submitItemCallback);
	}
}
// Messages user with result of the new item, and refreshes page when successful or if user wants.
function submitItemCallback(result)
{
	if(result === false)
	{
		spawnModal("Add Item Failed", "<p>We had trouble adding your item.<br/><br/>Make sure you filled out all fields.<br/><br/>Want to refresh the page<br/>and try again?</p>", "http://www.williamrobertfunk.com/applications/phood-buddy/groceries.html", true);
	}
	else
	{
		spawnModal("Add Item Success", "<p>Your item has been added.</p>", "http://www.williamrobertfunk.com/applications/phood-buddy/groceries.html", false);
	}
}
// Submit grocery item to database.
function submitEdit(id)
{
	$("#" + id + "_2").hide();
	$("#" + id + "_1").show();
	var category = id.substr(0, id.indexOf('_'));
	var itemId = id.substr( id.indexOf('_') + 1 );
	var item = $("#" + id + "_2 :input[name='editName']").val();
	var description = $("#" + id + "_2 input[name='editDesc']").val();
	var quantity = $("#" + id + "_2 input[name='editQuant']").val();
	var unit = $("#" + id + "_2 select[name='editUnit']").val();
	if( (category == "" || item == "" || description == "" || quantity == "" || unit == "") ||
		(category == undefined || item == undefined || description == undefined || quantity == undefined || unit == undefined) )
	{
		submitEditCallback(false);
	}
	else
	{
		editGrocery(itemId, category, item, description, quantity, unit, submitEditCallback);
	}
}
// Messages user with result of the new item, and refreshes page when successful or if user wants.
function submitEditCallback(result)
{
	if(result === false)
	{
		spawnModal("Edit Item Failed", "<p>We had trouble editing your item.<br/><br/>Make sure you filled out all fields.<br/><br/>Want to refresh the page<br/>and try again?</p>", "http://www.williamrobertfunk.com/applications/phood-buddy/groceries.html", true);
	}
	else
	{
		spawnModal("Edit Item Success", "<p>Your item has been edited.</p>", "http://www.williamrobertfunk.com/applications/phood-buddy/groceries.html", false);
	}
}
// Delete grocery item from database.
function deleteItem(id)
{
	var category = id.substr(0, id.indexOf('_'));
	var itemId = id.substr( id.indexOf('_') + 1 );
	deleteGrocery(category, itemId, deleteItemCallback);
}
// Messages user with result of the deleted item, and refreshes page when successful or if user wants.
function deleteItemCallback(result)
{
	if(result === false)
	{
		spawnModal("Delete Item Failed", "<p>We had trouble deleting your item.<br/><br/>Make sure you filled out all fields.<br/><br/>Want to refresh the page<br/>and try again?</p>", "http://www.williamrobertfunk.com/applications/phood-buddy/groceries.html", true);
	}
	else
	{
		spawnModal("Delete Item Success", "<p>Your item has been deleted.</p>", "http://www.williamrobertfunk.com/applications/phood-buddy/groceries.html", false);
	}
}
// Initiates the content for the favorite recipes page.
function initFavList(cat)
{
	if(checkAuth())
	{
		loggedIn();
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
	else { window.location = "http://www.williamrobertfunk.com/applications/phood-buddy/login.html"; }
}
// Populates the weekly schedule with all user's stored favorites.
function popFavListCallback(result, amount)
{
	if(amount) listCount = amount;
	$("#fav-recipes-container").html("");
	for(var i = 0; i < result.info.length; i++)
	{
		var img = (result.info[i].img === "") ? ("images/placeholder-recipe.jpg") : (result.info[i].img + "");
		$("#fav-recipes-container").append(
			'<div class="fav-recipe row">' +
				'<div class="col-lg-2 col-lg-offset-2 col-md-2 col-md-offset-2 col-sm-2 col-sm-offset-2 col-xs-12">' +
					'<a href="recipe.html?' + result.info[i].id + '"><img src=' + img + ' alt="' + result.info[i].name + '"></a>' +
				'</div>' +
				'<div class="col-lg-5 col-lg-offset-1 col-md-5 col-md-offset-1 col-sm-5 col-sm-offset-1 col-xs-12">' +
					'<h3>' + result.info[i].name + '</h3>' +
					'<h4>Taste: <span>' + result.info[i].taste + '</span></h4>' +
					'<p>' + result.info[i].description + '</p>' +
					'<a class="gotoLink" href="recipe.html?' + result.info[i].id + '">Go to recipe</a>' +
					'<a class="removeFavLink" href="javascript:unfavoriteRecipe(' + result.info[i].id + ')">Remove from favorites</a>' +
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
// Removes the recipe from user's list of favorites.
function unfavoriteRecipe(id)
{
	removeFavorite(id, unfavoriteRecipeCallback)
}
// Informs the user if unfavoriting was successful and refreshes.
function unfavoriteRecipeCallback(result)
{
	if(result === false)
	{
		spawnModal("Failed to Unfavorite", "<p>We had trouble removing the recipe from your favorites.<br/><br/>Want to refresh the page<br/>and try again?</p>", "http://www.williamrobertfunk.com/applications/phood-buddy/favorite-recipes.html", true);
	}
	else
	{
		spawnModal("Recipe Removal Success", "<p>Your item has been deleted.</p>", "http://www.williamrobertfunk.com/applications/phood-buddy/favorite-recipes.html", false);
	}
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
	if(checkAuth())
	{
		loggedIn();
		if(window.location['search'])
		{
			var id = window.location['search'].substr(1);
			getRecipe(id, popRecipeCallback);
		}
		else
		{
			getRandomRecipe("", "", popRecipeCallback);
		}
	}
	else
	{
		window.location = "http://www.williamrobertfunk.com/applications/phood-buddy/login.html";
	}
}
// Populates the recipe data either from random pick, or from the id in the URL.
function popRecipeCallback(result)
{
	if(result === false)
	{
		spawnModal("Couldn't find that recipe", "<p>That recipe didn't <i>pan</i> out. Shall we refresh the page?</p>", "http://www.williamrobertfunk.com/applications/phood-buddy/schedule.html", true);
	}
	else
	{
		if(!window.location['search'])
		{
			//window.location.href += "?" + result.id;
			if (history.pushState)
			{
				var newurl = window.location.protocol + "//" + window.location.host + window.location.pathname + "?" + result.id;
				window.history.pushState({ path: newurl }, '', newurl);
			}
		}
		var img = (result.img === "") ? ("images/placeholder-recipe.jpg") : (result.img + "");
		var pTime = (result.prepTime === "") ? ("?") : (result.prepTime + "");
		var cTime = (result.cookTime === "") ? ("?") : (result.cookTime + "");
		var tTime = (result.totalTime === "") ? ("?") : (result.totalTime + "");
		var str='<div id="recipe">' +
		            '<div class="row">' +
		                '<div class="col-lg-8 col-lg-offset-2 col-md-8 col-md-offset-2 col-sm-8 col-sm-offset-2 col-xs-12">' +
		                    '<div class="row">' +
		                        '<div class="col-lg-6 col-md-6 col-sm-8 col-xs-12">' +
		                            '<h2>' + result.name + '</h2>' +
		                        '</div>' +
		                        '<div class="text-center col-lg-6 col-md-6 col-sm-4 col-xs-12">' +
		                            '<p id="rating">Rate this recipe: <span>1</span> <span>2</span> <span>3</span> <span>4</span> <span>5</span></p>' +
		                        '</div>' +
		                    '</div>' +
		                '</div>' +
		            '</div>' +
		            '<div class="divider row">' +
		                '<div class="col-lg-8 col-lg-offset-2 col-md-8 col-md-offset-2 col-sm-8 col-sm-offset-2 col-xs-12"></div>' +
		            '</div>' +
		            '<div class="row">' +
		                '<div class="col-lg-8 col-lg-offset-2 col-md-8 col-md-offset-2 col-sm-8 col-sm-offset-2 col-xs-12">' +
		                    '<div class="row">' +
		                        '<div class="col-lg-3 col-md-3 col-sm-12 col-xs-12">' +
		                            '<img src="' + img + '"/>' +
		                        '</div>' +
		                        '<div class="timing col-lg-3 col-md-3 col-sm-4 col-xs-12">' +
		                            '<h4>Prep Time</h4>' +
		                            '<p><span>' + pTime + '</span></p>' +
		                            '<p>min</p>' +
		                        '</div>' +
		                        '<div class="timing col-lg-3 col-md-3 col-sm-4 col-xs-12">' +
		                            '<h4>Cook Time</h4>' +
		                            '<p><span>' + cTime + '</span></p>' +
		                            '<p>min</p>' +
		                        '</div>' +
		                        '<div class="timing col-lg-3 col-md-3 col-sm-4 col-xs-12">' +
		                            '<h4>Total Time</h4>' +
		                            '<p><span>' + tTime + '</span></p>' +
		                            '<p>min</p>' +
		                        '</div>' +
		                    '</div>' +
		                '</div>' +
		            '</div>' +
		            '<div class="divider row">' +
		                '<div class="col-lg-8 col-lg-offset-2 col-md-8 col-md-offset-2 col-sm-8 col-sm-offset-2 col-xs-12"></div>' +
		            '</div>' +
		            '<div class="row">' +
		                '<div class="col-lg-8 col-lg-offset-2 col-md-8 col-md-offset-2 col-sm-8 col-sm-offset-2 col-xs-12">' +
		                    '<div class="row">' +
		                        '<a id="print-recipe" class="col-lg-4 col-md-4 col-sm-4 col-xs-12" href="javascript:window.print()">Print Recipe</a>' +
		                        '<a id="grocery-redirect" class="col-lg-4 col-md-4 col-sm-4 col-xs-12" href="groceries.html">Add Groceries</a>' +
		                        '<a id="fav-list-redirect" class="col-lg-4 col-md-4 col-sm-4 col-xs-12" href="favorite-recipes.html">Favorite Recipe</a>' +
		                    '</div>' +
		                '</div>' +
		            '</div>' +
		            '<div class="divider row">' +
		                '<div class="col-lg-8 col-lg-offset-2 col-md-8 col-md-offset-2 col-sm-8 col-sm-offset-2 col-xs-12"></div>' +
		            '</div>' +
		            '<div class="row">' +
		                '<div class="col-lg-8 col-lg-offset-2 col-md-8 col-md-offset-2 col-sm-8 col-sm-offset-2 col-xs-12">' +
		                    '<div class="row">' +
		                        '<div id="left-column" class="col-lg-5 col-md-5 col-sm-5 col-xs-12">' +
		                            '<h3>Ingredients</h3>' + 
		                            	'<ul>';
		var ingredients = result.ingredientList;
		for(var i = 0; i < ingredients.length; i++)
		{
			str += '<li>' +
						'<span class="ingredient-name">' + ingredients[i].name + '</span>' +
						'<span class="ingredient-desc">' + ingredients[i].description + '</span>' +
						'<span class="ingredient-quant">' + ingredients[i].quantity + '</span>' +
						'<span class="ingredient-unit">' + ingredients[i].unit + '</span>' +
					'</li>';
		}
		str += '</ul>' +
			'</div>' +
			'<div id="right-column" class="col-lg-6 col-lg-offset-1 col-md-6 col-md-offset-1 col-sm-6 col-sm-offset-1 col-xs-12">' +
			'<h3>Directions</h3>' +
			'<ul>';
		var directions = result.directions;
		for(var j = 0; j < directions.length; j++)
		{
			str += '<li>' + directions[j] + '</li>';
		}
		str += '</ul>' +
	                        '</div>' +
	                    '</div>' +
	                '</div>' +
	            '</div>' +
	            '<div class="divider row">' +
	                '<div class="col-lg-8 col-lg-offset-2 col-md-8 col-md-offset-2 col-sm-8 col-sm-offset-2 col-xs-12"></div>' +
	            '</div>' +
	        '</div>';
		$("#wrapper").html(str);
	}
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
// Called when user is verified as logged in. Makes the login option, logout.
function loggedIn()
{
	$("#login-link").css("display", "none");
	$("#logout-link").css("display", "block");
}