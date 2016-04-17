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
import android.view.MenuItem;
import android.view.View;
import android.view.ViewGroup;
import android.widget.CalendarView;
import android.widget.ListView;
import android.widget.TextView;

import com.phoodbuddy.phoodbuddy.Controllers.FavRecipeController;
import com.phoodbuddy.phoodbuddy.Controllers.PlannerController;
import com.phoodbuddy.phoodbuddy.Models.FavRecipe;
import com.phoodbuddy.phoodbuddy.Models.Meals;
import com.phoodbuddy.phoodbuddy.R;

import java.util.ArrayList;
import java.util.List;

/**
 * Created by  Evan Glazer on 2/29/2016.
 */
public class planner extends AppCompatActivity
        implements NavigationView.OnNavigationItemSelectedListener {


    SQLiteDatabase db1;
    List<Meals> plannerList;
    PlannerController adapter;
    ListView planView;
    CalendarView cal;
    Cursor c;

    String date;
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.planner);
        Toolbar toolbar = (Toolbar) findViewById(R.id.toolbar);
        setSupportActionBar(toolbar);
        plannerList = new ArrayList<>();
        adapter = new PlannerController(getApplicationContext(), plannerList);
        planView = (ListView) findViewById(R.id.listView2);
        cal = (CalendarView) findViewById(R.id.calendarView);
        db1=openOrCreateDatabase("Meals", Context.MODE_PRIVATE, null);
        db1.execSQL("CREATE TABLE IF NOT EXISTS mealList(image VARCHAR,name VARCHAR,id TEXT,type TEXT,date TEXT);");
        cal.setOnDateChangeListener(new CalendarView.OnDateChangeListener() {

            @Override
            public void onSelectedDayChange(CalendarView view, int year, int month,
                                            int dayOfMonth) {
               date = year+"-"+month+"-"+dayOfMonth;
                c=db1.rawQuery("SELECT * FROM mealList WHERE date="+ date+"", null);
                if(c.getCount()==0)
                {
                    return;
                }
                while(c.moveToNext()) {
                    Meals fav = new Meals();

                    fav.setImage(c.getString(0));
                    fav.setName(c.getString(1));
                    fav.setId(c.getString(2));
                    fav.setType(c.getString(3));
                    fav.setDate(c.getString(4));
                    plannerList.add(fav);
                }
                planView.setAdapter(adapter);
            }
        });

        DrawerLayout drawer = (DrawerLayout) findViewById(R.id.drawer_layout);
        ActionBarDrawerToggle toggle = new ActionBarDrawerToggle(
                this, drawer, toolbar, R.string.navigation_drawer_open, R.string.navigation_drawer_close);
        drawer.setDrawerListener(toggle);
        toggle.syncState();
        setTitle("                Planner");
        CalendarView cv = (CalendarView) this.findViewById(R.id.calendarView);
        ViewGroup vg = (ViewGroup) cv.getChildAt(0);
        View child = vg.getChildAt(0);

        if(child instanceof TextView) {
            ((TextView)child).setTextColor(getResources().getColor(R.color.black_button));
        }
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

    @SuppressWarnings("StatementWithEmptyBody")
    @Override
    public boolean onNavigationItemSelected(MenuItem item) {
        // Handle navigation view item clicks here.
        int id = item.getItemId();

        if (id == R.id.nav_dashboard) {
            Intent i = new Intent(planner.this, dashboard.class);
            startActivity(i);
        }
        else if (id == R.id.nav_shopping_list) {
            Intent i = new Intent(planner.this, shopping_list.class);
            startActivity(i);
        }
        else if (id == R.id.nav_deals) {
        }
        else if (id == R.id.nav_recipes) {
            Intent i = new Intent(planner.this, recipes.class);
            startActivity(i);
        }
        else if (id == R.id.nav_agenda) {

        }
        else if (id == R.id.nav_scan) {
            /*
            Intent i = new Intent(dashboard.this, scan.class);
            startActivity(i);
            */
        }
        else if (id == R.id.nav_health_profile) {
            Intent i = new Intent(planner.this, health_profile.class);
            startActivity(i);
        }
        else if (id == R.id.nav_settings) {
            Intent i = new Intent(planner.this, settings.class);
            startActivity(i);
        }

        DrawerLayout drawer = (DrawerLayout) findViewById(R.id.drawer_layout);
        drawer.closeDrawer(GravityCompat.START);
        return true;
    }
}
