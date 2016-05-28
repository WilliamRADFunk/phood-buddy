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
                

        //EVENTS
        public event RoutedEventHandler OnNavigateParentReady;
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
            OnNavigateParentReady?.Invoke(typeof(ShoppingListPage), new RoutedEventArgs());
        }

        private void ProfileButton_Click(object sender, RoutedEventArgs e)
        {
            OnNavigateParentReady?.Invoke(typeof(ProfilePage), new RoutedEventArgs());
        }

        private void HomeButton_Click(object sender, RoutedEventArgs e)
        {
            OnNavigateParentReady?.Invoke(typeof(DashboardPage), new RoutedEventArgs());
        }
    }
}