package com.phoodbuddy.phoodbuddy.Activities;


import android.app.DatePickerDialog;
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
import android.util.Log;
import android.view.ContextMenu;
import android.view.Menu;
import android.view.MenuInflater;
import android.view.MenuItem;
import android.view.View;
import android.widget.AdapterView;
import android.widget.DatePicker;
import android.widget.ImageView;
import android.widget.ListView;

import com.phoodbuddy.phoodbuddy.Controllers.DashboardController;
import com.phoodbuddy.phoodbuddy.Models.Meals;
import com.phoodbuddy.phoodbuddy.R;

import java.util.ArrayList;
import java.util.Calendar;
import java.util.List;

/**
 * Created by Evan Glazer on 2/29/2016.
 */
public class dashboard extends AppCompatActivity
        implements NavigationView.OnNavigationItemSelectedListener, DatePickerDialog.OnDateSetListener {
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

    String[] Months = new String[]{"January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December" };
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
        db.execSQL("CREATE TABLE IF NOT EXISTS mealList(image VARCHAR,name VARCHAR,id " +
                "TEXT,type TEXT,date TEXT);");


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
                i.putExtra("id", Long.valueOf(lunchList.get(position).getId()));
                i.putExtra("foodName", lunchList.get(position).getName());
                i.putExtra("url", lunchList.get(position).getImage());
                startActivity(i);
            }
        });
        dinner = (ListView) findViewById(R.id.listView6);
        dinner.setOnItemClickListener(new AdapterView.OnItemClickListener() {
            @Override
            public void onItemClick(AdapterView<?> parent, View view, int position, long id) {
                // send intent of id to detail activity and start activity
                Intent i = new Intent(dashboard.this, recipe_detail.class);
                i.putExtra("id", Long.valueOf(dinnerList.get(position).getId()));
                i.putExtra("foodName", dinnerList.get(position).getName());
                i.putExtra("url", dinnerList.get(position).getImage());
                startActivity(i);
            }
        });

        Calendar c1 = Calendar.getInstance();
        int year = c1.get(Calendar.YEAR);
        int month = c1.get(Calendar.MONTH);
        int day = c1.get(Calendar.DAY_OF_MONTH);

        String date = year+"-"+ month +"-"+day;
        Log.e("Dashboard", date);
        c= db.rawQuery("SELECT * FROM mealList WHERE date='"+date+"'", null);
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
                    fav.setDate(c.getString(4));
                    breakfestList.add(fav);
                }
                if (c.getString(3).equals("Lunch")) {
                    fav.setImage(c.getString(0));
                    fav.setName(c.getString(1));
                    fav.setId(c.getString(2));
                    fav.setType(c.getString(3));
                    fav.setDate(c.getString(4));
                    lunchList.add(fav);
                }
                if (c.getString(3).equals("Dinner")) {
                    fav.setImage(c.getString(0));
                    fav.setName(c.getString(1));
                    fav.setId(c.getString(2));
                    fav.setType(c.getString(3));
                    fav.setDate(c.getString(4));
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

        registerForContextMenu(breakfest);
        registerForContextMenu(lunch);
        registerForContextMenu(dinner);
        setTitle("Today Meals - "+Months[month]+" "+day+","+year);
    }
    @Override
    public void onCreateContextMenu(ContextMenu menu, View v, ContextMenu.ContextMenuInfo menuInfo) {
        super.onCreateContextMenu(menu, v, menuInfo);
        MenuInflater inflater = getMenuInflater();
        inflater.inflate(R.menu.menu_main, menu);

    }


    @Override
    public boolean onContextItemSelected(MenuItem item) {
        AdapterView.AdapterContextMenuInfo info = (AdapterView.AdapterContextMenuInfo) item.getMenuInfo();
        switch(item.getItemId())
        {
            case R.id.shopping_delete:
                // return item name then delete from based on name
                String itemName = breakfestList.get(info.position).getName();
                db.execSQL("DELETE FROM mealList WHERE name='" + itemName + "'");
                breakfestList.remove(info.position);
                adapter.notifyDataSetChanged();
                break;
            default:
                super.onOptionsItemSelected(item);
                break;

        }
        return true;
    }
    @Override
    public boolean onCreateOptionsMenu(Menu menu) {
        MenuInflater inflater = getMenuInflater();
        inflater.inflate(R.menu.switch_meal_date, menu);
        return true;
    }

    @Override
    public boolean onOptionsItemSelected(MenuItem item) {
        // Handle item selection
        switch (item.getItemId()) {
            case R.id.meal_switch:
                DatePickerDialog dialog = new DatePickerDialog(this, this, 2016, 3, 17);
                dialog.show();
                return true;
            default:
                return super.onOptionsItemSelected(item);
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

    @Override
    public void onDateSet(DatePicker view, int year, int monthOfYear, int dayOfMonth) {

        breakfestList.clear();
        lunchList.clear();
        dinnerList.clear();
        adapter.notifyDataSetChanged();
        adapter1.notifyDataSetChanged();
        adapter2.notifyDataSetChanged();

        String date = year+"-"+ monthOfYear +"-"+dayOfMonth;
        Log.e("Dashboard1", date);
        c= db.rawQuery("SELECT * FROM mealList WHERE date='"+date+"'", null);
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
                    fav.setDate(c.getString(4));
                    breakfestList.add(fav);
                }
                if (c.getString(3).equals("Lunch")) {
                    fav.setImage(c.getString(0));
                    fav.setName(c.getString(1));
                    fav.setId(c.getString(2));
                    fav.setType(c.getString(3));
                    fav.setDate(c.getString(4));
                    lunchList.add(fav);
                }
                if (c.getString(3).equals("Dinner")) {
                    fav.setImage(c.getString(0));
                    fav.setName(c.getString(1));
                    fav.setId(c.getString(2));
                    fav.setType(c.getString(3));
                    fav.setDate(c.getString(4));
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

        registerForContextMenu(breakfest);
        registerForContextMenu(lunch);
        registerForContextMenu(dinner);
        setTitle("Meals - "+Months[monthOfYear]+" "+dayOfMonth+","+year);

    }

    class ViewHolder
    {
        ImageView allRecipes;
        ImageView fitbit;
        ImageView shopping_list;
    }
}
