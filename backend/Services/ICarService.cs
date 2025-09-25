using System.Collections.Generic;
using System.Threading.Tasks;
using vignette_app.Models.DTOs;

namespace vignette_app.Services
{
    public interface ICarService
    {
        Task<IEnumerable<CarResponseDto>> GetAllCarsAsync();
        Task<CarResponseDto> GetCarByRegistrationNumberAsync(string registrationNumber);
        Task<CarResponseDto> AddCarAsync(CarRequestDto carRequest);
        Task<CarResponseDto> VerifyCarPaymentAsync(int year, string registrationNumber, string energyType, int fiscalPower);
    }
}