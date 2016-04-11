package com.phoodbuddy.phoodbuddy.Controllers;

import android.content.Context;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.BaseAdapter;
import android.widget.TextView;

import com.phoodbuddy.phoodbuddy.Models.shopping_list_Model;
import com.phoodbuddy.phoodbuddy.R;

import java.util.List;

/**
 * Created by Evan Glazer on 3/15/2016.
 */
public class ShoppingListController extends BaseAdapter {

    List<shopping_list_Model> list;
    Context mContext;
    LayoutInflater inflater;

    public ShoppingListController(Context c, List<shopping_list_Model> model) {
        mContext = c;
        list = model;
        inflater = LayoutInflater.from(mContext);

    }

    public ShoppingListController() {

    }

    class ViewHolder {
        TextView itemName;
        TextView quantity;
        TextView serving;

    }

    @Override
    public int getCount() {
        return list.size();
    }

    @Override
    public Object getItem(int position) {
        return list.get(position);
    }

    @Override
    public long getItemId(int position) {
        return position;
    }

    public String getName(int position)
    {
        return list.get(position).getItemName();
    }

    @Override
    public View getView(int position, View convertView, ViewGroup parent) {
        final ViewHolder holder;
        if (convertView == null) {
            holder = new ViewHolder();
            convertView = inflater.inflate(R.layout.shopping_list_child, null);

            holder.itemName = (TextView) convertView.findViewById(R.id._itemName);
            holder.quantity = (TextView) convertView.findViewById(R.id._quantity);
            holder.serving = (TextView) convertView.findViewById(R.id._serving);

            convertView.setTag(holder);
        } else {
            holder = (ViewHolder) convertView.getTag();
        }
        // Set the results into TextViews
        holder.itemName.setText("" + list.get(position).getItemName());
        holder.quantity.setText("" + list.get(position).getQuantity());
        holder.serving.setText("" + list.get(position).getServing());
        return convertView;
    }
}
