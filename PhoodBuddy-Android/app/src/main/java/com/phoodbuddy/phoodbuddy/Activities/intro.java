package com.phoodbuddy.phoodbuddy.Activities;

import android.content.Context;
import android.content.Intent;
import android.content.SharedPreferences;
import android.graphics.Color;
import android.os.Bundle;
import android.support.v4.app.Fragment;
import android.view.View;
import android.widget.Button;
import android.widget.EditText;
import android.widget.Toast;

import com.phoodbuddy.phoodbuddy.R;
import com.phoodbuddy.phoodbuddy.Service.fitbit;
import com.vlonjatg.android.apptourlibrary.AppTour;
import com.vlonjatg.android.apptourlibrary.MaterialSlide;

/**
 * Created by Evan Glazer on 4/14/2016.
 */
public class intro extends AppTour {

        Boolean firstTime = false;
        SharedPreferences first;
        @Override
        public void init(Bundle savedInstanceState) {
                first =getSharedPreferences("FirstTime", Context.MODE_PRIVATE);
                firstTime = Boolean.valueOf(first.getBoolean("firstTime", true));

                if(firstTime) {
                        int firstColor = Color.parseColor("#3EC1C1");
                        int secondColor = Color.parseColor("#62A4B5");
                        int customSlideColor = Color.parseColor("#008040");

                        //Create pre-created fragments
                        Fragment firstSlide = MaterialSlide.newInstance(R.drawable.charge, "Phood Buddy will integrate with Fitbit",
                                "Get Fitbit data to go along with your daily meals!", Color.WHITE, Color.WHITE);

                        // image of recipe list
                        Fragment secondSlide = MaterialSlide.newInstance(R.drawable.target, "Phood Buddy will be the your food friend",
                                "Suggesting recipes catered to your unique taste profile and health conditions.", Color.WHITE, Color.WHITE);


                        //Add slides
                        addSlide(firstSlide, firstColor);
                        addSlide(secondSlide, secondColor);

                        //Custom slide
                        addSlide(new CustomSlide(), customSlideColor);

                        //Customize tour
                        setSkipButtonTextColor(Color.WHITE);
                        setNextButtonColorToWhite();
                        setDoneButtonTextColor(Color.WHITE);


                }
                else
                {
                        Intent i = new Intent(intro.this, login.class);
                        startActivity(i);
                }



        }


        @Override
        public void onSkipPressed() {
                //Toast.makeText(this, "Skip", Toast.LENGTH_SHORT).show();

                //Do something after clicking Skip button.
                //E.x: Go to the sign up slide.
                setCurrentSlide(3);
        }

        @Override
        public void onDonePressed() {
                Intent i = new Intent(intro.this, login.class);
                startActivity(i);
                finish();

        }

}