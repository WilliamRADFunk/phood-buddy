using PhoodBuddyUWP.Models;
using System;
using System.Collections.Generic;
using System.Collections.ObjectModel;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PhoodBuddyUWP.ViewModels
{
    public class MyRecipesViewModel
    {
        //CONSTRUCTOR
        public MyRecipesViewModel()
        {

            Favorites = new ObservableCollection<RecipeModel>();
            Recipes = new ObservableCollection<RecipeModel>();
        }


        //PRIVATE METHODS
        private void getOnlineFavorites()
        {
            throw new NotImplementedException();
        }

        private void getLocalFavorites()
        {
            Favorites = new ObservableCollection<RecipeModel>();
        }

        private void getOnlineRecipes()
        {
            throw new NotImplementedException();
        }

        private void getLocalRecipes()
        {
            Recipes = new ObservableCollection<RecipeModel>();
        }
        
        //PUBLIC MEMBERS
        public ObservableCollection<RecipeModel> Favorites { get; set; }
        public ObservableCollection<RecipeModel> Recipes { get; set; }
    }
}
