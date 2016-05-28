using Newtonsoft.Json;
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

// The Blank Page item template is documented at http://go.microsoft.com/fwlink/?LinkId=234238

namespace PhoodBuddyUWP.Pages
{
    public sealed partial class ProfilePage : Page
    {
        //CONSTRUCTOR
        public ProfilePage()
        {
            this.InitializeComponent();
            this.DataContext = vm.Item;

            navMenu.OnNavigateParentReady += navHandler;
            System.Diagnostics.Debug.WriteLine("Value" + vm?.Item?.UserEmail);
        }


        //PRIVATE METHODS
        private void editToViewStateChange()
        {
            //Hides the text boxes
            fNameBox.Visibility = Visibility.Collapsed;
            lNameBox.Visibility = Visibility.Collapsed;
            ageBox.Visibility = Visibility.Collapsed;
            emailBox.Visibility = Visibility.Collapsed;

            //Makes the text blocks visible
            fNameBlock.Visibility = Visibility.Visible;
            lNameBlock.Visibility = Visibility.Visible;
            ageBlock.Visibility = Visibility.Visible;
            emailBlock.Visibility = Visibility.Visible;

            //Hides the save and cancel buttons on the app bar
            saveButton.Visibility = Visibility.Collapsed;
            cancelButton.Visibility = Visibility.Collapsed;

            //Shows the edit and settings buttons on the app bar
            editButton.Visibility = Visibility.Visible;
            settingsButton.Visibility = Visibility.Visible;
        }
        
        //PRIVATE MEMBERS
        ProfileViewModel vm = new ProfileViewModel();


        //EVENT HANDLERS
        private void navHandler(object sender, RoutedEventArgs e)
        {
            var page = sender as Type;
            Frame.Navigate(page);
        }

        protected override void OnNavigatedTo(NavigationEventArgs e)
        {
            base.OnNavigatedTo(e);
        }

        async protected override void OnNavigatedFrom(NavigationEventArgs e)
        {
            base.OnNavigatedFrom(e);

            //Saves the ProfileModel as json
            StorageFile file = await ApplicationData.Current.LocalFolder.GetFileAsync("user.json");
            string jText = JsonConvert.SerializeObject(vm.Item);
            await FileIO.WriteTextAsync(file, jText);
        }

        private void editButton_Click(object sender, RoutedEventArgs e)
        {
            //Copy the current text to the text boxes
            fNameBox.Text = fNameBlock.Text;
            lNameBox.Text = lNameBlock.Text;
            ageBox.Text = ageBlock.Text;
            emailBox.Text = emailBlock.Text;

            //Hides the text blocks
            fNameBlock.Visibility = Visibility.Collapsed;
            lNameBlock.Visibility = Visibility.Collapsed;
            ageBlock.Visibility = Visibility.Collapsed;
            emailBlock.Visibility = Visibility.Collapsed;

            //Makes the text boxes visible
            fNameBox.Visibility = Visibility.Visible;
            lNameBox.Visibility = Visibility.Visible;
            ageBox.Visibility = Visibility.Visible;
            emailBox.Visibility = Visibility.Visible;

            //Hides the settings and edit button on the app bar
            editButton.Visibility = Visibility.Collapsed;
            settingsButton.Visibility = Visibility.Collapsed;

            //Shows the save and cancel buttons on the app bar
            saveButton.Visibility = Visibility.Visible;
            cancelButton.Visibility = Visibility.Visible;
        }

        private void settingsButton_Click(object sender, RoutedEventArgs e)
        {
            throw new NotImplementedException();
        }

        private void saveButton_Click(object sender, RoutedEventArgs e)
        {
            //Saves the text blocks state to the view model
            vm.Item.UserFirstName = fNameBox.Text;
            vm.Item.UserLastName = lNameBox.Text;
            try { vm.Item.UserAge = Int32.Parse(ageBox.Text); } catch (Exception) { }
            vm.Item.UserEmail = emailBox.Text;
            
            //Swaps back to view mode
            editToViewStateChange();
        }

        private void cancelButton_Click(object sender, RoutedEventArgs e)
        {
            //Swaps back to view mode
            editToViewStateChange();
        }
    }
}
