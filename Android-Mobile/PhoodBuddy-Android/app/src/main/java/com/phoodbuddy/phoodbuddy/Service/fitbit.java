package com.phoodbuddy.phoodbuddy.Service;

import android.annotation.SuppressLint;
import android.app.Activity;
import android.content.Intent;
import android.content.SharedPreferences;
import android.graphics.Bitmap;
import android.net.Uri;
import android.os.AsyncTask;
import android.os.Build;
import android.os.Bundle;
import android.os.StrictMode;
import android.preference.PreferenceManager;
import android.support.v7.app.AppCompatActivity;
import android.util.Base64;
import android.util.Log;
import android.view.View;
import android.webkit.HttpAuthHandler;
import android.webkit.WebView;
import android.webkit.WebViewClient;
import android.widget.ProgressBar;
import android.widget.Toast;
import android.widget.Toolbar;

import com.phoodbuddy.phoodbuddy.Interface.fitbitAPI;
import com.phoodbuddy.phoodbuddy.Models.Fitbit;
import com.phoodbuddy.phoodbuddy.R;
import com.phoodbuddy.phoodbuddy.Utilities.Globals;
import com.temboo.Library.Fitbit.OAuth.FinalizeOAuth;
import com.temboo.Library.Fitbit.OAuth.InitializeOAuth;
import com.temboo.core.TembooSession;

import java.io.UnsupportedEncodingException;
import java.util.HashMap;
import java.util.UUID;

import retrofit.Callback;
import retrofit.RestAdapter;
import retrofit.RetrofitError;
import retrofit.client.Response;
import twitter4j.User;

/**
 * Created by Evan Glazer on 3/26/2016.
 */

@SuppressLint("JavascriptInterface")
public class fitbit extends AppCompatActivity {

    private SharedPreferences sharedPreferences;
    private WebView webView;
    private ProgressBar circularProgressbar;
    public String secret;
    private String callbacks;
    private String oauth;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_fit_bit);

        sharedPreferences = PreferenceManager.getDefaultSharedPreferences(this);

        webView = (WebView) findViewById(R.id.webview1);
        webView.getSettings().setJavaScriptEnabled(true);
       // webView.getSettings().setUserAgentString("Android");
        webView.getSettings().setSupportZoom(true);
        webView.getSettings().setDomStorageEnabled(true);
        webViewHolder();
    }




    public void webViewHolder()
    {
        try {
            webView.getSettings().setJavaScriptEnabled(true);

            webView.loadUrl("https://www.fitbit.com/oauth2/authorize?client_id=227PST&redirect_uri=http%3A%2F%2Flocalhost%2F&response_type=code&scope=activity+nutrition+heartrate+location+nutrition+profile+settings+sleep+social+weight&state");
            webView.setWebViewClient(new WebViewClient()

            {

                boolean authComplete = false;
                Intent resultIntent = new Intent();

                @Override
                public void onPageStarted(WebView view, String url, Bitmap favicon) {
                    super.onPageStarted(view, url, favicon);

                }

                String authCode;

                @Override
                public void onPageFinished(WebView view, String url) {
                    super.onPageFinished(view, url);

                    if (url.contains("?code=") && authComplete != true) {
                        Uri uri = Uri.parse(url);
                        authCode = uri.getQueryParameter("code");
                        Log.i("", "CODE : " + authCode);
                        authComplete = true;
                        resultIntent.putExtra("code", authCode);
                        fitbit.this.setResult(Activity.RESULT_OK, resultIntent);
                        setResult(Activity.RESULT_CANCELED, resultIntent);
                        HashMap<String, String> map = new HashMap<String, String>();
                        // This test service takes the username "httpwatch" and a random
                        // password. Repeating a password can lead to failure, so we create
                        // a decently random one using UUID.
                        final String secret = Globals.CUSTOMER_SECRET;
                        String authorization = null;

                        webView.destroy();
                        RestAdapter adapter = new RestAdapter.Builder()
                                .setEndpoint("https://api.fitbit.com")
                                .build();
                        fitbitAPI api = adapter.create(fitbitAPI.class);
                        api.getToken("227PST","authorization_code", authCode, "http://localhost/", "", new Callback<Fitbit>() {
                            @Override
                            public void success(Fitbit tokens, Response response) {
                                StringBuffer buffer = new StringBuffer();
                                buffer.append(tokens);
                                Log.e("tokens", buffer.toString());



                            }

                            @Override
                            public void failure(RetrofitError error) {
                                //Toast.makeText(getApplicationContext(), "FAILURE" + error, Toast.LENGTH_LONG).show();
                                Log.d("post issue", "" + error);
                                //progressDialog.dismiss();
                            }
                        });

                        //Toast.makeText(getApplicationContext(), "Authorization Code is: " + authCode, Toast.LENGTH_SHORT).show();
                    } else if (url.contains("error=access_denied")) {
                        Log.i("", "ACCESS_DENIED_HERE");
                        resultIntent.putExtra("code", authCode);
                        authComplete = true;
                        setResult(Activity.RESULT_CANCELED, resultIntent);
                        Toast.makeText(getApplicationContext(), "Error occured while trying to log you in", Toast.LENGTH_SHORT).show();

                    }

                }
            });

        } catch (Exception e) {

        }
    }

    private void savePreferences(String key, String value) {
        SharedPreferences.Editor editor = sharedPreferences.edit();
        editor.putString(key, value).apply();
    }

}