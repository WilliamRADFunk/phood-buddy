﻿using PhoodBuddyUWP.Models;
using PhoodBuddyUWP.ViewModels;
using System;
using System.Collections.Generic;
using System.Collections.ObjectModel;
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

namespace PhoodBuddyUWP.Pages
{
    public sealed partial class ShoppingListPage : Page
    {
        public ShoppingListPage()
        {
            this.InitializeComponent();
            navMenu.OnNavigateParentReady += navHandler;
        }

        private void navHandler(object sender, RoutedEventArgs e)
        {
            var page = sender as Type;
            Frame.Navigate(page);
        }
    }
}