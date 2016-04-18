<?php

    require_once('/fat_secret_functions.php');
    $ingridient = pick_vegetable();
    print("<br>veggie: ");
    echo $ingridient . "<br>";
    $recipe_descr_url = get_recipes_descr_url($ingridient);
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
    echo '<pre>';
    print_r($recipe);


?>