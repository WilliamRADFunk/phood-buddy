package com.phoodbuddy.phoodbuddy.Activities;

import android.app.AlertDialog;
import android.content.Context;
import android.content.Intent;
import android.os.AsyncTask;
import android.os.Bundle;
import android.support.design.widget.NavigationView;
import android.support.v4.view.GravityCompat;
import android.support.v4.widget.DrawerLayout;
import android.support.v7.app.ActionBarDrawerToggle;
import android.support.v7.app.AppCompatActivity;
import android.support.v7.widget.Toolbar;
import android.util.Log;
import android.view.LayoutInflater;
import android.view.Menu;
import android.view.MenuItem;
import android.view.View;
import android.widget.AdapterView;
import android.widget.ListView;
import android.widget.SearchView;
import android.widget.Toast;

import com.phoodbuddy.phoodbuddy.Controllers.RecipeController;
import com.phoodbuddy.phoodbuddy.Models.Recipe;
import com.phoodbuddy.phoodbuddy.R;
import com.phoodbuddy.phoodbuddy.Service.FatSecretSearch;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import java.util.ArrayList;
import java.util.List;

/**
 * Created by Evan Glazer on 2/29/2016.
 */
public class recipes extends AppCompatActivity
        implements NavigationView.OnNavigationItemSelectedListener{
    SearchView mSearchView;

    private Context mContext;
    List<Recipe> recipeList = new ArrayList<>();
    ListView listView;
    RecipeController adapter;
    boolean firstTime = true;
    int id;
    SearchView searchView;

View v;
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        //getWindow().requestFeature(Window.FEATURE_ACTION_BAR);
        super.onCreate(savedInstanceState);
        setContentView(R.layout.recipe_list);
        setTitle("                Recipes");
        mContext = this;
        android.support.v7.app.ActionBar ab = getSupportActionBar();
        ab.setDisplayShowCustomEnabled(true);
        ab.setDisplayShowTitleEnabled(false);
        LayoutInflater inflator = (LayoutInflater) this
                .getSystemService(Context.LAYOUT_INFLATER_SERVICE);
        v = inflator.inflate(R.layout.searchview, null);
        ab.setCustomView(v);

        listView = (ListView) findViewById(R.id.listView3);
        listView.setOnItemClickListener(new AdapterView.OnItemClickListener() {
            @Override
            public void onItemClick(AdapterView<?> parent, View view, int position, long id) {
                // send intent of id to detail activity and start activity
                Intent i = new Intent(recipes.this, recipe_detail.class);
                i.putExtra("id", recipeList.get(position).getId());
                i.putExtra("foodName", recipeList.get(position).getName());
                i.putExtra("url", recipeList.get(position).getImage());
                startActivity(i);
            }
        });
        Toolbar toolbar = (Toolbar) findViewById(R.id.toolbar);
        setSupportActionBar(toolbar);

        DrawerLayout drawer = (DrawerLayout) findViewById(R.id.drawer_layout);
        ActionBarDrawerToggle toggle = new ActionBarDrawerToggle(
                this, drawer, toolbar, R.string.navigation_drawer_open, R.string.navigation_drawer_close);
        drawer.setDrawerListener(toggle);
        toggle.syncState();

        NavigationView navigationView = (NavigationView) findViewById(R.id.nav_view);
        navigationView.setNavigationItemSelectedListener(this);

    }

    public void showMessage(String title, String message) {
        AlertDialog.Builder builder = new AlertDialog.Builder(this);
        builder.setCancelable(true);
        builder.setTitle(title);
        builder.setMessage(message);
        builder.show();
    }

    @Override
    public void onBackPressed() {
        DrawerLayout drawer = (DrawerLayout) findViewById(R.id.drawer_layout);
        if (drawer.isDrawerOpen(GravityCompat.START)) {
            drawer.closeDrawer(GravityCompat.START);
        } else {
            super.onBackPressed();
        }
    }
    @Override
    public boolean onCreateOptionsMenu(Menu menu) {
        super.onCreateOptionsMenu(menu);
        //MenuInflater inflater = getMenuInflater();
        return true;

    }


    @SuppressWarnings("StatementWithEmptyBody")
    @Override
    public boolean onNavigationItemSelected(MenuItem item) {
        // Handle navigation view item clicks here.
        int id = item.getItemId();

        if (id == R.id.nav_dashboard) {
            Intent i = new Intent(recipes.this, dashboard.class);
            startActivity(i);
        } else if (id == R.id.nav_shopping_list) {
            Intent i = new Intent(recipes.this, shopping_list.class);
            startActivity(i);
        } else if (id == R.id.nav_deals) {

        } else if (id == R.id.nav_recipes) {
        } else if (id == R.id.nav_agenda) {
            Intent i = new Intent(recipes.this, planner.class);
            startActivity(i);

        } else if (id == R.id.nav_scan) {
            /*
            Intent i = new Intent(dashboard.this, scan.class);
            startActivity(i);
            */
        } else if (id == R.id.nav_health_profile) {
            Intent i = new Intent(recipes.this, health_profile.class);
            startActivity(i);
        } else if (id == R.id.nav_settings) {
            Intent i = new Intent(recipes.this, settings.class);
            startActivity(i);
        }

        DrawerLayout drawer = (DrawerLayout) findViewById(R.id.drawer_layout);
        drawer.closeDrawer(GravityCompat.START);
        return true;
    }

    @Override
    protected void onStart() {
        super.onStart();
        searchView = (SearchView) findViewById(R.id.searchView3);
        searchView.setOnQueryTextListener(new SearchView.OnQueryTextListener() {
            @Override
            public boolean onQueryTextSubmit(String query) {
                searchFood(query, 0);
                return false;
            }

            @Override
            public boolean onQueryTextChange(String newText) {
                return false;
            }
        });
    }

    /**
     * FatSecret Search
     */
    private FatSecretSearch mFatSecretSearch = new FatSecretSearch();

    private void searchFood(final String item, final int page_num) {
        new AsyncTask<String, String, String>() {
            @Override
            protected void onPreExecute() {

            }

            @Override
            protected String doInBackground(String... arg0) {
                JSONObject food = mFatSecretSearch.searchFood(item, page_num);
                JSONArray FOODS_ARRAY;
                try {
                    if (food != null) {
                        FOODS_ARRAY = food.getJSONArray("recipe");
                        if (FOODS_ARRAY != null) {
                            for (int i = 0; i < FOODS_ARRAY.length(); i++) {
                                JSONObject food_items = FOODS_ARRAY.optJSONObject(i);
                                String food_name = food_items.getString("recipe_name");
                                String food_description = food_items.getString("recipe_description");
                                String food_image = food_items.getString("recipe_image");
                                Long food_id = food_items.getLong("recipe_id");


                                Log.e("food_name", food_name);
                                Log.e("description", food_description);
                                Log.e("id", "" + food_id);
                                Recipe recipe = new Recipe(food_id, food_name, food_description, food_image);
                                recipeList.add(recipe);
                                //showMessage("Pizza Recipes", food_name.toString());
                                //getFood(Long.valueOf(food_id));
                            }
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
                listView.invalidate();
                adapter = new RecipeController(getApplicationContext(), recipeList);
                listView.setAdapter(adapter);
                if (result.equals("Error"))
                    Toast.makeText(getApplicationContext(), "No Items Containing Your Search", Toast.LENGTH_SHORT).show();

            }
        }.execute();
    }



}

