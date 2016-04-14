package com.phoodbuddy.phoodbuddy.Activities;


import android.content.Intent;
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
import android.widget.ImageView;

import com.phoodbuddy.phoodbuddy.R;

/**
 * Created by Evan Glazer on 2/29/2016.
 */
public class dashboard extends AppCompatActivity
        implements NavigationView.OnNavigationItemSelectedListener {
    ViewHolder holder;

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
        DrawerLayout drawer = (DrawerLayout) findViewById(R.id.drawer_layout);
        ActionBarDrawerToggle toggle = new ActionBarDrawerToggle(
                this, drawer, toolbar, R.string.navigation_drawer_open, R.string.navigation_drawer_close);
        drawer.setDrawerListener(toggle);
        toggle.syncState();

        NavigationView navigationView = (NavigationView) findViewById(R.id.nav_view);
        navigationView.setNavigationItemSelectedListener(this);
        holder = new ViewHolder();
        holder.fitbit = (ImageView) findViewById(R.id.dash_fitbit);
        holder.shopping_list = (ImageView) findViewById(R.id.dash_shopping_list);
        holder.allRecipes = (ImageView) findViewById(R.id.dash_fav_recipe);
    }

    public void onClick(View v)
    {
        switch(v.getId())
        {
            case R.id.dash_fitbit:

                break;
            case R.id.dash_shopping_list:

                break;
            case R.id.dash_fav_recipe:
                break;
            default:
                break;
        }
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
