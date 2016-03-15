package com.phoodbuddy.phoodbuddy.Activities;

import android.content.Intent;
import android.os.Bundle;
import android.support.v7.app.AppCompatActivity;
import android.view.View;
import android.widget.ImageButton;
import android.widget.ImageView;

import com.phoodbuddy.phoodbuddy.R;

/**
 * Created by Evan Glazer on 2/29/2016.
 */
public class login extends AppCompatActivity {
    ViewHolder holder;
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.login);
        holder = new ViewHolder();

        holder.facebook = (ImageView) findViewById(R.id.facebook_signin);
        holder.twitter = (ImageView) findViewById(R.id.twitter_signin);
        holder.google = (ImageView) findViewById(R.id.google_signin);
        holder.register = (ImageButton) findViewById(R.id.connect_signin);

    }

    public void onClick(View v) {

        if(v==holder.facebook)
        {
            Intent intent = new Intent(login.this, setup.class);
            startActivity(intent);
        }
        if(v==holder.twitter)
        {

        }
        if(v==holder.google)
        {

        }
        if(v==holder.register)
        {

        }

    }
    class ViewHolder
    {
        ImageView facebook;
        ImageView twitter;
        ImageView google;
        ImageButton register;
    }

}

