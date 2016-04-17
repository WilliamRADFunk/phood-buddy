using FireSharp;
using FireSharp.Config;
using FireSharp.Interfaces;
using Newtonsoft.Json;
using PhoodBuddyUWP.Models;
using System;
using System.Threading.Tasks;
using Windows.Storage;

namespace PhoodBuddyUWP.ViewModels
{
    class ProfileViewModel
    {
        //CONSTRUCTOR
        public ProfileViewModel()
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
                getOnlineProfile();
            }

            //If it's unable to, use the local copy
            catch (Exception)
            {
                getLocalProfile();
            }
        }


        //PUBLIC MEHTODS
        public void UpdateChanges()
        {
            throw new NotImplementedException();
        }


        //PRIVATE METHODS
        private void getOnlineProfile()
        {
            throw new NotImplementedException();
        }

        private void getLocalProfile()
        {
            //Gets the user profile file
            var fileResult = ApplicationData.Current.LocalFolder.GetFileAsync("user.json");
            while (fileResult.Status != Windows.Foundation.AsyncStatus.Completed) ;
            StorageFile file = fileResult.GetResults();

            //Parses the JSON
            var textResult = FileIO.ReadTextAsync(file);
            while (textResult.Status != Windows.Foundation.AsyncStatus.Completed) ;
            string jText = textResult.GetResults();

            Item = JsonConvert.DeserializeObject<UserModel>(jText);
        }


        //PUBLIC PROPERTIES
        public UserModel Item { get; set; }


        //PRIVATE MEMBERS
        private IFirebaseClient client;
        private IFirebaseConfig config;
        private const string BasePath = "https://phoodbuddy.firebaseIO.com/";
        private const string FirebaseSecret = "Bu23qo0TN9kGK0yl6UjsvNK9Ao3YzduX8M480ucR";
    }
}
