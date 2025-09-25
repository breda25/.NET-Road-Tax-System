using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using System.Linq;
using Microsoft.EntityFrameworkCore;
using vignette_app.Models;
using vignette_app.Models.DTOs;
using vignette_app.Data;

namespace vignette_app.Services
{
    public class CarService : ICarService
    {
        private readonly ApplicationDbContext _context;

        public CarService(ApplicationDbContext context)
        {
            _context = context;
        }

        private decimal CalculateRoadTax(int fiscalPower, string energyType)
        {
            if (fiscalPower < 8)
                return energyType == "Gasoline" ? 350m : 700m;
            else if (fiscalPower <= 10)
                return energyType == "Gasoline" ? 650m : 1500m;
            else if (fiscalPower <= 14)
                return energyType == "Gasoline" ? 3000m : 6000m;
            else
                return energyType == "Gasoline" ? 8000m : 20000m;
        }

        public async Task<IEnumerable<CarResponseDto>> GetAllCarsAsync()
        {
            return await _context.Cars
                .Select(car => new CarResponseDto
                {
                    Id = car.Id,
                    Year = car.Year,
                    RegistrationNumber = car.RegistrationNumber,
                    EnergyType = car.EnergyType,
                    FiscalPower = car.FiscalPower,
                    dateOfFirstRegistration = car.dateOfFirstRegistration
                })
                .ToListAsync();
        }

        public async Task<CarResponseDto> GetCarByRegistrationNumberAsync(string registrationNumber)
        {
            var car = await _context.Cars
                .FirstOrDefaultAsync(c => c.RegistrationNumber == registrationNumber);

            if (car == null) return null;

            return new CarResponseDto
            {
                Id = car.Id,
                Year = car.Year,
                RegistrationNumber = car.RegistrationNumber,
                EnergyType = car.EnergyType,
                FiscalPower = car.FiscalPower,
                dateOfFirstRegistration = car.dateOfFirstRegistration
            };
        }

        public async Task<CarResponseDto> AddCarAsync(CarRequestDto carRequest)
        {
            var car = new Car
            {
                Year = carRequest.Year,
                RegistrationNumber = carRequest.RegistrationNumber,
                EnergyType = carRequest.EnergyType,
                FiscalPower = carRequest.FiscalPower,
                dateOfFirstRegistration = carRequest.dateOfFirstRegistration,
                vehicleModel = carRequest.vehicleModel,
                Transactions = new List<Transaction>
                {
                    new Transaction
                    {
                        TransactionId = Guid.NewGuid().ToString("N").Substring(0, 16).ToUpper(),
                        RoadTaxAmount = CalculateRoadTax(carRequest.FiscalPower, carRequest.EnergyType),
                        TransactionDate = DateTime.Now,
                        TransactionYear = DateTime.Now.Year
                    }
                }
            };

            _context.Cars.Add(car);
            await _context.SaveChangesAsync();

            return await GetCarByRegistrationNumberAsync(car.RegistrationNumber);
        }

        public async Task<CarResponseDto> VerifyCarPaymentAsync(
            int year, 
            string registrationNumber, 
            string energyType, 
            int fiscalPower)
        {
            var car = await _context.Cars
                .Include(c => c.Transactions)
                .FirstOrDefaultAsync(c => 
                    c.RegistrationNumber == registrationNumber &&
                    c.EnergyType == energyType &&
                    c.FiscalPower == fiscalPower);

            if (car == null) return null;

            var transaction = car.Transactions.FirstOrDefault(t => t.TransactionYear == year);
            if (transaction == null) return null;

            return new CarResponseDto
            {
                Id = car.Id,
                Year = year,
                RegistrationNumber = car.RegistrationNumber,
                EnergyType = car.EnergyType,
                FiscalPower = car.FiscalPower,
                dateOfFirstRegistration = car.dateOfFirstRegistration,
                vehicleModel = car.vehicleModel,
                TransactionId = transaction.TransactionId,     
                RoadTaxAmount = transaction.RoadTaxAmount,     
                TransactionDate = transaction.TransactionDate  
            };
        }
    }
}