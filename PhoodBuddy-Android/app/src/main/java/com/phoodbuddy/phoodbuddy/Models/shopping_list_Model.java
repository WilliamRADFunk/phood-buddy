package com.phoodbuddy.phoodbuddy.Models;

/**
 * Created by Evan Glazer on 3/18/2016.
 */
public class shopping_list_Model {

    String itemName;
    String quantity;
    String serving;

    public shopping_list_Model(String item, String quan, String serve) {
        this.itemName = item;
        this.quantity = quan;
        this.serving = serve;
    }


    public String getItemName() {
        return itemName;
    }

    public void setItemName(String itemName) {
        this.itemName = itemName;
    }

    public String getQuantity() {
        return quantity;
    }

    public void setQuantity(String quantity) {
        this.quantity = quantity;
    }

    public String getServing() {
        return serving;
    }

    public void setServing(String serving) {
        this.serving = serving;
    }



}
