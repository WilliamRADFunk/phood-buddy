using Newtonsoft.Json;
using PhoodBuddyUWP.Models;
using System;
using System.Collections.Generic;
using System.Collections.ObjectModel;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Windows.Storage;

namespace PhoodBuddyUWP.ViewModels
{
    public class MyRecipesViewModel
    {
        //CONSTRUCTOR
        public MyRecipesViewModel()
        {
            //Loads in the Favorites from JSON
            try
            {
                getOnlineFavorites();
            }
            catch(Exception)
            {
                getLocalFavorites();
            }

            //Loads in the Recipes from JSON
            try
            {
                getOnlineRecipes();
            }
            catch(Exception)
            {
                getLocalRecipes();
            }
        }


        //PRIVATE METHODS
        private void getOnlineFavorites()
        {
            throw new NotImplementedException();
        }

        private void getLocalFavorites()
        {
            //Opens the file
            var fileResult = ApplicationData.Current.LocalFolder.CreateFileAsync("favorites.json", CreationCollisionOption.OpenIfExists);
            while (fileResult.Status != Windows.Foundation.AsyncStatus.Completed) ;
            StorageFile file = fileResult.GetResults();

            //Read the text
            var textResult = FileIO.ReadTextAsync(file);
            while (textResult.Status != Windows.Foundation.AsyncStatus.Completed) ;
            string jText = textResult.GetResults();

            //Creates the object
            if(jText != "")
                Favorites = JsonConvert.DeserializeObject<ObservableCollection<RecipeModel>>(jText);
            else
                Favorites = new ObservableCollection<RecipeModel>();
        }

        private void getOnlineRecipes()
        {
            throw new NotImplementedException();
        }

        private void getLocalRecipes()
        {
            //Opens the file
            var fileResult = ApplicationData.Current.LocalFolder.CreateFileAsync("recipes.json", CreationCollisionOption.OpenIfExists);
            while (fileResult.Status != Windows.Foundation.AsyncStatus.Completed) ;
            StorageFile file = fileResult.GetResults();

            //Read the text
            var textResult = FileIO.ReadTextAsync(file);
            while (textResult.Status != Windows.Foundation.AsyncStatus.Completed) ;
            string jText = textResult.GetResults();

            //Creates the object
            if (jText != "")
                Recipes = JsonConvert.DeserializeObject<ObservableCollection<RecipeModel>>(jText);
            else
                Recipes = new ObservableCollection<RecipeModel>();
        }
        
        //PUBLIC MEMBERS
        public ObservableCollection<RecipeModel> Favorites { get; set; }
        public ObservableCollection<RecipeModel> Recipes { get; set; }
    }
}
