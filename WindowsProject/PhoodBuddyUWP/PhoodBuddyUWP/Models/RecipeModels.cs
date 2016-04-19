using System.Collections.Generic;
using System.Collections.ObjectModel;

namespace PhoodBuddyUWP.Models
{
    public class RecipeIngredientModel
    {
        //Properties
        public string Name { get; set; }
        public string Unit { get; set; }
        public float Amount { get; set; }

        //Constructor
        public RecipeIngredientModel(string n, string u, int a)
        {
            Name = n;
            Unit = u;
            Amount = a;
        }

        //ToString Override
        public override string ToString()
        {
            if (Amount == 1)
                return Amount + " " + Unit + " of " + Name;
            else
                return Amount + " " + Unit + "s of " + Name;
        }
    }

    public class RecipeInstructionModel
    {
        //Properties
        public int StepNumber { get; set; }
        public string Instruction { get; set; }

        //Constructor
        public RecipeInstructionModel(int n, string i)
        {
            StepNumber = n;
            Instruction = i;
        }

        //ToString Override
        public override string ToString()
        {
            return StepNumber + ".) " + Instruction;
        }
    }

    public class RecipeModel
    {
        //Properties
        public string Title { get; set; }
        public ObservableCollection<RecipeIngredientModel> Ingredients { get; set; }
        public ObservableCollection<RecipeInstructionModel> Instructions { get; set; }
        public bool isFavorite { get; set; }
        public System.Uri Picture { get; set; }

        //CONSTRUCTOR
        public RecipeModel(string title, ObservableCollection<RecipeIngredientModel> ingredients = null, ObservableCollection<RecipeInstructionModel> instructions = null)
        {
            //Initializes the title
            Title = title;

            //Initializes the ingredients
            if (ingredients == null)
                ingredients = new ObservableCollection<RecipeIngredientModel>();
            Ingredients = ingredients;

            //Initializes the instructions
            if (instructions == null)
                instructions = new ObservableCollection<RecipeInstructionModel>();
            Instructions = instructions;

            //Initializes the favorite state
            isFavorite = false;

            //Initializes the picture
            Picture = new System.Uri("https://culinaryadventuresinthekitchen.files.wordpress.com/2012/03/frozen-yog-cake.jpg");
        }
    }
}