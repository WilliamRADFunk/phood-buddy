using Newtonsoft.Json;
using PhoodBuddyUWP.Models;
using PhoodBuddyUWP.ViewModels;
using System;
using System.Collections.Generic;
using System.Collections.ObjectModel;
using Windows.Foundation;
using Windows.Storage;
using Windows.UI.Xaml;
using Windows.UI.Xaml.Controls;
using Windows.UI.Xaml.Navigation;

namespace PhoodBuddyUWP.Pages
{
    public sealed partial class ShoppingListPage : Page
    {
        public ShoppingListPage()
        {
            this.InitializeComponent();

            vm = new ShoppingListViewModel();
            this.DataContext = vm;

            if (vm.Items.Count > 0)
                deleteButton.IsEnabled = true;

            navMenu.OnNavigateParentReady += navHandler;
        }


        //PRIVATE MEMBERS
        ShoppingListViewModel vm;


        //EVENT HANDLERS
        private void navHandler(object sender, RoutedEventArgs e)
        {
            var page = sender as Type;
            Frame.Navigate(page);
        }

        async protected override void OnNavigatedFrom(NavigationEventArgs e)
        {
            base.OnNavigatedFrom(e);

            //Saves the object to the file for later use
            StorageFile file = await ApplicationData.Current.LocalFolder.GetFileAsync("shoppingList.json");
            string jText = JsonConvert.SerializeObject(vm.Items);
            await FileIO.WriteTextAsync(file, jText);
        }

        private void addItemButton_Click(object sender, RoutedEventArgs e)
        {
            try
            {
                string name = nameBox.Text;
                int amount = Int32.Parse(amountBox.Text);
                string unit = unitBox.Text;

                RecipeIngredientModel toAdd = new RecipeIngredientModel(name, unit, amount);

                vm.Items.Add(toAdd);
            }
            catch(Exception)
            {
                
            }

            //Clears the fields so a new item can easily be added to the shopping list
            nameBox.Text = "";
            amountBox.Text = "";
            unitBox.Text = "";

            //Enables the delete button since now something has to be able to be deleted
            deleteButton.IsEnabled = true;
        }

        private void deleteItemButton_Click(object sender, RoutedEventArgs e)
        {
            //Gets all the selected items
            var items = shoppingListView.SelectedItems;
            
            //Deletes each of the selected items
            foreach (var i in items)
                vm.Items.Remove(i as RecipeIngredientModel);

            //Checks to see if the button should still be enabled
            if (vm.Items.Count == 0)
                deleteButton.IsEnabled = false;
        }

        private void addFlyout_Closed(object sender, object e)
        {
            nameBox.Text = "";
            amountBox.Text = "";
            unitBox.Text = "";
        }
    }
}