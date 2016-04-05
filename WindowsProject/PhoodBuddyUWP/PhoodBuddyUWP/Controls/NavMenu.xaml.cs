using System;
using System.Collections.Generic;
using System.ComponentModel;
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

using PhoodBuddyUWP.Pages;
// The User Control item template is documented at http://go.microsoft.com/fwlink/?LinkId=234236

namespace PhoodBuddyUWP.Controls
{
    public sealed partial class NavMenu : UserControl, INotifyPropertyChanged
    {
        public NavMenu()
        {
            this.InitializeComponent();
        }

        /*
         * DEPENDENCY PROPERTIES
         */
        public string HeaderText
        {
            get { return (string)GetValue(HeaderTextProperty); }
            set { SetValue(HeaderTextProperty, value); }
        }

        public static readonly DependencyProperty HeaderTextProperty =
            DependencyProperty.Register("HeaderText", typeof(string), typeof(NavMenu), new PropertyMetadata(0));

        private static void OnHeaderTextPropertyChanged(DependencyObject dependencyObject, DependencyPropertyChangedEventArgs e)
        {
            NavMenu nm = dependencyObject as NavMenu;
            nm.OnPropertyChanged("HeaderText");
            nm.OnHeaderTextPropertyChanged(e);
        }

        private void OnHeaderTextPropertyChanged(DependencyPropertyChangedEventArgs e)
        {
            Header.Text = HeaderText;
        }

        //DELEGATES
        public delegate void NavigationDelegate(object source, EventArgs e);

        //EVENTS
        public event NavigationDelegate OnNavigateParentReady;
        public event PropertyChangedEventHandler PropertyChanged;
        

        private void OnPropertyChanged(string propertyName)
        {
            if (PropertyChanged != null)
                PropertyChanged(this, new PropertyChangedEventArgs(propertyName));
        }

        private void MenuButton_Click(object sender, RoutedEventArgs e)
        {
            menu.IsPaneOpen = !menu.IsPaneOpen;
        }

        private void ShoppingListButton_Click(object sender, RoutedEventArgs e)
        {
            OnNavigateParentReady(typeof(ShoppingListPage), null);
        }

        private void PantryListButton_Click(object sender, RoutedEventArgs e)
        {
            OnNavigateParentReady(typeof(PantryListPage), null);
        }

        private void ProfileButton_Click(object sender, RoutedEventArgs e)
        {
            OnNavigateParentReady(typeof(ProfilePage), null);
        }

        private void FavoriteRecipesButton_Click(object sender, RoutedEventArgs e)
        {
            OnNavigateParentReady(typeof(RecipeViewerPage), null);
        }
    }
}