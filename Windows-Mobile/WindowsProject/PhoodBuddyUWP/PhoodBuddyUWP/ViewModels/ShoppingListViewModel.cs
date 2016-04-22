using FireSharp;
using FireSharp.Config;
using FireSharp.Interfaces;
using Newtonsoft.Json;
using PhoodBuddyUWP.Models;
using System;
using System.Collections.ObjectModel;
using Windows.Storage;

namespace PhoodBuddyUWP.ViewModels
{
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
                getOnlineShoppingList();
            }

            //If it's unable to, use the local copy
            catch (Exception)
            {
                getLocalShoppingList();
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
            //Open or create the local storage file
            var fileResult = ApplicationData.Current.LocalFolder.CreateFileAsync("shoppingList.json", CreationCollisionOption.OpenIfExists);
            while (fileResult.Status != Windows.Foundation.AsyncStatus.Completed) ;
            StorageFile file = fileResult.GetResults();

            //Reads the text from the file
            var textResult = FileIO.ReadTextAsync(file);
            while (textResult.Status != Windows.Foundation.AsyncStatus.Completed) ;
            string jText = textResult.GetResults();

            //Intializes Items
            if (jText != "")
                Items = JsonConvert.DeserializeObject<ObservableCollection<RecipeIngredientModel>>(jText);
            else
                Items = new ObservableCollection<RecipeIngredientModel>();
        }
        
        
        //PUBLIC PROPERITES
        public ObservableCollection<RecipeIngredientModel> Items { get; set; }

        
        //PRIVATE MEMBERS
        private IFirebaseClient client;
        private IFirebaseConfig config;
        private const string BasePath = "https://phoodbuddy.firebaseIO.com/";
        private const string FirebaseSecret = "Bu23qo0TN9kGK0yl6UjsvNK9Ao3YzduX8M480ucR";
    }
}