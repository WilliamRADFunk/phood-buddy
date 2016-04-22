package com.phoodbuddy.phoodbuddy.Activities;

import android.content.Context;
import android.content.Intent;
import android.database.sqlite.SQLiteDatabase;
import android.os.Bundle;
import android.support.v7.app.AppCompatActivity;
import android.util.Log;
import android.view.View;
import android.widget.AdapterView;
import android.widget.ArrayAdapter;
import android.widget.Button;
import android.widget.DatePicker;
import android.widget.Spinner;
import android.widget.Toast;

import com.phoodbuddy.phoodbuddy.R;

import java.util.ArrayList;
import java.util.List;

/**
 * Created by Evan Glazer on 4/16/2016.
 */
public class dashboard_custom extends AppCompatActivity {
    DatePicker datePicker;
    Spinner spinner;
    Button save;
    String type;
    SQLiteDatabase db1;
    Long id;
    String image;
    String foodName;
    String[] list = new String[]{"Breakfest", "Lunch", "Dinner"};
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.dashboard_custom);
        db1=openOrCreateDatabase("Meals", Context.MODE_PRIVATE, null);
        db1.execSQL("CREATE TABLE IF NOT EXISTS mealList(image VARCHAR,name VARCHAR,id TEXT,type TEXT,date TEXT);");
        Bundle i = getIntent().getExtras();
        id = i.getLong("id");
        foodName = i.getString("foodName");
        image = i.getString("url");
        datePicker = (DatePicker) findViewById(R.id.datePicker);
        spinner = (Spinner) findViewById(R.id.spinner);
        ArrayAdapter<String> adapter = new ArrayAdapter<String>(this,
                android.R.layout.simple_spinner_item, list);
        save = (Button) findViewById(R.id.button);
        spinner.setAdapter(adapter);
        spinner.setOnItemSelectedListener(new AdapterView.OnItemSelectedListener() {
            @Override
            public void onItemSelected(AdapterView<?> parent, View view, int position, long id) {
                type=spinner.getSelectedItem().toString();
            }

            @Override
            public void onNothingSelected(AdapterView<?> parent) {

            }
        });


        save.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                Intent i = new Intent(dashboard_custom.this, dashboard.class);
                int month = datePicker.getDayOfMonth();
                int day = datePicker.getMonth();
                int year = datePicker.getYear();
                String date = year + "-" + day + "-" + month;
                Log.e("DashBoard_Custom:", date);
                if (!type.equals("")) {
                    db1.execSQL("INSERT INTO mealList VALUES('" + image + "','" + foodName +
                            "','" + id + "','" + type + "','" + date + "');");

                    startActivity(i);
                } else {
                    Toast.makeText(getApplicationContext(), "Please select from the items!", Toast.LENGTH_LONG).show();
                }
            }
        });

    }
}
