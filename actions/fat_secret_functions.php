<?php
require_once('/php_config.php');

function pick_vegetable()
{
    $ingredient_array = array("Rice", "Bell Peppers",
                            "Black Eyed Peas", "Cabbage", "Carrots", "Celery",
                            "Cherry Tomatoes", "Chinese Eggplant", "Leek" ,"Lettuce",
                            "Olives", "Onions", "Pearl Onions",
                            "Potato", "Snow Peas", "Wasabi",
                            "Artichoke", "Collard Greens", "Kale",
                            "Corn", "Fava Beans", "Fennel", "Green Beans", "Mustard Greens", "Pea Pods",
                            "Peas", "Red Leaf Lettuce", "Snow Peas", "Spinach",
                            "Vidalia Onions", "spaghetti", "eggplant",
                            "Lettuce", "Cauliflower", "Squash", "Chinese Long Beans",
                            "Garlic", "Ginger", "Pumpkin", "Sweet Potatoes",
                            "Beet root", "Bell pepper", "Sprouts","Collard Greens", "Delicata Squash",
                            "Kale", "Leeks", "Beets", "Bell Peppers",
                            "Cucumbers", "Eggplant", "Green Beans", "Edamame", "Jalapeno Peppers", "Lima Beans",
                            "Okra", "Shallots", "Sugar Snap Peas", "Summer Squash", "Tomatillo",
                            "Tomatoes", "Winged Beans", "Yukon Gold Potatoes", "Zucchini", "Shitaki mushroom",
                            "Portabella mushroom", "mushroom", "cilantro", "bell pepper");
        
    $index = rand (0, count($ingredient_array)-1);
    return $ingredient_array[$index];
                            
}

function pick_dessert()
{
    $ingredient_array = array("chocolate", "Banana", "vanilla",
                            "hazelnut", "caramel", "icecream",
                            "honey", "apricot", "cheesecake",
                            "cake", "cookie");
        
    $index = rand (0, count($ingredient_array)-1);
    return $ingredient_array[$index];
                            
}

function pick_recipe($recipe_array)
{
    $arr_size = count($recipe_array['recipes']['recipe']);
    $index = rand (0, $arr_size-1);
//    for (int $i=0; i<$arr_size; $i++)
//    {
//        
//    }
    return $recipe_array['recipes']['recipe'][$index];    
}

function pick_recipe_id($recipe_array)
{
    $arr_size = count($recipe_array['recipes']['recipe']);
    $index = rand (0, $arr_size-1);
    return $recipe_array['recipes']['recipe'][$index]['recipe_id'];
}

function get_recipes_descr_url($ingredient)
{
   
    //Signature Base String
    //<HTTP Method>&<Request URL>&<Normalized Parameters>
    $base = rawurlencode("GET")."&";
    $base .= "http%3A%2F%2Fplatform.fatsecret.com%2Frest%2Fserver.api&";

    //sort params by abc....necessary to build a correct unique signature
    $params = "format=json&";
    $params .= "method=recipes.search&";
    $params .= "oauth_consumer_key=";
    $params .= FS_CONSUMER_KEY;
    $params .= "oauth_nonce=123&";
    $params .= "oauth_signature_method=HMAC-SHA1&";
    $params .= "oauth_timestamp=".time()."&";
    $params .= "oauth_version=1.0&";
    $params .= "search_expression=".rawurlencode($ingredient);
//    $params .= "&max_results=40";
    
    $params2 = rawurlencode($params);
    $base .= $params2;

    //encrypt it
    $sig= base64_encode(hash_hmac('sha1', $base, FS_CONSUMER_SECRET, true)); 
    
    //now get the search results and write them down
    $url = "http://platform.fatsecret.com/rest/server.api?".$params."&oauth_signature=".rawurlencode($sig);
    return $url;
}

function get_recipe_by_id_url($id)
{
    //Signature Base String
    //<HTTP Method>&<Request URL>&<Normalized Parameters>
    $base = rawurlencode("GET")."&";
    $base .= "http%3A%2F%2Fplatform.fatsecret.com%2Frest%2Fserver.api&";

    //sort params by abc....necessary to build a correct unique signature
    $params = "format=json&";
    $params .= "method=recipe.get&";

    $params .= "oauth_consumer_key=";
    $params .= FS_CONSUMER_KEY; // ur consumer key
    $params .= "oauth_nonce=123&";
    $params .= "oauth_signature_method=HMAC-SHA1&";
    $params .= "oauth_timestamp=".time()."&";
    $params .= "oauth_version=1.0&";

    $params .= "recipe_id=".rawurlencode($id);
    $params2 = rawurlencode($params);
    $base .= $params2;

    //encrypt it
    $sig= base64_encode(hash_hmac('sha1', $base, FS_CONSUMER_SECRET, true)); 
    
    //now get the search results and write them down
    $url = "http://platform.fatsecret.com/rest/server.api?".$params."&oauth_signature=".rawurlencode($sig);
    
    return $url;
}

?>