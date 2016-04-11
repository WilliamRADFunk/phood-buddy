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
        holder.birthYear = (EditText) findViewById(R.id.birthYear);
        holder.gender = (EditText) findViewById(R.id.gender);
        holder.weight = (EditText) findViewById(R.id.weight);
        holder.height1 = (EditText) findViewById(R.id.height1);
        holder.height2 = (EditText) findViewById(R.id.height2);
        holder.zipcode = (EditText) findViewById(R.id.zipcode);

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
            case R.id.allergies:
                // take to allergies page and save in profile sql db
                // then tke back to setup.
                break;
            case R.id.fullName:
                break;
            case R.id.birthYear:
                break;
            case R.id.gender:
                break;
            case R.id.weight:
                break;
            case R.id.height1:
                break;
            case R.id.height2:
                break;
            case R.id.zipcode:
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

