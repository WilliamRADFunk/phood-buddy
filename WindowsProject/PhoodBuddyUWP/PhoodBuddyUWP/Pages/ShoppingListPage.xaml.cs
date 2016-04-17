using PhoodBuddyUWP.Models;
using PhoodBuddyUWP.ViewModels;
using System;
using System.Collections.Generic;
using System.Collections.ObjectModel;
using System.IO;
using System.Linq;
using System.Runtime.InteropServices.WindowsRuntime;
using Windows.Foundation;
using Windows.Foundation.Collections;
using Windows.UI.Popups;
using Windows.UI.Xaml;
using Windows.UI.Xaml.Controls;
using Windows.UI.Xaml.Controls.Primitives;
using Windows.UI.Xaml.Data;
using Windows.UI.Xaml.Input;
using Windows.UI.Xaml.Media;
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