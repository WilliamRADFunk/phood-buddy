package com.phoodbuddy.phoodbuddy.Activities;

import android.content.Intent;
import android.os.Bundle;
import android.support.v7.app.AppCompatActivity;
import android.view.View;
import android.widget.Button;
import android.widget.EditText;

import com.phoodbuddy.phoodbuddy.R;
import com.phoodbuddy.phoodbuddy.Service.fitbit;

/**
 * Created by Evan Glazer on 2/29/2016.
 */
public class setup extends AppCompatActivity {
    ViewHolder holder;
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        holder = new ViewHolder();
        super.onCreate(savedInstanceState);
        setContentView(R.layout.setup);
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
        holder.gender = (EditText) findViewById(R.id.gender);
        holder.gender.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                holder.gender.setText("");
            }
        });
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

        // set up onclick listeners, then clear txt

    }

    public void onClick(View v)
    {
        switch(v.getId())
        {
            case R.id.next:
                // takes to dashboard
                Intent i = new Intent(setup.this, dashboard.class);
                startActivity(i);
                break;
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
        EditText gender;
        EditText weight;
        EditText height1;
        EditText height2;
        EditText zipcode;


    }
}

