using System;

namespace vignette_app.Models.DTOs
{
    public class TransactionDto
    {
        public string TransactionId { get; set; }
        public decimal RoadTaxAmount { get; set; }
        public DateTime TransactionDate { get; set; }
        public int TransactionYear { get; set; }  
    }
}