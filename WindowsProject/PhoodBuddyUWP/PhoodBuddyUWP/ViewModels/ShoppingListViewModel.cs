using FireSharp;
using FireSharp.Config;
using FireSharp.Interfaces;
using PhoodBuddyUWP.Models;
using System;
using System.Collections.ObjectModel;

namespace PhoodBuddyUWP.ViewModels
{
    public class ShoppingListItem
    {
        public ShoppingListItem(bool marked, RecipeIngredientModel ingredient)
        {
            this.marked = marked;
            this.ingredient = ingredient;
        }

        public bool marked;
        public RecipeIngredientModel ingredient;
    }

    public class ShoppingListViewModel
    {
        //CONSTRUCTOR
        public ShoppingListViewModel()
        {
            //Initializes the connection to the Firebase database
            config = new FirebaseConfig
            {
                AuthSecret = FirebaseSecret,
                BasePath = BasePath
            };

            client = new FirebaseClient(config);


            //Attempts to get the online copy
            try
            {
                //TODO: Fetch the online copies
            }

            //If it's unable to, use the local copy
            catch (Exception)
            {
                //TODO: Fetch the local copies
            }
        }


        //PUBLIC METHODS
        public void UpdateChanges()
        {
            throw new NotImplementedException();
        }
        
        
        //PRIVATE METHODS
        private void getOnlineShoppingList()
        {
            throw new NotImplementedException();
        }

        private void getLocalShoppingList()
        {
            throw new NotImplementedException();
        }
        
        
        //PUBLIC PROPERITES
        ObservableCollection<ShoppingListItem> Items { get; set; }

        
        //PRIVATE MEMBERS
        private IFirebaseClient client;
        private IFirebaseConfig config;
        private const string BasePath = "https://phoodbuddy.firebaseIO.com/";
        private const string FirebaseSecret = "Bu23qo0TN9kGK0yl6UjsvNK9Ao3YzduX8M480ucR";
    }
}