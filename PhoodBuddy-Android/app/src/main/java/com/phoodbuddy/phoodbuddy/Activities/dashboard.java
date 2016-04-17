package com.phoodbuddy.phoodbuddy.Activities;


import android.content.Context;
import android.content.Intent;
import android.database.Cursor;
import android.database.sqlite.SQLiteDatabase;
import android.os.Bundle;
import android.support.design.widget.NavigationView;
import android.support.v4.view.GravityCompat;
import android.support.v4.widget.DrawerLayout;
import android.support.v7.app.ActionBarDrawerToggle;
import android.support.v7.app.AppCompatActivity;
import android.support.v7.widget.Toolbar;
import android.view.Menu;
import android.view.MenuItem;
import android.view.View;
import android.widget.AdapterView;
import android.widget.ImageView;
import android.widget.ListView;

import com.phoodbuddy.phoodbuddy.Controllers.DashboardController;
import com.phoodbuddy.phoodbuddy.Models.Meals;
import com.phoodbuddy.phoodbuddy.R;

import java.util.ArrayList;
import java.util.List;

/**
 * Created by Evan Glazer on 2/29/2016.
 */
public class dashboard extends AppCompatActivity
        implements NavigationView.OnNavigationItemSelectedListener {
    ViewHolder holder;
    ListView breakfest;
    ListView lunch;
    ListView dinner;
    DashboardController adapter;
    DashboardController adapter1;
    DashboardController adapter2;
    List<Meals> breakfestList;
    List<Meals> lunchList;
    List<Meals> dinnerList;
    SQLiteDatabase db;
    Cursor c;
    @Override
    public void onOptionsMenuClosed(Menu menu) {
        super.onOptionsMenuClosed(menu);
    }

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.dashboard);
        Toolbar toolbar = (Toolbar) findViewById(R.id.toolbar);
        setSupportActionBar(toolbar);
        setTitle("               Dashboard");

        db=openOrCreateDatabase("Meals", Context.MODE_PRIVATE, null);
        db.execSQL("CREATE TABLE IF NOT EXISTS mealList(image VARCHAR,name VARCHAR,id TEXT,type TEXT);");


        breakfestList = new ArrayList<>();
        lunchList = new ArrayList<>();
        dinnerList = new ArrayList<>();
        DrawerLayout drawer = (DrawerLayout) findViewById(R.id.drawer_layout);
        ActionBarDrawerToggle toggle = new ActionBarDrawerToggle(
                this, drawer, toolbar, R.string.navigation_drawer_open, R.string.navigation_drawer_close);
        drawer.setDrawerListener(toggle);
        toggle.syncState();

        NavigationView navigationView = (NavigationView) findViewById(R.id.nav_view);
        navigationView.setNavigationItemSelectedListener(this);
        holder = new ViewHolder();

        breakfest = (ListView) findViewById(R.id.listView4);
        breakfest.setOnItemClickListener(new AdapterView.OnItemClickListener() {
            @Override
            public void onItemClick(AdapterView<?> parent, View view, int position, long id) {
                // send intent of id to detail activity and start activity
                Intent i = new Intent(dashboard.this, recipe_detail.class);
                i.putExtra("id", Long.valueOf(breakfestList.get(position).getId()));
                i.putExtra("foodName", breakfestList.get(position).getName());
                i.putExtra("url", breakfestList.get(position).getImage());
                startActivity(i);
            }
        });
        lunch = (ListView) findViewById(R.id.listView5);
        lunch.setOnItemClickListener(new AdapterView.OnItemClickListener() {
            @Override
            public void onItemClick(AdapterView<?> parent, View view, int position, long id) {
                // send intent of id to detail activity and start activity
                Intent i = new Intent(dashboard.this, recipe_detail.class);
                i.putExtra("id", Long.valueOf(breakfestList.get(position).getId()));
                i.putExtra("foodName", breakfestList.get(position).getName());
                i.putExtra("url", breakfestList.get(position).getImage());
                startActivity(i);
            }
        });
        dinner = (ListView) findViewById(R.id.listView6);
        dinner.setOnItemClickListener(new AdapterView.OnItemClickListener() {
            @Override
            public void onItemClick(AdapterView<?> parent, View view, int position, long id) {
                // send intent of id to detail activity and start activity
                Intent i = new Intent(dashboard.this, recipe_detail.class);
                i.putExtra("id", Long.valueOf(breakfestList.get(position).getId()));
                i.putExtra("foodName", breakfestList.get(position).getName());
                i.putExtra("url", breakfestList.get(position).getImage());
                startActivity(i);
            }
        });

        c=db.rawQuery("SELECT * FROM mealList", null);
        if(c.getCount()==0)
        {
            return;
        }
        else {
            while (c.moveToNext()) {
                Meals fav = new Meals();
                if (c.getString(3).equals("Breakfest")) {
                    fav.setImage(c.getString(0));
                    fav.setName(c.getString(1));
                    fav.setId(c.getString(2));
                    fav.setType(c.getString(3));
                    breakfestList.add(fav);
                }
                if (c.getString(3).equals("Lunch")) {
                    fav.setImage(c.getString(0));
                    fav.setName(c.getString(1));
                    fav.setId(c.getString(2));
                    fav.setType(c.getString(3));
                    lunchList.add(fav);
                }
                if (c.getString(3).equals("Dinner")) {
                    fav.setImage(c.getString(0));
                    fav.setName(c.getString(1));
                    fav.setId(c.getString(2));
                    fav.setType(c.getString(3));
                    dinnerList.add(fav);
                }
            }
        }
        adapter = new DashboardController(getApplicationContext(), breakfestList);
        adapter1 = new DashboardController(getApplicationContext(), lunchList);
        adapter2 = new DashboardController(getApplicationContext(), dinnerList);
        breakfest.setAdapter(adapter);
        lunch.setAdapter(adapter1);
        dinner.setAdapter(adapter2);


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

    @SuppressWarnings("StatementWithEmptyBody")
    @Override
    public boolean onNavigationItemSelected(MenuItem item) {
        // Handle navigation view item clicks here.
        int id = item.getItemId();

        if (id == R.id.nav_dashboard) {
            // Handle the action
        }
        else if (id == R.id.nav_shopping_list) {
            Intent i = new Intent(dashboard.this, shopping_list.class);
            startActivity(i);
        }
        else if (id == R.id.nav_deals) {
        }
        else if (id == R.id.nav_recipes) {
            Intent i = new Intent(dashboard.this, recipes.class);
            startActivity(i);
        }
        else if (id == R.id.nav_agenda) {
            Intent i = new Intent(dashboard.this, planner.class);
            startActivity(i);

        }
        else if (id == R.id.nav_scan) {
            /*
            Intent i = new Intent(dashboard.this, scan.class);
            startActivity(i);
            */
        }
        else if (id == R.id.nav_health_profile) {
            Intent i = new Intent(dashboard.this, health_profile.class);
            startActivity(i);
        }
        else if (id == R.id.nav_settings) {
            Intent i = new Intent(dashboard.this, settings.class);
            startActivity(i);
        }

        DrawerLayout drawer = (DrawerLayout) findViewById(R.id.drawer_layout);
        drawer.closeDrawer(GravityCompat.START);
        return true;
    }
    class ViewHolder
    {
        ImageView allRecipes;
        ImageView fitbit;
        ImageView shopping_list;
    }
}
