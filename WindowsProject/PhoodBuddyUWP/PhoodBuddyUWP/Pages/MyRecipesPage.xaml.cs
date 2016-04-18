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
        //Constructor
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
            var list = sender as ListView;
            var item = list.SelectedItem as RecipeModel;

            Frame.Navigate(typeof(RecipeViewerPage), item);
        }

        private void addButton_Click(object sender, RoutedEventArgs e)
        {
            //TODO: Navigate to add recipe page
        }
    }
}
