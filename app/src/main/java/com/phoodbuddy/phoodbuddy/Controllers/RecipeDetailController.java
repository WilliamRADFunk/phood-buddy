package com.phoodbuddy.phoodbuddy.Controllers;

import android.content.Context;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.BaseAdapter;
import android.widget.ImageView;
import android.widget.ListView;
import android.widget.TextView;

import com.phoodbuddy.phoodbuddy.Models.RecipeDetail;
import com.phoodbuddy.phoodbuddy.R;

import java.util.ArrayList;
import java.util.List;

/**
 * Created by Evan Glazer on 3/15/2016.
 */
public class RecipeDetailController extends BaseAdapter {
    Context mContext;
    List<RecipeDetail> recipeList;
    LayoutInflater inflater;
    ViewHolder holder;
    public RecipeDetailController(Context c, List<RecipeDetail> data)
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
    public RecipeDetail getItem(int position) {
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
            convertView = inflater.inflate(R.layout.recipes_child, null);
            holder.foodName = (TextView) convertView.findViewById(R.id.foodName);
            holder.img = (ImageView) convertView.findViewById(R.id.food_recipeDetail);
            holder.serving = (TextView) convertView.findViewById(R.id.serving_recipeDetail);
            holder.carbs = (TextView) convertView.findViewById(R.id.carbs_recipeDetail);
            holder.cookingTime = (TextView) convertView.findViewById(R.id.cooking_recipeDetail);
            holder.prepTime = (TextView) convertView.findViewById(R.id.prep_recipeDetail);
            holder.ingredients = (ListView) convertView.findViewById(R.id.recipe_ingredients);

            convertView.setTag(holder);
        } else {
            holder = (ViewHolder) convertView.getTag();
        }

        //Picasso.with(mContext).load(recipeList.get(position).getImage()).into(holder.img);
        //holder.foodName.setText(recipeList.get(position).getName());

        return convertView;
    }

    public class ViewHolder{
        ImageView img;
        TextView foodName;
        TextView serving;
        TextView carbs;
        TextView cookingTime;
        TextView prepTime;
        ListView ingredients;

    }
}

