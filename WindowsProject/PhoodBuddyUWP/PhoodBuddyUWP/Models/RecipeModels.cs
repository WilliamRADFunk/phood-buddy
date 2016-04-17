 using System.Collections.Generic;

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
                return Amount + " " + Unit + "s of" + Name;
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
        public List<RecipeIngredientModel> Ingredients { get; set; }
        public List<RecipeInstructionModel> Instructions { get; set; }
        public System.Uri Picture { get; set; }

        //Constructor
        public RecipeModel(string t, List<RecipeIngredientModel> ingredients = null, List<RecipeInstructionModel> instructions = null)
        {
            //Initializes the title
            Title = t;

            //Initializes the ingredients
            if (ingredients == null)
                ingredients = new List<RecipeIngredientModel>();
            Ingredients = ingredients;

            //Initializes the instructions
            if (instructions == null)
                instructions = new List<RecipeInstructionModel>();
            Instructions = instructions;

            //Initializes the picture
            Picture = new System.Uri("https://culinaryadventuresinthekitchen.files.wordpress.com/2012/03/frozen-yog-cake.jpg");
        }
    }
}