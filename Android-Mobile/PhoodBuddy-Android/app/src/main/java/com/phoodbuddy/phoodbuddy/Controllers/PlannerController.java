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

import com.phoodbuddy.phoodbuddy.Models.Meals;
import com.phoodbuddy.phoodbuddy.R;
import com.squareup.picasso.Picasso;

import java.util.ArrayList;
import java.util.List;

/**
 * Created by Evan Glazer on 3/15/2016.
 */
public class PlannerController extends  BaseAdapter{
    Context mContext;
    List<Meals> mealsList;
    LayoutInflater inflater;
    ViewHolder holder;

    public PlannerController (Context c, List<Meals> data) {
        mealsList = new ArrayList<>();
        mContext = c;
        mealsList = data;
        inflater = LayoutInflater.from(mContext);

    }

    @Override
    public int getCount() {
        return mealsList.size();
    }

    @Override
    public Meals getItem(int position) {
        return mealsList.get(position);
    }

    @Override
    public long getItemId(int position) {
        return 0;
    }

    @Override
    public View getView(int position, View convertView, ViewGroup parent) {
        holder = new ViewHolder();
        if (convertView == null) {
            convertView = inflater.inflate(R.layout.planner_child, null);
            holder.name = (TextView) convertView.findViewById(R.id.planner_name);
            holder.img = (ImageView) convertView.findViewById(R.id.planner_image);
            holder.type = (TextView) convertView.findViewById(R.id.planner_type);
            convertView.setTag(holder);
        } else {
            holder = (ViewHolder) convertView.getTag();
        }
        if (mealsList.size() == 0) {
            Toast.makeText(mContext, "You have no meals set :/", Toast.LENGTH_LONG).show();
        } else {
            Picasso.with(mContext).load(mealsList.get(position).getImage()).into(holder.img);
            holder.name.setText(mealsList.get(position).getName());
            holder.type.setText(mealsList.get(position).getType());
        }
        holder.type.setTextColor(Color.parseColor("#000000"));
        holder.name.setTextColor(Color.parseColor("#000000"));
        return convertView;
    }


    public class ViewHolder{
        ImageView img;
        TextView name;
        TextView type;
    }
}
