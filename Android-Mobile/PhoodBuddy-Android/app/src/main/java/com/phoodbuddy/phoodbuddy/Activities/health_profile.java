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

import com.felipecsl.asymmetricgridview.library.widget.AsymmetricGridView;
import com.phoodbuddy.phoodbuddy.R;

/**
 * Created by Evan on 2/29/2016.
 */
public class health_profile extends AppCompatActivity
        implements NavigationView.OnNavigationItemSelectedListener {

    AsymmetricGridView listView;
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.health_profile);

        Toolbar toolbar = (Toolbar) findViewById(R.id.toolbar);
        setSupportActionBar(toolbar);
        setTitle("            Health Profile");

        DrawerLayout drawer = (DrawerLayout) findViewById(R.id.drawer_layout);
        ActionBarDrawerToggle toggle = new ActionBarDrawerToggle(
                this, drawer, toolbar, R.string.navigation_drawer_open, R.string.navigation_drawer_close);
        drawer.setDrawerListener(toggle);
        toggle.syncState();

        NavigationView navigationView = (NavigationView) findViewById(R.id.nav_view);
        navigationView.setNavigationItemSelectedListener(this);

        /*
        //listView = (AsymmetricGridView) findViewById(R.id.listView);

        // Choose your own preferred column width
        listView.setRequestedColumnWidth(Utils.dpToPx(this, 120));
        final List<AsymmetricItem> items = new ArrayList<>();

        // initialize your items array
       // ListAdapter adapter = new ListAdapter(this, listView, items) {
          //create adapter to set the gridview
        AsymmetricGridViewAdapter asymmetricAdapter =
                new AsymmetricGridViewAdapter<>(this, listView, adapter);
        listView.setAdapter(asymmetricAdapter);
    */
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
            Intent i = new Intent(health_profile.this, dashboard.class);
            startActivity(i);
        }
        else if (id == R.id.nav_shopping_list) {
            Intent i = new Intent(health_profile.this, shopping_list.class);
            startActivity(i);
        }
        else if (id == R.id.nav_deals) {

        }
        else if (id == R.id.nav_recipes) {
            Intent i = new Intent(health_profile.this, recipes.class);
            startActivity(i);
        }
        else if (id == R.id.nav_agenda) {
            Intent i = new Intent(health_profile.this, planner.class);
            startActivity(i);

        }
        else if (id == R.id.nav_scan) {
            /*
            Intent i = new Intent(dashboard.this, scan.class);
            startActivity(i);
            */
        }
        else if (id == R.id.nav_health_profile) {
           // Intent i = new Intent(health_profile.this, health_profile.class);
            //startActivity(i);
        }
        else if (id == R.id.nav_settings) {
            Intent i = new Intent(health_profile.this, settings.class);
            startActivity(i);
        }

        DrawerLayout drawer = (DrawerLayout) findViewById(R.id.drawer_layout);
        drawer.closeDrawer(GravityCompat.START);
        return true;
    }

}
