package com.phoodbuddy.phoodbuddy.Activities;

import android.app.AlertDialog;
import android.app.ProgressDialog;
import android.content.Context;
import android.content.Intent;
import android.content.SharedPreferences;
import android.os.Bundle;
import android.support.v7.app.AppCompatActivity;
import android.util.Log;
import android.view.View;
import android.widget.Button;
import android.widget.EditText;
import android.widget.ImageView;
import android.widget.TextView;

import com.facebook.AccessToken;
import com.firebase.client.AuthData;
import com.firebase.client.Firebase;
import com.firebase.client.FirebaseError;
import com.phoodbuddy.phoodbuddy.R;
import com.phoodbuddy.phoodbuddy.Service.TwitterOAuthActivity;

import java.util.HashMap;
import java.util.Map;

/**
 * Created by Evan Glazer on 2/29/2016.
 */

public class login extends AppCompatActivity {
    private static final String TAG = "LOGIN";

         /* *************************************
     *              GENERAL                *
     ***************************************/
    /* TextView that is used to display information about the logged in user */
        TextView mLoggedInStatusTextView;

    /* A dialog that is presented until the Firebase authentication finished. */
        ProgressDialog mAuthProgressDialog;

    /* A reference to the Firebase */
        Firebase mFirebaseRef;

    /* Data from the authenticated user */
        AuthData mAuthData;

    /* Listener for Firebase session changes */
        Firebase.AuthStateListener mAuthStateListener;
    /* *************************************
     *              FACEBOOK               *
     ***************************************/
    /* The login button for Facebook */
      //  LoginButton mFacebookLoginButton;
    /* The callback manager for Facebook */
      //  CallbackManager mFacebookCallbackManager;
    /* Used to track user logging in/out off Facebook */
       // AccessTokenTracker mFacebookAccessTokenTracker;



    /* *************************************
     *              TWITTER                *
     ***************************************/
       final int RC_TWITTER_LOGIN = 2;

        Button mTwitterLoginButton;
        Button facebook;
        Button google;
        ImageView line1;
        ImageView line2;
        TextView or;
        EditText username;
        EditText password;
        TextView register;
    /* *************************************
     *              PASSWORD               *
     ***************************************/
        Button mPasswordLoginButton;

        Boolean firstTime = false;
        @Override
        protected void onCreate(Bundle savedInstanceState) {
            super.onCreate(savedInstanceState);
        /* Load the view and display it */
            setContentView(R.layout.login);
            setTitle("                           Login");

            SharedPreferences first;
            String text;
            first =getSharedPreferences("FirstTime", Context.MODE_PRIVATE);
            firstTime = Boolean.valueOf(first.getBoolean("firstTime", true));
            facebook = (Button)findViewById(R.id.mFacebookLoginButton);
            google = (Button)findViewById(R.id.mGoogleLoginButton);
            line1 = (ImageView) findViewById(R.id.line1);
            line2 = (ImageView) findViewById(R.id.line2);
            or = (TextView) findViewById(R.id.or);
            username = (EditText) findViewById(R.id.username);
            password = (EditText) findViewById(R.id.password);
            register = (TextView) findViewById(R.id.register);
        /* *************************************
         *                TWITTER              *
         ***************************************/
            mTwitterLoginButton = (Button) findViewById(R.id.mTwitterLoginButton);
            mTwitterLoginButton.setOnClickListener(new View.OnClickListener() {
                @Override
                public void onClick(View view) {
                    loginWithTwitter();
                }
            });

        /* *************************************
         *               PASSWORD              *
         ***************************************/
            mPasswordLoginButton = (Button) findViewById(R.id.login_with_password);
            mPasswordLoginButton.setOnClickListener(new View.OnClickListener() {
                @Override
                public void onClick(View view) {
                    //loginWithPassword();
                }
            });

        /* *************************************
         *               GENERAL               *
         ***************************************/
            mLoggedInStatusTextView = (TextView) findViewById(R.id.login_status);

        /* Create the Firebase ref that is used for all authentication with Firebase */
            mFirebaseRef = new Firebase(getResources().getString(R.string.firebase_url));

        /* Setup the progress dialog that is displayed later when authenticating with Firebase */
            mAuthProgressDialog = new ProgressDialog(this);
            mAuthProgressDialog.setTitle("Loading");
            mAuthProgressDialog.setMessage("Authenticating with Firebase...");
            mAuthProgressDialog.setCancelable(false);
            mAuthProgressDialog.show();

            mAuthStateListener = new Firebase.AuthStateListener() {
                @Override
                public void onAuthStateChanged(AuthData authData) {
                    mAuthProgressDialog.hide();
                    setAuthenticatedUser(authData);
                }
            };
        /* Check if the user is authenticated with Firebase already. If this is the case we can set the authenticated
         * user and hide hide any login buttons */
            mFirebaseRef.addAuthStateListener(mAuthStateListener);
        }

        @Override
        protected void onDestroy() {
            super.onDestroy();


            // if changing configurations, stop tracking firebase session.
            mFirebaseRef.removeAuthStateListener(mAuthStateListener);
        }

        /**
         * This method fires when any startActivityForResult finishes. The requestCode maps to
         * the value passed into startActivityForResult.
         */
        @Override
        public void onActivityResult(int requestCode, int resultCode, Intent data) {
            super.onActivityResult(requestCode, resultCode, data);
            Map<String, String> options = new HashMap<String, String>();
           if (requestCode == RC_TWITTER_LOGIN) {
                options.put("oauth_token", data.getStringExtra("oauth_token"));
                options.put("oauth_token_secret", data.getStringExtra("oauth_token_secret"));
                options.put("user_id", data.getStringExtra("user_id"));
                authWithFirebase("twitter", options);
            } else {
            /* Otherwise, it's probably the request by the Facebook login button, keep track of the session */
            }
        }

    @Override
    public void onBackPressed() {
        super.onBackPressed();
        Intent i = new Intent(login.this, login.class);
        startActivity(i);
    }

    /**
         * This method will attempt to authenticate a user to firebase given an oauth_token (and other
         * necessary parameters depending on the provider)
         */
        private void authWithFirebase(final String provider, Map<String, String> options) {
            if (options.containsKey("error")) {
                showErrorDialog(options.get("error"));
            } else {
                mAuthProgressDialog.show();
                if (provider.equals("twitter")) {
                    // if the provider is twitter, we pust pass in additional options, so use the options endpoint
                    mFirebaseRef.authWithOAuthToken(provider, options, new AuthResultHandler(provider));
                } else {
                    // if the provider is not twitter, we just need to pass in the oauth_token
                    mFirebaseRef.authWithOAuthToken(provider, options.get("oauth_token"), new AuthResultHandler(provider));
                }
            }
        }

        /**
         * Once a user is logged in, take the mAuthData provided from Firebase and "use" it.
         */
        private void setAuthenticatedUser(AuthData authData) {
            if (authData != null) {
            /* Hide all the login buttons */
                mTwitterLoginButton.setVisibility(View.GONE);
                facebook.setVisibility(View.GONE);
                or.setVisibility(View.GONE);
                google.setVisibility(View.GONE);
                line1.setVisibility(View.GONE);
                line2.setVisibility(View.GONE);
                username.setVisibility(View.GONE);
                password.setVisibility(View.GONE);
                register.setVisibility(View.GONE);
                mPasswordLoginButton.setVisibility(View.GONE);
                mLoggedInStatusTextView.setVisibility(View.VISIBLE);
            /* show a provider specific status text */
                String name = null;
                if (authData.getProvider().equals("facebook")
                        || authData.getProvider().equals("twitter")) {
                    name = (String) authData.getProviderData().get("displayName");
                } else if (authData.getProvider().equals("password")) {
                    name = authData.getUid();
                } else {
                    Log.e(TAG, "Invalid provider: " + authData.getProvider());
                }
                if (name != null) {
                    mLoggedInStatusTextView.setText("Logged in as " + name + " (" + authData.getProvider() + ")");
                   if(firstTime) {
                       SharedPreferences sharedpreferences = getSharedPreferences("FirstTime", Context.MODE_PRIVATE);
                       SharedPreferences.Editor editor = sharedpreferences.edit();
                       editor.putBoolean("firsTime", false);
                       editor.commit();

                       Intent i = new Intent(login.this, setup.class);
                       startActivity(i);
                   }
                    else
                   {
                       Intent i = new Intent(login.this, dashboard.class);
                       startActivity(i);
                   }
                   }
            } else {
            /* No authenticated user show all the login buttons */
                mTwitterLoginButton.setVisibility(View.VISIBLE);
                mPasswordLoginButton.setVisibility(View.VISIBLE);
                mLoggedInStatusTextView.setVisibility(View.GONE);
            }
            this.mAuthData = authData;
        /* invalidate options menu to hide/show the logout button */
            supportInvalidateOptionsMenu();
        }

        /**
         * Show errors to users
         */
        private void showErrorDialog(String message) {
            new AlertDialog.Builder(this)
                    .setTitle("Error")
                    .setMessage(message)
                    .setPositiveButton(android.R.string.ok, null)
                    .setIcon(android.R.drawable.ic_dialog_alert)
                    .show();
        }

        /**
         * Utility class for authentication results
         */
        private class AuthResultHandler implements Firebase.AuthResultHandler {

            private final String provider;

            public AuthResultHandler(String provider) {
                this.provider = provider;
            }

            @Override
            public void onAuthenticated(AuthData authData) {
                mAuthProgressDialog.hide();
                Log.i(TAG, provider + " auth successful");
                setAuthenticatedUser(authData);
            }


            @Override
            public void onAuthenticationError(FirebaseError firebaseError) {
                mAuthProgressDialog.hide();
                showErrorDialog(firebaseError.toString());
            }
        }

    /* ************************************
     *             FACEBOOK               *
     **************************************
     */
        private void onFacebookAccessTokenChange(AccessToken token) {
            if (token != null) {
                mAuthProgressDialog.show();
                mFirebaseRef.authWithOAuthToken("facebook", token.getToken(), new AuthResultHandler("facebook"));
            } else {
                // Logged out of Facebook and currently authenticated with Firebase using Facebook, so do a logout
                if (this.mAuthData != null && this.mAuthData.getProvider().equals("facebook")) {
                    mFirebaseRef.unauth();
                    setAuthenticatedUser(null);
                }
            }
        }


    /* ************************************
     *               TWITTER              *
     **************************************
     */
        private void loginWithTwitter() {
            startActivityForResult(new Intent(this, TwitterOAuthActivity.class), RC_TWITTER_LOGIN);
        }


    }


