using Newtonsoft.Json;
using PhoodBuddyUWP.Models;
using PhoodBuddyUWP.ViewModels;
using System;
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

            nameBox.Text = "";
            amountBox.Text = "";
            unitBox.Text = "";
        }

        private void addFlyout_Closed(object sender, object e)
        {
            nameBox.Text = "";
            amountBox.Text = "";
            unitBox.Text = "";
        }
    }
}