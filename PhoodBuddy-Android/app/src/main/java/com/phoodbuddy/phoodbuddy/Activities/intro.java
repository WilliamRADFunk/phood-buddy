package com.phoodbuddy.phoodbuddy.Activities;

import android.content.Intent;
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

        @Override
        public void init(Bundle savedInstanceState) {
                int firstColor = Color.parseColor("#0097A7");
                int secondColor = Color.parseColor("#FFA000");
                int customSlideColor = Color.parseColor("#4585A1");

                //Create pre-created fragments
                Fragment firstSlide = MaterialSlide.newInstance(R.drawable.charge, "Integrate with Fitbit",
                        "Get Fitbit data to go along with your daily meals!", Color.WHITE, Color.WHITE);

                // image of recipe list
                Fragment secondSlide = MaterialSlide.newInstance(R.drawable.charge, "Phood Buddy will be the your food-finding friend",
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


        @Override
        public void onSkipPressed() {
                //Toast.makeText(this, "Skip", Toast.LENGTH_SHORT).show();

                //Do something after clicking Skip button.
                //E.x: Go to the sign up slide.
                setCurrentSlide(3);
        }

        @Override
        public void onDonePressed() {
                Intent i = new Intent(intro.this, setup.class);
                startActivity(i);
                finish();

        }

}