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
    public sealed partial class DashboardPage : Page
    {
        public DashboardPage()
        {
            this.InitializeComponent();
            navMenu.OnNavigateParentReady += navHandler;
        }

        private void navHandler(object sender, RoutedEventArgs e)
        {
            var page = sender as Type;
            Frame.Navigate(page);
        }

        private void MyRecipesButton_Click(object sender, RoutedEventArgs e)
        {
            //TODO: Navigate to MyRecipes Page
        }
    }
}
