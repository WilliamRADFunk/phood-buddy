using System;
using Windows.UI.Xaml;
using Windows.UI.Xaml.Controls;
using Windows.UI.Xaml.Navigation;

using PhoodBuddyUWP.Models;

namespace PhoodBuddyUWP.Pages
{
    public sealed partial class RecipeViewerPage : Page
    {
        //PRIVATE MEMBERS
        private RecipeModel recipe;


        //CONSTRUCTOR
        public RecipeViewerPage()
        {
            this.InitializeComponent();
            navMenu.OnNavigateParentReady += navHandler;
        }


        //EVENT HANDLERS
        protected override void OnNavigatedTo(NavigationEventArgs e)
        {
            //Calls the base version
            base.OnNavigatedTo(e);

            //Casts the parameters to the recipe type
            recipe = e.Parameter as RecipeModel;
            this.DataContext = recipe;

            //Sets the image on the page
            recipeImg.Source = new Windows.UI.Xaml.Media.Imaging.BitmapImage(recipe.Picture);
        }

        protected override void OnNavigatedFrom(NavigationEventArgs e)
        {
            //Calls the base version
            base.OnNavigatedFrom(e);
        }

        private void navHandler(object sender, RoutedEventArgs e)
        {
            Frame.Navigate(sender as Type);
        }

        private void saveButton(object sender, RoutedEventArgs e)
        {
            Frame.Navigate(typeof(MyRecipesPage), recipe);
        }
    }
}