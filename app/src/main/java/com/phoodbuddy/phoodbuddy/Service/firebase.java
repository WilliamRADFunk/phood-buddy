package com.phoodbuddy.phoodbuddy.Service;

import android.app.Application;

import com.crashlytics.android.Crashlytics;
import com.facebook.FacebookSdk;
import com.firebase.client.Firebase;
import io.fabric.sdk.android.Fabric;
/**
 * Created by Evan Glazer on 2/29/2016.
 */
public class firebase extends Application {

    @Override
    public void onCreate() {
        super.onCreate();
        Fabric.with(this, new Crashlytics());
        Firebase.setAndroidContext(this);
        FacebookSdk.sdkInitialize(this);
    }


}
