package com.phoodbuddy.phoodbuddy.Activities;

import android.graphics.Color;
import android.os.Bundle;
import android.support.v4.app.Fragment;
import android.widget.Toast;

import com.phoodbuddy.phoodbuddy.R;
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

                Fragment secondSlide = MaterialSlide.newInstance(R.drawable.charge, "Phood Buddy will be the user's food-finding friend",
                        "Suggesting recipes catered to their unique taste profile and health conditions.", Color.WHITE, Color.WHITE);

                Fragment thirdSlide = MaterialSlide.newInstance(R.drawable.charge, "Phood Buddy can help you go food shopping!",
                        "Allows users to add or delete items on weekly grocery list.", Color.WHITE, Color.WHITE);

                //Add slides
                addSlide(firstSlide, firstColor);
                addSlide(secondSlide, secondColor);
                addSlide(thirdSlide, secondColor);

                //Custom slide
                addSlide(new CustomSlide(), customSlideColor);

                //Customize tour
                setSkipButtonTextColor(Color.WHITE);
                setNextButtonColorToWhite();
                setDoneButtonTextColor(Color.WHITE);
        }


        @Override
        public void onSkipPressed() {
                Toast.makeText(this, "Skip", Toast.LENGTH_SHORT).show();

                //Do something after clicking Skip button.
                //E.x: Go to the sign up slide.
                setCurrentSlide(4);
        }

        @Override
        public void onDonePressed() {
                Toast.makeText(this, "Done", Toast.LENGTH_SHORT).show();

                //Do something after clicking Done button.
                //E.x: Finish the intro.
                finish();
        }
}