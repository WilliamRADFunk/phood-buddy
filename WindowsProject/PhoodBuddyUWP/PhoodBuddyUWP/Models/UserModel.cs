using System.Collections.Generic;
using System.Collections.ObjectModel;
using System.ComponentModel;

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

    public class UserModel : INotifyPropertyChanged
    {
        //CONSTRUCTOR
        public UserModel()
        {
            UserEmail = "";
            UserPass = "";
            UserFirstName = "";
            UserLastName = "";
            UserAllergies = new ObservableCollection<int>();
            UserHealthFactors = new ObservableCollection<int>();
            UserTastes = new ObservableCollection<float>();
        }


        //PUBLIC PROPERTIES
        public string UserEmail
        {
            get
            {
                return _userEmail;
            }
            set
            {
                _userEmail = value;
                PropertyChanged?.Invoke(this, new PropertyChangedEventArgs(nameof(UserEmail)));
            }
        } private string _userEmail;

        public string UserPass
        {
            get
            {
                return _userPass;
            }
            set
            {
                _userPass = value;
                PropertyChanged?.Invoke(this, new PropertyChangedEventArgs(nameof(UserPass)));
            }
        } private string _userPass;

        public string UserFirstName
        {
            get
            {
                return _userFirstName;
            }
            set
            {
                _userFirstName = value;
                PropertyChanged?.Invoke(this, new PropertyChangedEventArgs(nameof(UserFirstName)));
            }
        } private string _userFirstName;

        public string UserLastName
        {
            get
            {
                return _userLastName;
            }
            set
            {
                _userLastName = value;
                PropertyChanged?.Invoke(this, new PropertyChangedEventArgs(nameof(UserLastName)));
            }
        } private string _userLastName;

        public int UserAge
        {
            get
            {
                return _userAge;
            }
            set
            {
                _userAge = value;
                PropertyChanged?.Invoke(this, new PropertyChangedEventArgs(nameof(UserAge)));
            }
        } private int _userAge;

        public ObservableCollection<int> UserAllergies { get; set; }

        public ObservableCollection<int> UserHealthFactors { get; set; }

        public ObservableCollection<float> UserTastes { get; set; }


        //EVENT
        public event PropertyChangedEventHandler PropertyChanged;
    }
}