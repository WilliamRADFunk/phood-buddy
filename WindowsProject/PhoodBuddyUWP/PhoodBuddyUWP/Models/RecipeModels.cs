using System.Collections.Generic;

namespace PhoodBuddyUWP.Models
{
    class RecipeIngredient
    {
        //Properties
        public string Name { get; set; }
        public string Unit { get; set; }
        public float Amount { get; set; }

        //Constructor
        public RecipeIngredient(string n, string u, int a)
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

    class RecipeInstruction
    {
        //Properties
        public int StepNumber { get; set; }
        public string Instruction { get; set; }

        //Constructor
        public RecipeInstruction(int n, string i)
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

    class Recipe
    {
        //Properties
        public string Title { get; set; }
        public List<RecipeIngredient> Ingredients { get; set; }
        public List<RecipeInstruction> Instructions { get; set; }
    }
}