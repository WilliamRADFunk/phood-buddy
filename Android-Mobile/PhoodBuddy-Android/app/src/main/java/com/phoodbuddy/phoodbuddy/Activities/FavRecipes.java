package com.phoodbuddy.phoodbuddy.Activities;

import android.content.Context;
import android.content.Intent;
import android.database.Cursor;
import android.database.sqlite.SQLiteDatabase;
import android.os.Bundle;
import android.support.v7.app.AppCompatActivity;
import android.view.ContextMenu;
import android.view.MenuInflater;
import android.view.MenuItem;
import android.view.View;
import android.widget.AdapterView;
import android.widget.ListView;

import com.phoodbuddy.phoodbuddy.Controllers.FavRecipeController;
import com.phoodbuddy.phoodbuddy.Models.FavRecipe;
import com.phoodbuddy.phoodbuddy.R;

import java.util.ArrayList;
import java.util.List;

/**
 * Created by Evan Glazer on 4/11/2016.
 */
public class FavRecipes extends AppCompatActivity {
    SQLiteDatabase db;
    Cursor c;
    List<FavRecipe> favItems;
    ListView favList;
    FavRecipeController adapter;
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.fav_recipes);
        db=openOrCreateDatabase("FavRecipe", Context.MODE_PRIVATE, null);
        db.execSQL("CREATE TABLE IF NOT EXISTS favRecipes(image VARCHAR,name VARCHAR,id TEXT);");
        setTitle(" Favorite Recipes");
        favList = (ListView) findViewById(R.id.favlistView);
        favList.setOnItemClickListener(new AdapterView.OnItemClickListener() {
            @Override
            public void onItemClick(AdapterView<?> parent, View view, int position, long id) {
                // send intent of id to detail activity and start activity
                Intent i = new Intent(FavRecipes.this, recipe_detail.class);
                i.putExtra("id", Long.valueOf(favItems.get(position).getId()));
                i.putExtra("foodName", favItems.get(position).getName());
                i.putExtra("url", favItems.get(position).getImage());
                startActivity(i);
            }
        });
        favItems = new ArrayList<>();

        c=db.rawQuery("SELECT * FROM favRecipes", null);
        if(c.getCount()==0)
        {
            return;
        }
        while(c.moveToNext()) {
            FavRecipe fav = new FavRecipe();

            fav.setImage(c.getString(0));
            fav.setName(c.getString(1));
            fav.setId(c.getString(2));
            favItems.add(fav);
        }
        adapter = new FavRecipeController(getApplicationContext(), favItems);
        favList.setAdapter(adapter);
        registerForContextMenu(favList);
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
                String itemName = favItems.get(info.position).getName();
                db.execSQL("DELETE FROM favRecipes WHERE name='" + itemName + "'");
                favItems.remove(info.position);
                adapter.notifyDataSetChanged();
                break;
            default:
                super.onOptionsItemSelected(item);
                break;

        }
        return true;
    }


}
