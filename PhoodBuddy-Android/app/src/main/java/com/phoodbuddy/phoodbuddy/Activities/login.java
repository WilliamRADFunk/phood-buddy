package com.phoodbuddy.phoodbuddy.Activities;

import android.content.Intent;
import android.os.Bundle;
import android.support.v7.app.AppCompatActivity;
import android.view.View;
import android.widget.Button;

import com.phoodbuddy.phoodbuddy.R;

/**
 * Created by Evan Glazer on 2/29/2016.
 */
public class login extends AppCompatActivity {

   Button login;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.login);

/*
        final ImageView img = (ImageView) findViewById(R.id.pattern);
        img.setScaleType(ImageView.ScaleType.MATRIX);
        //img.startAnimation(slideUp);
        Bitmap bitmap = BitmapFactory.decodeResource(getResources(), R.drawable.pattern);
        BitmapDrawable drawable = new BitmapDrawable(getResources(), bitmap) {
            @Override
            public void draw(Canvas canvas) {
                super.draw(canvas);
                canvas.drawBitmap(getBitmap(), 0, getIntrinsicHeight(), null);
            }
        };

        img.setImageDrawable(drawable);
        img.setScaleType(ImageView.ScaleType.MATRIX);

        ValueAnimator animator = ValueAnimator.ofFloat(1);
        animator.addUpdateListener(new ValueAnimator.AnimatorUpdateListener() {
            private Matrix matrix = new Matrix();
            @Override
            public void onAnimationUpdate(ValueAnimator animator) {
                matrix.reset();
                int height = img.getDrawable().getIntrinsicHeight();
                float translate = -height * animator.getAnimatedFraction();
                matrix.postTranslate(0, translate);
                float width =img.getDrawable().getIntrinsicWidth();
                float scale = img.getWidth() / width;
                matrix.postScale(scale, scale);
                img.setImageMatrix(matrix);
            }
        });

        animator.setInterpolator(new LinearInterpolator());
        animator.setRepeatCount(ValueAnimator.INFINITE);
        animator.setRepeatMode(ValueAnimator.RESTART);
        animator.setDuration(5000);
        animator.start();
*/

        login = (Button) findViewById(R.id.login);
        login.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                Intent i = new Intent(login.this, setup.class);
                startActivity(i);
            }
        });

    }
}
