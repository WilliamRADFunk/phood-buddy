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

using PhoodBuddyUWP.Models;

namespace PhoodBuddyUWP.Pages
{
    /// <summary>
    /// An empty page that can be used on its own or navigated to within a Frame.
    /// </summary>
    public sealed partial class RecipeViewerPage : Page
    {
        private RecipeModel recipe;

        public RecipeViewerPage()
        {
            this.InitializeComponent();
        }

        protected override void OnNavigatedTo(NavigationEventArgs e)
        {
            //Calls the base version
            base.OnNavigatedTo(e);

            //Casts the parameters to the recipe type
            recipe = e.Parameter as RecipeModel;

            //Sets the image on the page
            recipeImg.Source = new Windows.UI.Xaml.Media.Imaging.BitmapImage(recipe.Picture);
        }
    }
}
