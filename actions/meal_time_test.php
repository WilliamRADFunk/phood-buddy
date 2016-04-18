<?php
$mealTime = array ("Breakfast", "Lunch", "Dinner", "Supper");
$meal_time_found = false;
$recipe['recipe']['recipe_types']['recipe_type'][0]="Soup";
$recipe['recipe']['recipe_types']['recipe_type'][2]="Main dish";
$recipe['recipe']['recipe_types']['recipe_type'][3]="Lunch";
if (isset($recipe['recipe']['recipe_types']))
{
    if (is_array($recipe['recipe']['recipe_types']['recipe_type']))
    {
        foreach ($recipe['recipe']['recipe_types']['recipe_type'] as $recipe_type)
            if (!$meal_time_found)
            {
                foreach ($mealTime as $meal_time)
                {
                    echo "<br/>Comparing $meal_time and $recipe_type <br/>";
                    if (!$meal_time_found)
                    {
                        echo "stripos: " . stripos($recipe_type, $meal_time);
                        if (stripos($recipe_type, $meal_time)!== false)
                        {
                            $formatted_recipe['meal-time']=$meal_time;
                            echo "<br/> meal_time: " . $meal_time;
                            $meal_time_found = true;
                            break;
                        } 
                    }
                        
                }   
            }                
    }        
}
?>