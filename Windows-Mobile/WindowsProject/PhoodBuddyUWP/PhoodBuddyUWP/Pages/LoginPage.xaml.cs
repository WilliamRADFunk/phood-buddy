using Newtonsoft.Json;
using PhoodBuddyUWP.Models;
using PhoodBuddyUWP.ViewModels;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Runtime.InteropServices.WindowsRuntime;
using Windows.Foundation;
using Windows.Foundation.Collections;
using Windows.Storage;
using Windows.UI.Xaml;
using Windows.UI.Xaml.Controls;
using Windows.UI.Xaml.Controls.Primitives;
using Windows.UI.Xaml.Data;
using Windows.UI.Xaml.Input;
using Windows.UI.Xaml.Media;
using Windows.UI.Xaml.Navigation;

// The Blank Page item template is documented at http://go.microsoft.com/fwlink/?LinkId=402352&clcid=0x409

namespace PhoodBuddyUWP.Pages
{
    public sealed partial class LoginPage : Page
    {
        public LoginPage()
        {
            this.InitializeComponent();
        }

        async private void loginButton_Click(object sender, RoutedEventArgs e)
        {
            //TODO: Validate login credentials

            //Create the Model of the user based off of the login credentials
            UserModel user = new UserModel
            {
                UserEmail = usernameTextField.Text,
                UserPass = passwordTextField.Password
            };

            //Save the User to a file in JSON format
            var jText = JsonConvert.SerializeObject(user);
            StorageFile file = await ApplicationData.Current.LocalFolder.CreateFileAsync("user.json");
            await FileIO.WriteTextAsync(file, jText);

            //Navigate to the dashboard page
            Frame.Navigate(typeof(DashboardPage));
        }

        private void sureButton_Click(object sender, RoutedEventArgs e)
        {
            //TODO: Register the login credentials with firebase
        }
    }
}
