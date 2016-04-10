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

        //DEPENDENCY PROPERTIES
        public string HeaderText
        {
            get { return (string)GetValue(HeaderTextProperty); }
            set { SetValue(HeaderTextProperty, value); }
        }

        public static readonly DependencyProperty HeaderTextProperty =
            DependencyProperty.Register(nameof(HeaderText), typeof(string), typeof(NavMenu), new PropertyMetadata("<Header Text>"));

        public UIElement MainContent
        {
            get { return (UIElement)GetValue(MainContentProperty); }
            set { SetValue(MainContentProperty, value); }
        }

        public static readonly DependencyProperty MainContentProperty =
            DependencyProperty.Register(nameof(MainContent), typeof(UIElement), typeof(NavMenu), new PropertyMetadata(new Grid()));




        //DELEGATES
        public delegate void NavigationDelegate(object source, EventArgs e);

        
        //EVENTS
        public event NavigationDelegate OnNavigateParentReady;
        public event PropertyChangedEventHandler PropertyChanged;
        

        //EVENT HANDLERS
        private void OnPropertyChanged(string propertyName)
        {
            PropertyChanged?.Invoke(this, new PropertyChangedEventArgs(propertyName));
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