package com.phoodbuddy.phoodbuddy.Models;

/**
 * Created by Evan Glazer on 4/4/2016.
 */
public class Recipe {


    public Recipe(int id, String food, String Description, String image)
    {
        this.id = id;
        this.Name = food;
        this.Description = Description;
        this.image = image;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    int id;

    public String getImage() {
        return image;
    }

    public void setImage(String image) {
        this.image = image;
    }

    String image;
    String Name;
    String Description;




    public String getName() {
        return Name;
    }

    public void setName(String name) {
        Name = name;
    }


    public String getDescription() {
        return Description;
    }

    public void setDescription(String description) {
        Description = description;
    }


}
