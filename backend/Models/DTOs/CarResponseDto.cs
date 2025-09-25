using System;
using System.Collections.Generic;

namespace vignette_app.Models.DTOs
{
    public class CarResponseDto
    {
        public int Id { get; set; }
        public int Year { get; set; }
        public string RegistrationNumber { get; set; }
        public string EnergyType { get; set; }
        public int FiscalPower { get; set; }
        public DateTime dateOfFirstRegistration { get; set; }
        public string vehicleModel { get; set; }
        public string TransactionId { get; set; }     
        public decimal RoadTaxAmount { get; set; }   
        public DateTime TransactionDate { get; set; }
        public ICollection<TransactionDto> Transactions { get; set; }
    }
}