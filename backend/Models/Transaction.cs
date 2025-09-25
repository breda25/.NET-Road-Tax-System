using System;

namespace vignette_app.Models
{
    public class Transaction
    {
        public int Id { get; set; }
        public string TransactionId { get; set; }  
        public decimal RoadTaxAmount { get; set; }
        public DateTime TransactionDate { get; set; }
        public int TransactionYear { get; set; }
        public int CarId { get; set; }
        public Car Car { get; set; }
    }
}