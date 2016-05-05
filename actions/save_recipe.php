<?php
require '/libs/firebase-php-master/src/firebaseLib.php';
//require_once('/firebase_functions.php');
//get random recipe
require_once('/fat_secret_functions.php');
require_once('/determine_recipe_taste.php');
$mealTime = array ("Breakfast", "Lunch", "Dinner", "Supper");
for ($j=0; $j<1000; $j++)
{
    sleep(1);
    $formatted_recipe=null;
    $meal_time_found = false;
    $ingredient = pick_vegetable();
    print("<br>veggie: ");
    echo $ingredient . "<br>";
    $recipe_descr_url = get_recipes_descr_url($ingredient);
    $food_feed = file_get_contents($recipe_descr_url);
    $recipes_array = json_decode($food_feed, true);
    echo "<br>size: " . count($recipes_array['recipes']['recipe']) . "<br>";
    //    echo '<pre>'; 
    //    print_r($recipes_array);
    $selected_recipe_id = pick_recipe_id($recipes_array);
    echo "<br> Returned recipe:<br>";
    echo '<pre>';
    print_r($selected_recipe_id);
    echo "<br><br><br>Recipe:";
    $recipe_url = get_recipe_by_id_url($selected_recipe_id);
    $food_feed = file_get_contents($recipe_url);
    $recipe = json_decode($food_feed, true);
    //echo '<pre>';
    //print_r($recipe);

    $formatted_recipe['author']="";
    if (isset($recipe['recipe']['cooking_time_min']))
        $formatted_recipe['cookTime']=$recipe['recipe']['cooking_time_min'];
    else
        $formatted_recipe['cookTime']="";

    $formatted_recipe['custom']=false;

    if (isset($recipe['recipe']['recipe_description']))
        $formatted_recipe['description']=$recipe['recipe']['recipe_description'];
    else
        $formatted_recipe['description']="";
    if (isset($recipe['recipe']['directions']['direction'][0]))
    {
        for ($i=0; $i<count($recipe['recipe']['directions']['direction']); $i++)
        {
            $formatted_recipe['directions'][$i]=$recipe['recipe']['directions']['direction'][$i]['direction_description'];
        }
    }
    else
        $formatted_recipe['directions'][$i]=$recipe['recipe']['directions']['direction']['direction_description'];


    //$formatted_recipe['img']=$recipe['recipe']['recipe_url'];
    if (isset($recipe['recipe']['recipe_images']['recipe_image']))
        $formatted_recipe['img']=$recipe['recipe']['recipe_images']['recipe_image'];
    else
        $formatted_recipe['img']="";

    //format igredient list
    for ($i=0; $i<count($recipe['recipe']['ingredients']['ingredient']); $i++)
    {
        $formatted_recipe['ingredientList'][$i]['description']=$recipe['recipe']['ingredients']['ingredient'][$i]['ingredient_description'];
        $formatted_recipe['ingredientList'][$i]['name']=$recipe['recipe']['ingredients']['ingredient'][$i]['food_name'];
        $formatted_recipe['ingredientList'][$i]['quantity']=$recipe['recipe']['ingredients']['ingredient'][$i]['number_of_units'];
        $formatted_recipe['ingredientList'][$i]['unit']=$recipe['recipe']['ingredients']['ingredient'][$i]['measurement_description'];
    }

    //determine meal time (breakfast, lunch, ..)
    if (isset($recipe['recipe']['recipe_types']))
    {
        if (is_array($recipe['recipe']['recipe_types']['recipe_type']))
        {
            foreach ($recipe['recipe']['recipe_types']['recipe_type'] as $recipe_type)
                if (!$meal_time_found)
                {
                    foreach ($mealTime as $meal_time)
                    {
                        if (!$meal_time_found)
                        {
                            if (stripos($recipe_type, $meal_time)!== false)
                            {
                                $formatted_recipe['mealTime']=$meal_time;
                                echo "<br/> meal_time: " . $meal_time;
                                $meal_time_found = true;
                                break;
                            } 
                        }

                    }   
                }                
        }        
    }
    if (!$meal_time_found)
        $formatted_recipe['mealTime']="";

    $formatted_recipe['name']=$recipe['recipe']['recipe_name'];

    if (isset($recipe['recipe']['preparation_time_min']))
        $formatted_recipe['prepTime']=$recipe['recipe']['preparation_time_min'];
    else
        $formatted_recipe['prepTime']="";
    $formatted_recipe['taste']="";

    //determine "total-time"
    if (isset($formatted_recipe['prepTime']) && isset($formatted_recipe['cookTime']) && ($formatted_recipe['prepTime']!=="")&& ($formatted_recipe['cookTime']!==""))
        $formatted_recipe['totalTime']= $formatted_recipe['prepTime'] + $formatted_recipe['cookTime'];
    else 
        if (isset($formatted_recipe['prepTime']) && !isset($formatted_recipe['cookTime']))
            $formatted_recipe['totalTime']= $formatted_recipe['prepTime'];
    else
        if (!isset($formatted_recipe['prepTime']) && isset($formatted_recipe['cookTime']))
            $formatted_recipe['totalTime']=$formatted_recipe['cookTime'];
    else
        $formatted_recipe['totalTime']=  "";  

    //$var_is_greater_than_two = ($var > 2 ? true : false);
    //$message = 'Hello '.($user->get('first_name') ?: 'Guest');
    $formatted_recipe['nutrition']=$recipe['recipe']['serving_sizes']['serving'];

    echo '<br>Formatted recipe<pre>';
    print_r($formatted_recipe);
    echo"<br/><br/>";
    $taste = determine_taste($formatted_recipe);
    $formatted_recipe['taste'] = $taste;
    echo $taste;

    //save recipe to firebase
    if(!isset($recipe['error']))
    {
        $token = FB_TOKEN;
        $url = 'https://phoodbuddy.firebaseio.com';
        $firebase = new  \Firebase\FirebaseLib($url, $token);
        $firebase->update("/recipe-directory/{$selected_recipe_id}", $formatted_recipe);
    }
}




?>