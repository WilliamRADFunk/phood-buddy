package com.phoodbuddy.phoodbuddy.Controllers;

import android.content.Context;
import android.graphics.Color;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.BaseAdapter;
import android.widget.ImageView;
import android.widget.TextView;
import android.widget.Toast;

import com.phoodbuddy.phoodbuddy.Models.FavRecipe;
import com.phoodbuddy.phoodbuddy.R;
import com.squareup.picasso.Picasso;

import java.util.ArrayList;
import java.util.List;

/**
 * Created by Evan Glazer on 4/13/2016.
 */
public class FavRecipeController extends BaseAdapter {

    Context mContext;
    List<FavRecipe> favRecipes;
    LayoutInflater inflater;
    ViewHolder holder;

    public FavRecipeController(Context c, List<FavRecipe> data) {
        favRecipes = new ArrayList<>();
        mContext = c;
        favRecipes = data;
        inflater = LayoutInflater.from(mContext);

    }

    @Override
    public int getCount() {
        return favRecipes.size();
    }

    @Override
    public FavRecipe getItem(int position) {
        return favRecipes.get(position);
    }

    @Override
    public long getItemId(int position) {
        return 0;
    }

    @Override
    public View getView(int position, View convertView, ViewGroup parent) {
        holder = new ViewHolder();
        if (convertView == null) {
            convertView = inflater.inflate(R.layout.fav_recipes_child, null);
            holder.name = (TextView) convertView.findViewById(R.id.fav_name);
            holder.img = (ImageView) convertView.findViewById(R.id.fav_image);
            convertView.setTag(holder);
        } else {
            holder = (ViewHolder) convertView.getTag();
        }
        if (favRecipes.size() == 0) {
            Toast.makeText(mContext, "You have no favorite recipes :/", Toast.LENGTH_LONG).show();
        } else {
            Picasso.with(mContext).load(favRecipes.get(position).getImage()).into(holder.img);
            holder.name.setText(favRecipes.get(position).getName());
        }
        holder.name.setTextColor(Color.parseColor("#000000"));
        return convertView;
    }


    public class ViewHolder{
        ImageView img;
        TextView name;
    }
}
