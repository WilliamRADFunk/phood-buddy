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