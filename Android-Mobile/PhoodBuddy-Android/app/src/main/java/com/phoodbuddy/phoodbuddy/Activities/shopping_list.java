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
import android.view.ContextMenu;
import android.view.MenuInflater;
import android.view.MenuItem;
import android.view.View;
import android.widget.AdapterView;
import android.widget.Button;
import android.widget.EditText;
import android.widget.ListView;
import android.widget.Toast;

import com.phoodbuddy.phoodbuddy.Controllers.ShoppingListController;
import com.phoodbuddy.phoodbuddy.Fragments.shopping_list_detail;
import com.phoodbuddy.phoodbuddy.Models.shopping_list_Model;
import com.phoodbuddy.phoodbuddy.R;

import java.util.ArrayList;
import java.util.List;

/**
 * Created by Evan Glazer on 2/29/2016.
 */
public class shopping_list extends AppCompatActivity
        implements NavigationView.OnNavigationItemSelectedListener, View.OnClickListener {
    ViewHolder viewHolder;
    List<shopping_list_Model> data = new ArrayList<>();
    SQLiteDatabase db;
    EditText item;
    ShoppingListController controller = null;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.shopping_list);
        Toolbar toolbar = (Toolbar) findViewById(R.id.toolbar);
        setSupportActionBar(toolbar);
        setTitle("             Shopping List");


        DrawerLayout drawer = (DrawerLayout) findViewById(R.id.drawer_layout);
        ActionBarDrawerToggle toggle = new ActionBarDrawerToggle(
                this, drawer, toolbar, R.string.navigation_drawer_open, R.string.navigation_drawer_close);
        drawer.setDrawerListener(toggle);
        toggle.syncState();

        NavigationView navigationView = (NavigationView) findViewById(R.id.nav_view);
        navigationView.setNavigationItemSelectedListener(this);

        db=openOrCreateDatabase("ShoppingList", Context.MODE_PRIVATE, null);
        db.execSQL("CREATE TABLE IF NOT EXISTS shoppingList(item VARCHAR,quantity VARCHAR,serving VARCHAR);");

        loadData();
        controller = new ShoppingListController(this, data);

        viewHolder = new ViewHolder();
        viewHolder.add = (Button) findViewById(R.id.listAdd);
        viewHolder.list = (ListView) findViewById(R.id.shoppingList);
        item = (EditText) findViewById(R.id.shopping_edit);


        viewHolder.list.setAdapter(controller);
        viewHolder.add.setOnClickListener(this);
        registerForContextMenu(viewHolder.list);
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
                String itemName = data.get(info.position).getItemName();
                db.execSQL("DELETE FROM shoppingList WHERE item='" + itemName + "'");
                data.remove(info.position);
                controller.notifyDataSetChanged();
                break;
            default:
                super.onOptionsItemSelected(item);
                break;

        }
        return true;
    }

    public void loadData()
    {
        Cursor c=db.rawQuery("SELECT * FROM shoppingList", null);
        if(c.getCount()==0)
        {
            Toast.makeText(getApplicationContext(), "No items in your list!", Toast.LENGTH_LONG).show();
            return;
        }
        while(c.moveToNext())
        {
            shopping_list_Model model = new shopping_list_Model(c.getString(0),c.getString(1),c.getString(2));
            data.add(model);
        }
    }
    @Override
    public void onClick(View v) {
        if(v.getId() == R.id.listAdd)
        {
            String content = "" + item.getText().toString();
           if (content.equals("")) {
                Toast.makeText(getApplicationContext(), "Item is empty!", Toast.LENGTH_LONG).show();
            } else {
               Intent i = new Intent(shopping_list.this, shopping_list_detail.class);
               i.putExtra("item", content);
               startActivity(i);

           }
        }
    }

    class ViewHolder
    {
        Button add;
        ListView list;

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
    public boolean onOptionsItemSelected(MenuItem item) {
        return super.onOptionsItemSelected(item);
    }

    @SuppressWarnings("StatementWithEmptyBody")
    @Override
    public boolean onNavigationItemSelected(MenuItem item) {
        // Handle navigation view item clicks here.
        int id = item.getItemId();

        if (id == R.id.nav_dashboard) {
            Intent i = new Intent(shopping_list.this, dashboard.class);
            startActivity(i);
        }
        else if (id == R.id.nav_shopping_list) {
            //Intent i = new Intent(planner.this, shopping_list_Model.class);
           // startActivity(i);
        }
        else if (id == R.id.nav_deals) {
        }
        else if (id == R.id.nav_recipes) {
            Intent i = new Intent(shopping_list.this, recipes.class);
            startActivity(i);
        }
        else if (id == R.id.nav_agenda) {
            Intent i = new Intent(shopping_list.this, planner.class);
            startActivity(i);

        }
        else if (id == R.id.nav_scan) {
        }
        else if (id == R.id.nav_health_profile) {
            Intent i = new Intent(shopping_list.this, health_profile.class);
            startActivity(i);
        }
        else if (id == R.id.nav_settings) {
            Intent i = new Intent(shopping_list.this, settings.class);
            startActivity(i);
        }

        DrawerLayout drawer = (DrawerLayout) findViewById(R.id.drawer_layout);
        drawer.closeDrawer(GravityCompat.START);
        return true;
    }
}
