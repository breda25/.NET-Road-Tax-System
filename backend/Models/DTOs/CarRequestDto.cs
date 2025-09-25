using System;

namespace vignette_app.Models.DTOs
{
    public class CarRequestDto
    {
        public int Year { get; set; }
        public string RegistrationNumber { get; set; }
        public string EnergyType { get; set; }
        public int FiscalPower { get; set; }
        public DateTime dateOfFirstRegistration { get; set; }
        public string vehicleModel { get; set; }
    }
}