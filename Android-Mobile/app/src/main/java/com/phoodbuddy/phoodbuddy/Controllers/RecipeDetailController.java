package com.phoodbuddy.phoodbuddy.Controllers;

import android.content.Context;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.BaseAdapter;
import android.widget.ListView;
import android.widget.TextView;

import com.phoodbuddy.phoodbuddy.R;

import java.util.ArrayList;
import java.util.List;

/**
 * Created by Evan Glazer on 3/15/2016.
 */
public class RecipeDetailController extends BaseAdapter {
    Context mContext;
    List<String> recipeList;
    LayoutInflater inflater;
    ViewHolder holder;
    public RecipeDetailController(Context c, List<String> data)
    {
        recipeList = new ArrayList<>();
        mContext = c;
        recipeList = data;
        inflater = LayoutInflater.from(mContext);

    }

    @Override
    public int getCount() {
        return recipeList.size();
    }

    @Override
    public String getItem(int position) {
        return recipeList.get(position);
    }

    @Override
    public long getItemId(int position) {
        return 0;
    }

    @Override
    public View getView(int position, View convertView, ViewGroup parent) {
        holder = new ViewHolder();
        if(convertView == null)
        {
            convertView = inflater.inflate(R.layout.recipe_detail_child, null);

            holder.ingredient = (TextView) convertView.findViewById(R.id.ingredient_recipe);
            holder.step = (TextView) convertView.findViewById(R.id.steps_detail);
            convertView.setTag(holder);
        } else {
            holder = (ViewHolder) convertView.getTag();
        }
        holder.step.setText("Step"+ " "+ (position+1));
        holder.ingredient.setText(recipeList.get(position).toString());

        //Picasso.with(mContext).load(recipeList.get(position).getImage()).into(holder.img);
        //holder.foodName.setText(recipeList.get(position).getName());

        return convertView;
    }

    public class ViewHolder{
        ListView ingredients;
        TextView ingredient;
        TextView step;
    }
}

