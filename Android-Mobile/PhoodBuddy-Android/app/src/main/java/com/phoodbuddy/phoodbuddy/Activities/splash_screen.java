package com.phoodbuddy.phoodbuddy.Activities;

import android.content.Context;
import android.content.Intent;
import android.database.Cursor;
import android.database.sqlite.SQLiteDatabase;
import android.os.Bundle;
import android.support.v7.app.AppCompatActivity;

import com.phoodbuddy.phoodbuddy.R;
/**
 * Created by Evan Glazer on 3/15/2016.
 */
public class splash_screen extends AppCompatActivity {

    SQLiteDatabase db;
    Cursor c;
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.splash);
        db=openOrCreateDatabase("Profile", Context.MODE_PRIVATE, null);
        db.execSQL("CREATE TABLE IF NOT EXISTS profile(name VARCHAR,birthday VARCHAR,gender TEXT,weight TEXT,height TEXT,zipcode TEXT);");
        // check for login saved in db, if so then take user to dashboard
        // if not then bring to login activity

        new Thread(new Runnable() {
            @Override
            public void run() {
                try {
                    Thread.sleep(3000);
                    c = db.rawQuery("SELECT * FROM profile", null);
                    if (c.getCount() > 0) {
                        Intent i = new Intent(splash_screen.this, dashboard.class);
                        startActivity(i);
                    } else {
                        Intent i = new Intent(splash_screen.this, intro.class);
                        startActivity(i);
                    }
                    } catch (InterruptedException e) {
                    e.printStackTrace();
                }
            }
        }).start();

    }


}
