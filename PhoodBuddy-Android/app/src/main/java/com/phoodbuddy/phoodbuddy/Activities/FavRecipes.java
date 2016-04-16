package com.phoodbuddy.phoodbuddy.Activities;

import android.content.Context;
import android.content.Intent;
import android.database.Cursor;
import android.database.sqlite.SQLiteDatabase;
import android.os.Bundle;
import android.support.v7.app.AppCompatActivity;
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
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.fav_recipes);
        db=openOrCreateDatabase("FavRecipe", Context.MODE_PRIVATE, null);
        db.execSQL("CREATE TABLE IF NOT EXISTS favRecipes(image VARCHAR,name VARCHAR,id TEXT);");

        favList = (ListView) findViewById(R.id.favlistView);
        favList.setOnItemClickListener(new AdapterView.OnItemClickListener() {
            @Override
            public void onItemClick(AdapterView<?> parent, View view, int position, long id) {
                // send intent of id to detail activity and start activity
                Intent i = new Intent(FavRecipes.this, recipe_detail.class);
                i.putExtra("id", favItems.get(position).getId());
                i.putExtra("foodName", favItems.get(position).getName());
                i.putExtra("url", favItems.get(position).getImage());
                startActivity(i);
            }
        });
        favItems = new ArrayList<>();

        c=db.rawQuery("SELECT * FROM favRecipes", null);
        if(c.getCount()==0)
        {
            FavRecipeController adapter = new FavRecipeController(getApplicationContext(), favItems);
            favList.setAdapter(adapter);
            return;
        }
        while(c.moveToNext())
        {
            FavRecipe fav = new FavRecipe(c.getString(0), c.getString(1), c.getString(2));
            favItems.add(fav);
            if(!c.moveToFirst())
            {
                FavRecipeController adapter = new FavRecipeController(getApplicationContext(), favItems);
                favList.setAdapter(adapter);
            }
        }

    }
}
