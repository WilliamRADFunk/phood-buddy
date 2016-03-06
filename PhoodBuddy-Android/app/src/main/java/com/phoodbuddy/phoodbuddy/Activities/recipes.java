package com.phoodbuddy.phoodbuddy.Activities;

import android.content.Context;
import android.os.Bundle;
import android.support.v7.app.AppCompatActivity;
import com.dexafree.materialList.view.IMaterialView;
import com.dexafree.materialList.view.MaterialListView;
import com.phoodbuddy.phoodbuddy.R;

/**
 * Created by Evan Glazer on 2/29/2016.
 */
public class recipes extends AppCompatActivity {
    private Context mContext;
    private MaterialListView mListView;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.recipe_list);

        mContext = this;
        mListView = (MaterialListView) findViewById(R.id.material_listview);
        mListView.setCardAnimation(MaterialListView.CardAnimation.SWING_BOTTOM_IN);

        /*
        // to add card
        Card card = new SmallImageCard();
        card.setDescription(description);
        card.setTitle(title);
        card.setDrawable(R.drawable.ic_launcher);

        mListView.add(card);
         */
    }


}
