using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Windows.Storage;

namespace PhoodBuddyUWP.Models
{
    public enum Tastes
    {
        SWEET,
        SALTY,
        BITTER,
        SOUR,
        SPICY
    }

    public enum HealthFactors
    {
        DIABETES,
        CHOLESTOROL,
        HYPERTENSION,
        HYPOTENSION,
        VEGETARIAN
    }

    class UserModel
    {
        //CONSTRUCTOR
        public UserModel()
        {
            UserEmail = "";
            UserPass = "";
            UserFirstName = "";
            UserLastName = "";
            UserAllergies = new List<int>();
            UserHealthFactors = new List<int>();
            UserTastes = new List<float>();
        }

        //PUBLIC PROPERTIES
        public string UserEmail { get; set; }
        public string UserPass { get; set; }
        public string UserFirstName { get; set; }
        public string UserLastName { get; set; }
        public List<int> UserAllergies { get; set; }
        public List<int> UserHealthFactors { get; set; }
        public List<float> UserTastes { get; set; }
    }
}