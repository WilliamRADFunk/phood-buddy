$(document).ready(function ()
{
	$('.carousel').carousel({
	    interval: false
	});
	$("#printList").click(function(){
		$(".modal-header").html("Print Grocery List");
		$(".modal-body").html("<p>Are you sure you want to print your grocery list?</p>");
        $("#modal").modal({backdrop: "static"});
    });
});
$(window).resize(function()
{
	
});
function lostPassword()
{
	console.log("User clicked 'Forgot Password' link.");
}