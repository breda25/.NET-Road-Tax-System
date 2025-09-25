using System;
using System.Collections.Generic;

namespace vignette_app.Models
{
    public class Car
    {
        public int Id { get; set; }
        public int Year { get; set; }
        public string RegistrationNumber { get; set; }
        public string EnergyType { get; set; }
        public int FiscalPower { get; set; }
        public DateTime dateOfFirstRegistration { get; set; }
        public string vehicleModel { get; set; }
        public ICollection<Transaction> Transactions { get; set; }
    }
}
