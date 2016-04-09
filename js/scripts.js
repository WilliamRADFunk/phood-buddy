$(document).ready(function ()
{
	// Controls how long between carousel transitions.
	$('.carousel').carousel({
	    interval: 2000
	});
	// Specifies content and functionality of modal when
	// user clicks specific links/buttons.
    $("#lost-password").click(function(){
    	$("#modal").modal({backdrop: "static", keyboard: false, show: true});
		$(".modal-header").html("Reset Password");
		$(".modal-body").html("<form><label>Registered Email: </label><input type='text' /></form>");
		$("#btn-confirm").click(function(){
			/* TODO: Send reset password email */
		});
    });
});
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