package com.phoodbuddy.phoodbuddy.Activities;

import android.content.Context;
import android.content.Intent;
import android.database.sqlite.SQLiteDatabase;
import android.os.AsyncTask;
import android.os.Bundle;
import android.support.v7.app.AppCompatActivity;
import android.util.Log;
import android.view.LayoutInflater;
import android.view.Menu;
import android.view.MenuInflater;
import android.view.MenuItem;
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
import java.util.Calendar;
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
    SQLiteDatabase db;
    SQLiteDatabase db1;
    private FatSecretGet mFatSecretGet = new FatSecretGet();
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.recipe_detail);
        db=openOrCreateDatabase("FavRecipe", Context.MODE_PRIVATE, null);
        db.execSQL("CREATE TABLE IF NOT EXISTS favRecipes(image VARCHAR,name VARCHAR,id TEXT);");

        db1=openOrCreateDatabase("Meals", Context.MODE_PRIVATE, null);
        db1.execSQL("CREATE TABLE IF NOT EXISTS mealList(image VARCHAR,name VARCHAR,id TEXT,type TEXT,date TEXT);");

        Bundle i = getIntent().getExtras();
        id = i.getLong("id");
        foodName = i.getString("foodName");
        image = i.getString("url");
        Log.d("ID", id + "");

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
    public boolean onCreateOptionsMenu(Menu menu) {
        MenuInflater inflater = getMenuInflater();
        inflater.inflate(R.menu.main, menu);
        return true;
    }
    @Override
    public boolean onOptionsItemSelected(MenuItem item) {
        // Handle item selection
        Calendar cal = Calendar.getInstance();
        int year = cal.get(Calendar.YEAR);
        int month = cal.get(Calendar.MONTH);
        int day = cal.get(Calendar.DAY_OF_MONTH);
        String date = year+"-"+month+"-"+day;
        Log.e("RecDetail", date);

        switch (item.getItemId()) {
            case R.id.fav_rec:
                db.execSQL("INSERT INTO favRecipes VALUES('"+ image+"','"+foodName+
                        "','"+id+"');");
                return true;
            case R.id.breakfest_today:
                db1.execSQL("INSERT INTO mealList VALUES('"+ image+"','"+foodName+
                        "','"+id+"','"+"Breakfest"+"','"+date+"');");
                return true;
            case R.id.lunch_today:
                db1.execSQL("INSERT INTO mealList VALUES('"+ image+"','"+foodName+
                        "','"+id+"','"+"Lunch"+"','"+date+"');");
                return true;
            case R.id.dinner_today:
                db1.execSQL("INSERT INTO mealList VALUES('"+ image+"','"+foodName+
                        "','"+id+"','"+"Dinner"+"','"+date+"');");
                return true;
            case R.id.meal_custom:
                // send intent of id to detail activity and start activity
                Intent i = new Intent(recipe_detail.this, dashboard_custom.class);
                i.putExtra("id", id);
                i.putExtra("foodName", foodName);
                i.putExtra("url",image);
                startActivity(i);
                return true;
            default:
                return super.onOptionsItemSelected(item);
        }
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
                    if (result.equals("Error")) {
                     //   Toast.makeText(getApplicationContext(), "No Items Containing Your Search", Toast.LENGTH_SHORT).show();

                    }else
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
