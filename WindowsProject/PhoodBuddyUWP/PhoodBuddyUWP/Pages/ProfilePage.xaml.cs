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
    }
}
