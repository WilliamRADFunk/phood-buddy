package com.phoodbuddy.phoodbuddy.Activities;

import android.support.v4.app.Fragment;
import android.os.Bundle;
import android.support.annotation.Nullable;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;

import com.phoodbuddy.phoodbuddy.R;

/**
 * Created by Evan on 4/14/2016.
 */
public class CustomSlide extends Fragment {

    @Nullable
    @Override
    public View onCreateView(LayoutInflater inflater, ViewGroup container, Bundle savedInstanceState) {
        View rootView = inflater.inflate(R.layout.intro_custom, container, false);

        return rootView;
    }
}