package com.phoodbuddy.phoodbuddy.Activities;

import android.content.Intent;
import android.os.Bundle;
import android.support.design.widget.NavigationView;
import android.support.v4.view.GravityCompat;
import android.support.v4.widget.DrawerLayout;
import android.support.v7.app.ActionBarDrawerToggle;
import android.support.v7.app.AppCompatActivity;
import android.support.v7.widget.Toolbar;
import android.view.MenuItem;
import android.view.View;
import android.widget.ImageButton;

import com.firebase.client.AuthData;
import com.firebase.client.Firebase;
import com.phoodbuddy.phoodbuddy.R;

/**
 * Created by Evan Glazer on 2/29/2016.
 */
public class settings extends AppCompatActivity
        implements NavigationView.OnNavigationItemSelectedListener {

    /* A reference to the Firebase */
    private Firebase mFirebaseRef;
    /* Data from the authenticated user */
    private AuthData mAuthData;

    ImageButton profile;
    ImageButton tasteProfile;
    ImageButton logout;
    ImageButton favRecipes;
    ImageButton healthProfile;

    Intent i;
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.settings);
        setTitle("                Settings");
        Toolbar toolbar = (Toolbar) findViewById(R.id.toolbar);
        setSupportActionBar(toolbar);

        profile = (ImageButton) findViewById(R.id.myProfile);
        profile.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
               // Intent i = new Intent(settings.this, MyProfile.class);
                //startActivity(i);
            }
        });
        tasteProfile = (ImageButton) findViewById(R.id.tasteProfile);
        tasteProfile.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                Intent i = new Intent(settings.this, TasteProfile.class);
                startActivity(i);
            }
        });
        logout = (ImageButton) findViewById(R.id.logout);
        logout.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                logout();
            }
        });
        favRecipes = (ImageButton) findViewById(R.id.favRecipes);
        favRecipes.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                Intent i = new Intent(settings.this, FavRecipes.class);
                startActivity(i);
            }
        });
        healthProfile = (ImageButton) findViewById(R.id.healthProfile);
        healthProfile.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                Intent i = new Intent(settings.this, health_profile.class);
                startActivity(i);
            }
        });


        DrawerLayout drawer = (DrawerLayout) findViewById(R.id.drawer_layout);
        ActionBarDrawerToggle toggle = new ActionBarDrawerToggle(
                this, drawer, toolbar, R.string.navigation_drawer_open, R.string.navigation_drawer_close);
        drawer.setDrawerListener(toggle);
        toggle.syncState();

        NavigationView navigationView = (NavigationView) findViewById(R.id.nav_view);
        navigationView.setNavigationItemSelectedListener(this);


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

    public void onClick(View v)
    {
        switch(v.getId())
        {
            case R.id.myProfile:
               // i = new Intent(settings.this, MyProfile.class);
                //startActivity(i);
                break;
            case R.id.favRecipes:
                i = new Intent(settings.this, FavRecipes.class);
                startActivity(i);
                break;
            case R.id.tasteProfile:
                i = new Intent(settings.this, TasteProfile.class);
                startActivity(i);
                break;
            case R.id.healthProfile:
                i = new Intent(settings.this, health_profile.class);
                startActivity(i);
                break;
            case R.id.logout:
                logout();
                i = new Intent(settings.this, login.class);
                startActivity(i);
                break;
            default:
                break;
        }



    }

    private void logout() {
        if (this.mAuthData != null) {
            /* logout of Firebase */
            mFirebaseRef.unauth();
        }
        }
    @SuppressWarnings("StatementWithEmptyBody")
    @Override
    public boolean onNavigationItemSelected(MenuItem item) {
        // Handle navigation view item clicks here.
        int id = item.getItemId();

        if (id == R.id.nav_dashboard) {
            Intent i = new Intent(settings.this, dashboard.class);
            startActivity(i);
        }
        else if (id == R.id.nav_shopping_list) {
            Intent i = new Intent(settings.this, shopping_list.class);
            startActivity(i);
        }
        else if (id == R.id.nav_deals) {

        }
        else if (id == R.id.nav_recipes) {
            Intent i = new Intent(settings.this, recipes.class);
             startActivity(i);
        }
        else if (id == R.id.nav_agenda) {
            Intent i = new Intent(settings.this, planner.class);
            startActivity(i);

        }
        else if (id == R.id.nav_scan) {
            /*
            Intent i = new Intent(dashboard.this, scan.class);
            startActivity(i);
            */
        }
        else if (id == R.id.nav_health_profile) {
            Intent i = new Intent(settings.this, health_profile.class);
            startActivity(i);
        }
        else if (id == R.id.nav_settings) {
        }

        DrawerLayout drawer = (DrawerLayout) findViewById(R.id.drawer_layout);
        drawer.closeDrawer(GravityCompat.START);
        return true;
    }

}
