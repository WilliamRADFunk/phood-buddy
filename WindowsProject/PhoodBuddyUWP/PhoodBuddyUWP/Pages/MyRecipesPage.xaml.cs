using PhoodBuddyUWP.Models;
using PhoodBuddyUWP.ViewModels;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Runtime.InteropServices.WindowsRuntime;
using Windows.Foundation;
using Windows.Foundation.Collections;
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
    public sealed partial class MyRecipesPage : Page
    {
        //CONSTRUCTOR
        public MyRecipesPage()
        {
            this.InitializeComponent();
            navMenu.OnNavigateParentReady += navHandler;

            vm = new MyRecipesViewModel();
            this.DataContext = vm;
        }


        //PRIVATE MEMBERS
        MyRecipesViewModel vm;


        //EVENT HANDLERS
        private void navHandler(object sender, RoutedEventArgs e)
        {
            var page = sender as Type;
            Frame.Navigate(page);
        }

        private void Recipe_Click(object sender, ItemClickEventArgs e)
        {
            var item = e.ClickedItem as RecipeModel;

            Frame.Navigate(typeof(RecipeViewerPage), item);
        }

        private void addButton_Click(object sender, RoutedEventArgs e)
        {
            Frame.Navigate(typeof(NewRecipePage));
        }

        protected override void OnNavigatedTo(NavigationEventArgs e)
        {
            base.OnNavigatedTo(e);

            //Gets the possible recipe from the args
            var newRecipe = e.Parameter as RecipeModel;

            //Skip if there is no parameter
            if (newRecipe == null)
                return;

            //Adds the new recipe to the my recipe list
            vm.Recipes.Add(newRecipe);
        }

        protected override void OnNavigatingFrom(NavigatingCancelEventArgs e)
        {
            base.OnNavigatingFrom(e);

            //Saves the state of the view model
            vm.UpdateChanges();
        }
    }
}
