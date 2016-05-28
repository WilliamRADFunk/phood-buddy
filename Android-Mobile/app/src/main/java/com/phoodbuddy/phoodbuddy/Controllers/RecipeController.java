package com.phoodbuddy.phoodbuddy.Controllers;

import android.content.Context;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.BaseAdapter;
import android.widget.ImageView;
import android.widget.TextView;

import com.phoodbuddy.phoodbuddy.Models.Recipe;
import com.phoodbuddy.phoodbuddy.R;
import com.squareup.picasso.Picasso;

import java.util.ArrayList;
import java.util.List;

/**
 * Created by Evan Glazer on 3/5/2016.
 */
public class RecipeController extends BaseAdapter {

    Context mContext;
    List<Recipe> recipeList;
    LayoutInflater inflater;
    ViewHolder holder;
    public RecipeController(Context c, List<Recipe> data)
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
    public Recipe getItem(int position) {
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
            holder.img = (ImageView) convertView.findViewById(R.id.imageView4);
            holder.description = (TextView) convertView.findViewById(R.id.description);
            convertView.setTag(holder);
        } else {
            holder = (ViewHolder) convertView.getTag();
        }

        Picasso.with(mContext).load(recipeList.get(position).getImage()).into(holder.img);
        holder.foodName.setText(recipeList.get(position).getName());
        holder.description.setText(recipeList.get(position).getDescription());

        return convertView;
    }

    public class ViewHolder{
        ImageView img;
        TextView description;
        TextView foodName;
    }
}
