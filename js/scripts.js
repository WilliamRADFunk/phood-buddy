$(document).ready(function ()
{
	// Controls how long between carousel transitions.
	$('.carousel').carousel({
	    interval: 2000
	});
	// Specifies content and functionality of modal when
	// user clicks specific links/buttons.
	$("#print-list").click(function(){
		$("#modal").modal({backdrop: "static", keyboard: false, show: true});
		$(".modal-header").html("Print Grocery List");
		$(".modal-body").html("<p>Are you sure you want to print your grocery list?</p>");
    });
    $("#lost-password").click(function(){
    	$("#modal").modal({backdrop: "static", keyboard: false, show: true});
		$(".modal-header").html("Reset Password");
		$(".modal-body").html("<form><label>Registered Email: </label><input type='text' /></form>");
    });
});
$(window).resize(function()
{
	
});
function lostPassword()
{
	console.log("User clicked 'Forgot Password' link.");
}