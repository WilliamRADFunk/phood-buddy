package com.phoodbuddy.phoodbuddy.Activities;

import android.content.Context;
import android.content.Intent;
import android.database.sqlite.SQLiteDatabase;
import android.os.Bundle;
import android.support.v7.app.AppCompatActivity;
import android.view.View;
import android.widget.AdapterView;
import android.widget.ArrayAdapter;
import android.widget.Button;
import android.widget.EditText;
import android.widget.Spinner;
import android.widget.Toast;

import com.phoodbuddy.phoodbuddy.R;
import com.phoodbuddy.phoodbuddy.Service.fitbit;

/**
 * Created by Evan Glazer on 2/29/2016.
 */
public class setup extends AppCompatActivity {
    ViewHolder holder;
    SQLiteDatabase db;
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        holder = new ViewHolder();
        super.onCreate(savedInstanceState);
        setContentView(R.layout.setup);
        db=openOrCreateDatabase("Profile", Context.MODE_PRIVATE, null);
        db.execSQL("CREATE TABLE IF NOT EXISTS profile(name VARCHAR,birthday VARCHAR,gender TEXT,weight TEXT,height TEXT,zipcode TEXT);");
        String[] gender = new String[]{"Choose Gender:","male","female"};

        holder.next = (Button) findViewById(R.id.next);
        holder.fitbit = (Button) findViewById(R.id.fitbit);
        holder.allergies = (Button) findViewById(R.id.allergies);

        holder.fullName = (EditText) findViewById(R.id.fullName);
        holder.fullName.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                holder.fullName.setText("");
            }
        });
        holder.birthYear = (EditText) findViewById(R.id.birthYear);
        holder.birthYear.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                holder.birthYear.setText("");
            }
        });
        holder.gender = (Spinner) findViewById(R.id.gender);

        holder.weight = (EditText) findViewById(R.id.weight);
        holder.weight.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                holder.weight.setText("");
            }
        });
        holder.height1 = (EditText) findViewById(R.id.height1);
        holder.height1.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                holder.height1.setText("");
            }
        });
        holder.height2 = (EditText) findViewById(R.id.height2);
        holder.height2.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                holder.height2.setText("");
            }
        });
        holder.zipcode = (EditText) findViewById(R.id.zipcode);
        holder.zipcode.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                holder.zipcode.setText("");
            }
        });
        ArrayAdapter<String> adapter = new ArrayAdapter<String>(this,
                R.layout.spinner_item, gender);
        holder.gender.setAdapter(adapter);
        // set up onclick listeners, then clear txt
        holder.gender.setOnItemSelectedListener(new AdapterView.OnItemSelectedListener() {
            @Override
            public void onItemSelected(AdapterView<?> parent, View view, int position, long id) {

            }

            @Override
            public void onNothingSelected(AdapterView<?> parent) {

            }
        });

        holder.next.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                // takes to dashboard
                if(!holder.fullName.getText().equals("Full Name")&!holder.birthYear.getText().equals("Birth Year")&&!holder.gender.getSelectedItem().toString().equals("Choose Gender:")
                        && !holder.weight.getText().equals("Weight (lbs.)") && !holder.height1.getText().equals("Height (ft.)")
                        && !holder.height2.getText().equals("Height (in.)")&&!holder.zipcode.getText().equals("Zipcode (optional)")) {
                    Intent i = new Intent(setup.this, dashboard.class);
                    db.execSQL("INSERT INTO profile VALUES('" + holder.fullName.getText().toString() + "','" + holder.birthYear.getText().toString() +
                            "','" + holder.gender.getSelectedItem().toString()+ "','" + holder.weight.getText().toString()+ "','" + holder.height1.getText().toString()
                            + holder.height2.getText().toString() + "','" + holder.zipcode.getText().toString() + "');");
                    startActivity(i);
                }
                else
                {
                    Toast.makeText(getApplicationContext(), "Please make sure you have everything filled in", Toast.LENGTH_LONG).show();
                }
            }
        });
    }
    public void onClick(View v)
    {
        switch(v.getId())
        {

            case R.id.fitbit:
                Intent j = new Intent(setup.this, fitbit.class);
                startActivity(j);
                break;
        }

    }


    class ViewHolder
    {
        Button next;
        Button fitbit;
        Button allergies;
        EditText fullName;
        EditText birthYear;
        Spinner gender;
        EditText weight;
        EditText height1;
        EditText height2;
        EditText zipcode;


    }
}

