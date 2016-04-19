using PhoodBuddyUWP.Models;
using System.Collections.ObjectModel;
using Windows.UI.Xaml;
using Windows.UI.Xaml.Controls;

namespace PhoodBuddyUWP.Pages
{
    public sealed partial class NewRecipePage : Page
    {
        //CONSTRUCTOR
        public NewRecipePage()
        {
            this.InitializeComponent();

            //Initializes the members
            ingredients = new ObservableCollection<RecipeIngredientModel>();
            instructions = new ObservableCollection<RecipeInstructionModel>();

            //Set the Data Contexts
            insPanel.DataContext = instructions;
            ingPanel.DataContext = ingredients;
            
            //Add the initial item to both the instructions and ingredients
            ingredients.Add(new RecipeIngredientModel("", "", 0));
            instructions.Add(new RecipeInstructionModel(1, ""));
        }


        //PUBLIC PROPERTIES

        
        //PRIVATE MEMBERS
        private ObservableCollection<RecipeIngredientModel> ingredients;
        private ObservableCollection<RecipeInstructionModel> instructions;


        //PUBLIC METHODS

        
        //PRIVATE METHODS


        //EVENT HANDLERS
        private void pictureButton_Click(object sender, RoutedEventArgs e)
        {
            
        }

        private void acceptButton_Click(object sender, RoutedEventArgs e)
        {
            Frame.Navigate(typeof(MyRecipesPage), new RecipeModel(titleBox.Text, ingredients, instructions));
        }

        private void cancelButton_Click(object sender, RoutedEventArgs e)
        {
            Frame.Navigate(typeof(MyRecipesPage), null);
        }

        private void newIngredient_Click(object sender, RoutedEventArgs e)
        {
            ingredients.Add(new RecipeIngredientModel("", "", 0));
        }

        private void newStep_Click(object sender, RoutedEventArgs e)
        {
            int i = instructions.Count;
            instructions.Add(new RecipeInstructionModel(i + 1, ""));
        }
    }
}