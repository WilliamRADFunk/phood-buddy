package com.phoodbuddy.phoodbuddy.Fragments;

import android.content.Context;
import android.content.Intent;
import android.database.sqlite.SQLiteDatabase;
import android.os.Bundle;
import android.support.v7.app.AppCompatActivity;
import android.view.View;
import android.widget.ArrayAdapter;
import android.widget.Button;
import android.widget.EditText;
import android.widget.Spinner;
import android.widget.TextView;

import com.phoodbuddy.phoodbuddy.Activities.shopping_list;
import com.phoodbuddy.phoodbuddy.R;

/**
 * Created by Evan Glazer on 3/18/2016.
 */
public class shopping_list_detail extends AppCompatActivity {
    ViewHolder view;
    String[] spinnerData = new String[] {"oz", "cup"};
    SQLiteDatabase db;
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.shopping_list_details);
        setTitle("Shopping Item Detail");
        db=openOrCreateDatabase("ShoppingList", Context.MODE_PRIVATE, null);
        db.execSQL("CREATE TABLE IF NOT EXISTS shoppingList(item VARCHAR,quantity VARCHAR,serving VARCHAR);");

        Intent i = getIntent();
        final String itemName = i.getStringExtra("item");
        view = new ViewHolder();
        view.itemName = (TextView) findViewById(R.id.itemName);
        view.itemName.setText(itemName);

        view.quantity = (EditText) findViewById(R.id.quantityEdit);
        view.serving = (EditText) findViewById(R.id.servingEdit);
        view.servingMeasure = (Spinner) findViewById(R.id.servingSpinner);
        view.complete = (Button) findViewById(R.id.serving_complete);
        view.quanTxt = (TextView) findViewById(R.id.quantityText);
        view.serverTxt = (TextView) findViewById(R.id.ServingText);

        view.quantity.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                view.quanTxt.setVisibility(View.INVISIBLE);
            }
        });

        view.serving.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                view.serverTxt.setVisibility(View.INVISIBLE);
            }
        });
        ArrayAdapter<String> measureAdapter = new ArrayAdapter<String>(this,
                android.R.layout.simple_spinner_item, spinnerData);
        view.servingMeasure.setAdapter(measureAdapter);

        view.complete.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                if(!view.quantity.getText().equals("") && !view.serving.getText().equals(""))
                {
                    // send to data then back to shopping list
                    db.execSQL("INSERT INTO shoppingList VALUES('"+ itemName +"','"+view.quantity.getText()+
                            "','"+view.serving.getText() + " "+view.servingMeasure.getSelectedItem().toString()+"');");

                    Intent j = new Intent(shopping_list_detail.this, shopping_list.class);
                    startActivity(j);
                }
            }
        });
    }

    class ViewHolder{
        TextView itemName;
        TextView quanTxt;
        TextView serverTxt;
        EditText quantity;
        EditText serving;
        Spinner servingMeasure;
        Button complete;

    }
}
