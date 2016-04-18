<?php
    require '/libs/firebase-php-master/src/firebaseLib.php';
    
    function get_dominant_taste($taste_array)
    {
        $max = 0;
        $taste="";
        foreach ($taste_array as $element)
            if ($max < $element)
            {
                $max = $element;
//                $taste = key($taste_array);
                $taste = current(array_keys($taste_array));
            }
        return array_search($max, $taste_array);
    }

    function get_allergy_info($uID)
    {
        $token = 'Bu23qo0TN9kGK0yl6UjsvNK9Ao3YzduX8M480ucR';
        $url = 'https://phoodbuddy.firebaseio.com';
        $firebase = new  \Firebase\FirebaseLib($url, $token);
        $data = $firebase->get("/users/{$uID}/allergies");
        return $data;
    }

    function get_taste_profile($uID)
    {
        $token = 'Bu23qo0TN9kGK0yl6UjsvNK9Ao3YzduX8M480ucR';
        $url = 'https://phoodbuddy.firebaseio.com';
        $firebase = new  \Firebase\FirebaseLib($url, $token);
        $data = $firebase->get('/users/facebook:1119368504753440/taste');
        $taste_array = json_decode($data, true);
        echo '<pre>'; 
        print_r($taste_array);
        $tase = get_dominant_taste($taste_array);
        echo "<br>".$tase."<br>";
    }
    
    function store_recipe_firebase()
    {
        
    }


?>