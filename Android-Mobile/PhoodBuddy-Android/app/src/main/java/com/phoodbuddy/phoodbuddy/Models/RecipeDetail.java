package com.phoodbuddy.phoodbuddy.Models;

/**
 * Created by Evan Glazer on 4/7/2016.
 */
public class RecipeDetail {

    String image;
    String name;
    String serving;
    String nutrition;
    String carbs;
    String cooking_time;
    String prep_time;
    String ingredients;


    public RecipeDetail(String image, String name, String serving, String nutrition, String carbs,
                        String cooking_time, String prep_time, String ingredients)
    {
        this.image = image;
        this.name = name;
        this.serving = serving;
        this.nutrition = nutrition;
        this.carbs = carbs;
        this.cooking_time = cooking_time;
        this.prep_time = prep_time;
        this.ingredients = ingredients;

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

    public String getServing() {
        return serving;
    }

    public void setServing(String serving) {
        this.serving = serving;
    }

    public String getNutrition() {
        return nutrition;
    }

    public void setNutrition(String nutrition) {
        this.nutrition = nutrition;
    }

    public String getCarbs() {
        return carbs;
    }

    public void setCarbs(String carbs) {
        this.carbs = carbs;
    }

    public String getCooking_time() {
        return cooking_time;
    }

    public void setCooking_time(String cooking_time) {
        this.cooking_time = cooking_time;
    }

    public String getPrep_time() {
        return prep_time;
    }

    public void setPrep_time(String prep_time) {
        this.prep_time = prep_time;
    }

    public String getIngredients() {
        return ingredients;
    }

    public void setIngredients(String ingredients) {
        this.ingredients = ingredients;
    }

}
