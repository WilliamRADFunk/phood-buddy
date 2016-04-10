$(document).ready(function ()
{
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
		var email = $("login-email").val() + "";
		var pwd = $("login-password").val() + "";
		if( (email === null || email === undefined) || (pwd === null || pwd === undefined) )
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
	// System tries to login with values provided in the two text fields.
	$("#btn-register").click(function(){
		var email = $("register-email").val() + "";
		var pwd = $("register-password").val() + "";
		var fname = $("register-fname").val() + "";
		var lname = $("register-lname").val() + "";
		if( (fname === null || fname === undefined) || (lname === null || lname === undefined) ||
			(email === null || email === undefined) || (pwd === null || pwd === undefined) )
		{
			$("#modal").modal({backdrop: "static", keyboard: false, show: true});
			$(".modal-header").html("Registration Failed");
			$(".modal-body").html("<p>All four fields need to be filled out correctly.</p>");
			$("#btn-cancel").css("display", "none");
			$("#btn-confirm").click(function(){
				$("#btn-cancel").css("display", "block");
			});
		}
		else
		{
			$(".modal-body").html("<p>Manual registration failed. Try a different email?</p>");
			customRegister( $("register-fname").val() + "",
							$("register-lname").val() + "",
							$("register-email").val() + "",
							$("register-password").val() + "",
							registerCallback);
		}
	});
	// Controls how long between carousel transitions.
	$('.carousel').carousel({
	    interval: 2000
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
			$("#btn-cancel").css("display", "block");
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