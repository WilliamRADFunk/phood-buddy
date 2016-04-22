package com.phoodbuddy.phoodbuddy.Models;

/**
 * Created by Evan Glazer on 4/16/2016.
 */
public class Meals {
        public Meals(String i, String j, String k)
        {
            this.image = i;
            this.name = j;
            this.id = k;
        }

        public Meals() {

        }

        public String getImage() {
            return image;
        }

        public void setImage(String image) {
            this.image = image;
        }

        public String getName() {
            return name;
        }

        public void setName(String name) {
            this.name = name;
        }

        public String getId() {
            return id;
        }

        public void setId(String id) {
            this.id = id;
        }

        String image;
        String name;
        String id;

    public String getDate() {
        return Date;
    }

    public void setDate(String date) {
        Date = date;
    }

    String Date;

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    String type;
    }


