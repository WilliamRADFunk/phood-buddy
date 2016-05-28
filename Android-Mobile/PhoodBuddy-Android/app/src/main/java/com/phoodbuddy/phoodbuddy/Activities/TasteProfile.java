package com.phoodbuddy.phoodbuddy.Activities;

import android.graphics.Color;
import android.os.Bundle;
import android.support.v7.app.AppCompatActivity;

import com.phoodbuddy.phoodbuddy.R;

import org.eazegraph.lib.charts.PieChart;
import org.eazegraph.lib.models.PieModel;

/**
 * Created by Evan Glazer on 4/11/2016.
 */
public class TasteProfile extends AppCompatActivity {
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.taste_profile);
        PieChart mPieChart = (PieChart) findViewById(R.id.piechart);

        mPieChart.addPieSlice(new PieModel("Bitter", 3, Color.parseColor("#FE6DA8")));
        mPieChart.addPieSlice(new PieModel("Salty", 2, Color.parseColor("#56B7F1")));
        mPieChart.addPieSlice(new PieModel("Sour", 4, Color.parseColor("#CDA67F")));
        mPieChart.addPieSlice(new PieModel("Spicy", 2, Color.parseColor("#FED70E")));
        mPieChart.addPieSlice(new PieModel("Sweet", 1, Color.parseColor("#FED70E")));

        mPieChart.startAnimation();
    }
}
