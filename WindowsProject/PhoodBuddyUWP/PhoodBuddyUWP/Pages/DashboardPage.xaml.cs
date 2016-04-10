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
    public sealed partial class DashboardPage : Page
    {
        public DashboardPage()
        {
            this.InitializeComponent();
            navMenu.OnNavigateParentReady += navHandler;
        }

        private void navHandler(object sender, EventArgs e)
        {
            var page = sender as Type;

            if (page == typeof(RecipeViewerPage))
            {
                var recipe = new RecipeModel("Cake");

                recipe.Ingredients.Add(new RecipeIngredientModel("Flour", "Cup", 3));
                recipe.Ingredients.Add(new RecipeIngredientModel("Milk", "Cup", 2));
                recipe.Ingredients.Add(new RecipeIngredientModel("Lie", "Ounce", 1));

                recipe.Instructions.Add(new RecipeInstructionModel(1, "Mix Ingredients"));
                recipe.Instructions.Add(new RecipeInstructionModel(2, "Let Rest"));
                recipe.Instructions.Add(new RecipeInstructionModel(3, "Bake For an hour"));

                Frame.Navigate(page, recipe);
            }
                
            else
                Frame.Navigate(page);
        }
    }
}
