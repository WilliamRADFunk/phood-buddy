using System;
using System.Collections.Generic;
using System.Collections.ObjectModel;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

using PhoodBuddyUWP.Models;

namespace PhoodBuddyUWP.ViewModels
{
    class PantryViewModel
    {
        public PantryViewModel()
        {
            //TODO: Request the pantry items from the database

            //TODO: Parse the output from the database

            //TODO: Add the items to the collection
        }

        //PROPERTIES
        public ObservableCollection<RecipeIngredientModel> items { get; set; }
    }
}
