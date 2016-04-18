<?php



/*
$json_formatted_recipe = {"author":"","cook-time":"","custom":"false","description":"Spicy black eye bean burgers with yogurt mint dressing.","directions":['"Fry the onions, garlic, red chili (flakes or chopped chili) and cumin seeds in oil until the onion softens, Remove from heat.","Drain the beans and mash in a blender, or by hand. Add the egg, breadcrumbs, chili powder and the onion mix, and mix well and season.","Shape into 4 small burgers. Ideally leave in the fridge for 30 minutes.","When ready to serve, fry off burgers in pan of oil on both sides until brown."'],"img":"","ingredients":['{"description":"1 medium onion, finely chopped","name":"Onions","quantity":"1.000","unit":"medium (2-1\/2\" dia)"},{"description":"2 cloves garlic, finely chopped","name":"Garlic","quantity":"2.000","unit":"cloves"},{"description":"1 chili, finely chopped","name":"Red Hot Chili Peppers","quantity":"1.000","unit":"pepper"},{"description":"1 tsp cumin seeds","name":"Cumin","quantity":"1.000","unit":"tsp"},{"description":"1 cup black eye beans, drained (1 can)","name":"Cowpeas (Blackeyes, Crowder, Southern) (Mature Seeds, Canned)","quantity":"1.000","unit":"cup"},{"description":"1 medium egg","name":"Egg (Whole)","quantity":"1.000","unit":"medium"},{"description":"50 g bread crumbs","name":"Bread Crumbs","quantity":"50.000","unit":"g"},{"description":"1 tsp chili powder","name":"Chili Powder","quantity":"1.000","unit":"tsp"},{"description":"1 dash salt","name":"Salt","quantity":"1.000","unit":"dash"},{"description":"1 dash pepper","name":"Black Pepper","quantity":"1.000","unit":"dash"},{"description":"1 container yogurt, low fat","name":"Plain Yogurt (Lowfat)","quantity":"1.000","unit":"container (4 oz)"}'],"meal-time":"","name":"Spicy Bean Burgers","prep-time":"","taste":"","total-time":"","nutrition":{"calcium":"64","calories":"340","carbohydrate":"52.33","cholesterol":"100","fat":"6.54","fiber":"6.8","iron":"46","monounsaturated_fat":"1.844","polyunsaturated_fat":"1.380","potassium":"762","protein":"19.23","saturated_fat":"2.370","serving_size":"1 serving","sodium":"748","sugar":"13.38","trans_fat":"0","vitamin_a":"33","vitamin_c":"141"}};
*/

$json_formatted_recipe['author']=""; 
$json_formatted_recipe['cook-time'] =30;
$json_formatted_recipe['custom'] ="false";
$json_formatted_recipe['description'] ="Whole wheat pasta with lima beans, peas, canned Japanese mushrooms, garlic and parmesan";
$json_formatted_recipe['directions'][0] ="Boil whole wheat linguini";
$json_formatted_recipe['directions'][1] ="When pasta is almost ready, toss in frozen peas and lima beans.";
$json_formatted_recipe['directions'][2] ="When pasta is al dente and peas and limas are warmed, strain.";
$json_formatted_recipe['directions'][3] ="Return to pan. Sprinkle with nonfat mozzarella and mushrooms.";
$json_formatted_recipe['directions'][4] ="Put heat on low until mozzarella is melted. Optional to add rosemary, basil, or any other spices you enjoy.";
$json_formatted_recipe['directions'][5] ="Place on plate. Sprinkle with parmesan and garlic powder to taste.";
$json_formatted_recipe['img'] ="http://m.ftscrt.com/static/recipe/206985da-58f7-4823-965e-50d92b669877.jpg";
$json_formatted_recipe['ingredientList'][0]['description'] ="2 oz whole wheat linguini";
$json_formatted_recipe['ingredientList'][0]['name'] ="Healthy Harvest Whole Wheat Rotini Pasta";
$json_formatted_recipe['ingredientList'][0]['quantity'] ="1.000";
$json_formatted_recipe['ingredientList'][0]['unit'] ="serving";
$json_formatted_recipe['ingredientList'][1]['description'] ="1 tbsp grated parmesan cheese";
$json_formatted_recipe['ingredientList'][1]['name'] ="100% Grated Parmesan Cheese";
$json_formatted_recipe['ingredientList'][1]['quantity'] ="1.000";
$json_formatted_recipe['ingredientList'][1]['unit'] ="serving";
$json_formatted_recipe['ingredientList'][2]['description'] ="0.12 cup pieces shiitake mushrooms habanero";
$json_formatted_recipe['ingredientList'][2]['name'] ="Mushrooms";
$json_formatted_recipe['ingredientList'][2]['quantity'] ="0.120";
$json_formatted_recipe['ingredientList'][2]['unit'] ="cup pieces";
$json_formatted_recipe['ingredientList'][3]['description'] ="1 oz peas";
$json_formatted_recipe['ingredientList'][3]['name'] ="Green Peas";
$json_formatted_recipe['ingredientList'][3]['quantity'] ="1.000";
$json_formatted_recipe['ingredientList'][3]['unit'] ="oz";
$json_formatted_recipe['ingredientList'][4]['description'] ="5 grams nonfat mozzarella cheese lemon";
$json_formatted_recipe['ingredientList'][4]['name'] ="Mozzarella Cheese (Nonfat)";
$json_formatted_recipe['ingredientList'][4]['quantity'] ="5.000";
$json_formatted_recipe['ingredientList'][4]['unit'] ="g";
$json_formatted_recipe['ingredientList'][5]['description'] ="1/4 tsp garlic powder Honey Vinegar lemon";
$json_formatted_recipe['ingredientList'][5]['name'] ="Garlic Powder";
$json_formatted_recipe['ingredientList'][5]['quantity'] = "0.250";
$json_formatted_recipe['ingredientList'][5]['unit'] ="tsp";
$json_formatted_recipe['meal-time'] ="Lunch";
$json_formatted_recipe['name'] ="Pasta with Peas and Lima Beans Green Beans with Mushrooms sour";
$json_formatted_recipe['prep-time'] ="10";
$json_formatted_recipe['taste'] ="";
$json_formatted_recipe['total-time'] ="40";
$json_formatted_recipe['nutrition']['calcium'] =6;
$json_formatted_recipe['nutrition']['calories'] =253;
$json_formatted_recipe['nutrition']['carbohydrate'] =50.63;
$json_formatted_recipe['nutrition']['cholesterol'] =6;
$json_formatted_recipe['nutrition']['fat'] =2.71;
$json_formatted_recipe['nutrition']['fiber'] =8.6;
$json_formatted_recipe['nutrition']['iron'] =4;
$json_formatted_recipe['nutrition']['monounsaturated_fat'] =0.014;
$json_formatted_recipe['nutrition']['polyunsaturated_fat'] =0.100;
$json_formatted_recipe['nutrition']['potassium'] =173;
$json_formatted_recipe['nutrition']['protein'] =12.58;
$json_formatted_recipe['nutrition']['saturated_fat'] =1.039;
$json_formatted_recipe['nutrition']['serving_size'] ="1 serving";
$json_formatted_recipe['nutrition']['sodium'] =130;
$json_formatted_recipe['nutrition']['sugar'] =2.99;
$json_formatted_recipe['nutrition']['trans_fat'] =0;
$json_formatted_recipe['nutrition']['vitamin_a'] =5;
$json_formatted_recipe['nutrition']['vitamin_c'] =21;


//echo"<br/>Formatted<br/>";
//
//print_r($formatted_recipe);

$taste = determine_taste($json_formatted_recipe);
echo("<br/>taste: $taste");

function determine_taste($formatted_recipe)
{
    $salty_arr = array ("salt", "garlic powder", "feta cheese", "gorgonzola", "anchovy", "parmesan", "soy sauce", "seaweed", "miso", "pickles", "bacon", "Prosciutto");

    $sweet_arr = array("sugar", "maple syrup", "honey", "jam", "raisin", "apricot", "date", "molasses", "apple cider vinegar", "ketchup", "BBQ sauce", "carrots",  "sweet  potatoes", "corn", "beets", "butternut", "squash", "peas", "fennel", "parsnips", "caramel", "milk chocolate", "apple", "pears");

    $sour_arr = array ("lemon", "lime", "orange", "vinegar", "tomato paste", "pickled", "yogurt", "sour cream", "kiwi", "pineapple");

    $bitter_arr = array ("dandelion", "endives", "kale", "okra", "bitter melon", "radicchio", "grapefruit", "beer", "cocoa", "coffee");

    $spicy_arr = array ("hot sauce", "black pepper", "wasabi", "horse radish", "dijon mustard", "jalapeno", "habanero", "raw radish", "raw garlic", "sriracha", "tapatio", "wing sauce");
    
    
    $taste_counter['salty']=0;
    $taste_counter['bitter']=0;
    $taste_counter['sweet']=0;
    $taste_counter['sour']=0;
    $taste_counter['spicy']=0;
    
    for ($i=0; $i<count($formatted_recipe['ingredientList']); $i++)
    {
        foreach ($salty_arr as $salty_ingr)
        {
            if (stripos($formatted_recipe['ingredientList'][$i]['description'], $salty_ingr)!== false)
            {
                $taste_counter['salty']++;
                echo "<br/>salty: $salty_ingr ". $taste_counter['salty']."<br/>";
            }
                
        }
        foreach ($sweet_arr as $sweet_ingr)
        {
            if (stripos($formatted_recipe['ingredientList'][$i]['description'], $sweet_ingr)!== false)
            {
                $taste_counter['sweet']++;
                echo "<br/>sweet: $sweet_ingr" . $taste_counter['sweet']."<br/>";
            }
                
        }
        foreach ($bitter_arr as $bitter_ingr)
        {
            if (stripos($formatted_recipe['ingredientList'][$i]['description'], $bitter_ingr)!== false)
            {
                $taste_counter['bitter']++;
                echo "<br/>bitter: $bitter_ingr " . $taste_counter['bitter']."<br/>";
            }
                
        }
        foreach ($sour_arr as $sour_ingr)
        {
            if (stripos($formatted_recipe['ingredientList'][$i]['description'], $sour_ingr)!== false)
            {
                $taste_counter['sour']++;
                echo "<br/>sour: $sour_ingr " . $taste_counter['sour']."<br/>";
            }
                
        }
        foreach ($spicy_arr as $spicy_ingr)
        {
            if (stripos($formatted_recipe['ingredientList'][$i]['description'], $spicy_ingr)!== false)
            {
                $taste_counter['spicy']=$taste_counter['spicy']+2;
                echo "<br/>spicy: $spicy_ingr  " . $taste_counter['spicy']."<br/>";
            }
                
        }
    }
    
    
   
    if (stripos($formatted_recipe['name'], "salty")!== false)
    {
        $taste_counter['salty']++;
        echo "<br/>salty: $salty_counter" .$taste_counter['salty']."r<br/>";
    }


    if (stripos($formatted_recipe['name'], "sweet")!== false)
    {
        $taste_counter['sweet']++;
        echo "<br/>sweet: counter ".$taste_counter['sweet']."<br/>";
    }


    if (stripos($formatted_recipe['name'], "bitter")!== false)
    {
        $bitter_counter++;
        echo "<br/>bitter: counter $bitter_counter<br/>";
    }


    if (stripos($formatted_recipe['name'], "sour")!== false)
    {
        $taste_counter['sour']++;
        echo "<br/>sour: counter ". $taste_counter['sour']."<br/>";
    }


    if (stripos($formatted_recipe['name'], "spicy")!== false)
    {
        $taste_counter['spicy']= $taste_counter['spicy']+2;
        echo "<br/>spicy: counter" . $taste_counter['spicy']. "<br/>";
    }

    $taste_number = max ($taste_counter);   
    echo "<br/>taste_number: $taste_number";
    $taste = array_search($taste_number, $taste_counter);
    
    echo"<pre>";
    print_r($taste_counter);
    echo "<br/>taste: $taste";
    
    return $taste;
}




?>