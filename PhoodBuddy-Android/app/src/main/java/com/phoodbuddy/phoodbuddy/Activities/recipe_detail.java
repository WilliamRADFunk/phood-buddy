package com.phoodbuddy.phoodbuddy.Activities;

import android.content.Context;
import android.content.Intent;
import android.os.AsyncTask;
import android.os.Bundle;
import android.support.v7.app.AppCompatActivity;
import android.util.Log;
import android.view.LayoutInflater;
import android.view.View;
import android.widget.ImageView;
import android.widget.ListView;
import android.widget.TextView;
import android.widget.Toast;

import com.phoodbuddy.phoodbuddy.Controllers.RecipeDetailController;
import com.phoodbuddy.phoodbuddy.Models.RecipeDetail;
import com.phoodbuddy.phoodbuddy.R;
import com.phoodbuddy.phoodbuddy.Service.FatSecretGet;
import com.squareup.picasso.Picasso;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

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
    HashMap<String, String> dir;
    ViewHolder holder;
    Long id;
    String image;
    String cooking_time;
    String serving;
    String rating;
    String prep_time;
    String foodName;
    List<String> list;
    View v;
    ImageView backButton;
    private FatSecretGet mFatSecretGet = new FatSecretGet();
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.recipe_detail);

        Bundle i = getIntent().getExtras();
        id = i.getLong("id");
        foodName = i.getString("foodName");
        image = i.getString("url");
        Log.d("ID", id +"");

        holder = new ViewHolder();
        holder.ingredients = (ListView) findViewById(R.id.recipe_ingredients);
        holder.foodName = (TextView) findViewById(R.id.foodName_Detail);
        holder.img = (ImageView) findViewById(R.id.food_recipeDetail);
        holder.serving = (TextView) findViewById(R.id.serving_recipeDetail);
        holder.cookingTime = (TextView) findViewById(R.id.textView3);
        holder.prepTime = (TextView) findViewById(R.id.prep_recipeDetail);
        holder.rating = (TextView) findViewById(R.id.textView29);
        getFood(id);

        getSupportActionBar().setDisplayHomeAsUpEnabled(true);
        setTitle("");

        android.support.v7.app.ActionBar ab = getSupportActionBar();
        ab.setDisplayShowCustomEnabled(true);
        ab.setDisplayShowTitleEnabled(false);
        LayoutInflater inflator = (LayoutInflater) this
                .getSystemService(Context.LAYOUT_INFLATER_SERVICE);
        v = inflator.inflate(R.layout.back_button, null);
        ab.setCustomView(v);

    }

    @Override
    protected void onStart() {
        super.onStart();
        backButton = (ImageView) findViewById(R.id.back_button);
        backButton.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                Intent i = new Intent(recipe_detail.this, recipes.class);
                startActivity(i);
            }
        });

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
                        list = new ArrayList<String>();
                        JSONObject recipe = foodGet.getJSONObject("recipe");
                        cooking_time = recipe.getInt("cooking_time_min") +"";

                        serving = recipe.getString("number_of_servings")+"";
                        Log.e("", serving );
                        rating = recipe.getInt("rating")+"";
                        Log.e("", rating );
                        prep_time = recipe.getInt("preparation_time_min") +"";
                        Log.e("", prep_time );

                       System.out.println(prep_time + rating + serving + cooking_time);

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
                            list.add(direction_description);
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
//
                holder.foodName.setText(foodName + "");
                Picasso.with(mContext).load(image).into(holder.img);
                holder.serving.setText("This recipe can serve up to " +serving + " people.");
               // holder.rating.setText(rating+"/5");
                holder.cookingTime.setText(cooking_time +"min");
                holder.prepTime.setText(prep_time +"min");
                RecipeDetailController detail = new RecipeDetailController(getApplicationContext(), list);
                holder.ingredients.setAdapter(detail);
                    if (result.equals("Error"))
                    Toast.makeText(getApplicationContext(), "No Items Containing Your Search", Toast.LENGTH_SHORT).show();
                    else
                    {

                    }

            }

        }.execute();

        }
    public class ViewHolder{
        ImageView img;
        TextView foodName;
        TextView rating;
        TextView serving;
        TextView cookingTime;
        TextView prepTime;
        ListView ingredients;

    }


}
