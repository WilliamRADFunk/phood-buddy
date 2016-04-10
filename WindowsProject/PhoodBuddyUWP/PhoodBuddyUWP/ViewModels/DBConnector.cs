using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

using PhoodBuddyUWP.ViewModels;

namespace PhoodBuddyUWP.ViewModels
{
    class DBConnector
    {
        public DBConnector()
        {
            config = new FireSharp.Config.FirebaseConfig
            {
                AuthSecret = "TODO",
                BasePath = "TODO"
            };
        }

        //PUBLIC METHODS
        public void UpdatePantry(PantryViewModel pantry)
        {
            client = new FireSharp.FirebaseClient(config);
            
        }

        public void UpdateFavoriteRecipes()
        {

        }

        //PRIVATE MEMBERS
        FireSharp.Config.IFirebaseConfig config;
        FireSharp.Interfaces.IFirebaseClient client;
    }
}
