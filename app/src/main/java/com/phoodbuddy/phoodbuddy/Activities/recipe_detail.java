package com.phoodbuddy.phoodbuddy.Activities;

import android.content.Context;
import android.os.AsyncTask;
import android.os.Bundle;
import android.support.v7.app.AppCompatActivity;
import android.util.Log;
import android.widget.ListView;
import android.widget.Toast;

import com.phoodbuddy.phoodbuddy.Controllers.RecipeDetailController;
import com.phoodbuddy.phoodbuddy.Models.Recipe;
import com.phoodbuddy.phoodbuddy.Models.RecipeDetail;
import com.phoodbuddy.phoodbuddy.R;
import com.phoodbuddy.phoodbuddy.Service.FatSecretGet;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import java.nio.Buffer;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;

/**
 * Created by Evan Glazer on 4/8/2016.
 */
public class recipe_detail extends AppCompatActivity {

    private Context mContext;
    List<RecipeDetail> recipeList = new ArrayList<>();
    ListView listView;
    RecipeDetailController adapter;
    String foodName;
    HashMap<String, String> dir;
    private FatSecretGet mFatSecretGet = new FatSecretGet();
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.recipe_detail);
/*
        Bundle i = getIntent().getExtras();
        Long id = i.getLong("id");
        foodName = i.getString("foodName");
        Log.d("ID", id +"");
*/
        foodName = "Broiled Parmesan Tilapia";
        getFood(91);

    }

    /**
     * FatSecret get
     */

    private void getFood(final long id) {
        new AsyncTask<String, String, String>() {
            @Override
            protected String doInBackground(String... arg0) {
                recipeList = new ArrayList<RecipeDetail>();
                JSONObject foodGet = mFatSecretGet.getFood(id);
                StringBuffer buffer = new StringBuffer();
                buffer.append(foodGet);
                Log.e("Buffer", buffer.toString());
                try {

                    if (foodGet != null) {
                        StringBuffer buff = new StringBuffer();
                        buff.append(foodGet.getString("cooking_time_min") + "\n");
                        buff.append(foodGet.getString("number_of_servings") + "\n");
                        buff.append(foodGet.getString("rating") + "\n");
                        buff.append(foodGet.getString("preparation_time_min") + "\n");
                        Log.e("", buff.toString());

                        JSONObject recipe = new JSONObject(buffer.toString());

                        JSONObject directions = recipe.getJSONObject("directions");
                        JSONArray direction = directions.getJSONArray("direction");
                        // looping through All Contacts
                        for (int i = 0; i < direction.length(); i++) {
                            JSONObject c = direction.getJSONObject(i);

                            String direction_description = c.getString("direction_description");
                            String step  =c.getString("direction_number");
                            Log.e("Step"+i, direction_description + step);
                            // tmp hashmap for single dir
                            dir = new HashMap<String, String>();
                            dir.put(step, direction_description);
                        }

                        JSONObject ingredients = recipe.getJSONObject("ingredients");
                        JSONArray ingredient = ingredients.getJSONArray("ingredient");
                        // looping through All Contacts
                        for (int i = 0; i < direction.length(); i++) {
                            JSONObject c = ingredient.getJSONObject(i);

                            String foodName = c.getString("food_name");
                            Log.e("" + i, foodName );
                        }


                    }

                } catch (JSONException exception) {
                    return "Error";
                }
                return "";
            }

            @Override
            protected void onPostExecute(String result) {
                super.onPostExecute(result);

                    if (result.equals("Error"))
                    Toast.makeText(getApplicationContext(), "No Items Containing Your Search", Toast.LENGTH_SHORT).show();
                    else
                    {

                    }

            }

        }.execute();

        }

}
