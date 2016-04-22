package com.phoodbuddy.phoodbuddy.Controllers;

import android.app.Activity;
import android.content.Intent;
import android.graphics.Bitmap;
import android.net.Uri;
import android.os.Bundle;
import android.support.v7.app.AppCompatActivity;
import android.util.Log;
import android.webkit.WebView;
import android.webkit.WebViewClient;
import android.widget.Toast;

import com.phoodbuddy.phoodbuddy.R;

/**
 * Created by Evan Glazer on 3/5/2016.
 */
public class LoginController extends AppCompatActivity {
    ViewHolder holder;
    String BASE_URL = "";
    String code;
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.logincontroller);
        holder.loginview = (WebView) findViewById(R.id.loginView);
        //authHolder();
    }

    class ViewHolder
    {
        WebView loginview;

    }

    public void authHolder()
    {
        try {
            holder.loginview.getSettings().setJavaScriptEnabled(true);
            holder.loginview.loadUrl(BASE_URL);
            holder.loginview.setWebViewClient(new WebViewClient()

            {
                boolean authComplete = false;
                Intent resultIntent = new Intent();

                @Override
                public void onPageStarted(WebView view, String url, Bitmap favicon) {
                    super.onPageStarted(view, url, favicon);

                }


                @Override
                public void onPageFinished(WebView view, String url) {
                    super.onPageFinished(view, url);

                    if (url.contains("?code=") && authComplete != true) {
                        Uri uri = Uri.parse(url);
                        code = uri.getQueryParameter("code");
                    }

                    else if (url.contains("error=access_denied")) {
                        Log.i("", "ACCESS_DENIED_HERE");
                        authComplete = true;
                        setResult(Activity.RESULT_CANCELED, resultIntent);
                        Toast.makeText(getApplicationContext(), "Error occured while trying to log you in", Toast.LENGTH_SHORT).show();
                    }
                }
            });
        }
        catch(Exception e)
        {

        }
    }

}
