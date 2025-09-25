using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Threading.Tasks;
using vignette_app.Models;
using vignette_app.Models.DTOs;
using vignette_app.Services;

namespace vignette_app.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CarController : ControllerBase
    {
        private readonly ICarService _carService;

        public CarController(ICarService carService)
        {
            _carService = carService;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<CarResponseDto>>> GetAllCars()
        {
            var cars = await _carService.GetAllCarsAsync();
            return Ok(cars);
        }

        [HttpPost]
        public async Task<ActionResult<CarResponseDto>> AddCar([FromBody] CarRequestDto carRequest)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var createdCar = await _carService.AddCarAsync(carRequest);
            return CreatedAtAction(nameof(GetCarByRegistrationNumber), new { registrationNumber = createdCar.RegistrationNumber }, createdCar);
        }

        [HttpGet("{registrationNumber}")]
        public async Task<ActionResult<CarResponseDto>> GetCarByRegistrationNumber(string registrationNumber)
        {
            var car = await _carService.GetCarByRegistrationNumberAsync(registrationNumber);
            if (car == null)
            {
                return NotFound();
            }
            return Ok(car);
        }

        [HttpGet("verify")]
        public async Task<ActionResult<CarResponseDto>> VerifyCarPayment(
            [FromQuery] int year,
            [FromQuery] string registrationNumber,
            [FromQuery] string energyType,
            [FromQuery] int fiscalPower)
        {
            var result = await _carService.VerifyCarPaymentAsync(year, registrationNumber, energyType, fiscalPower);
            if (result == null)
            {
                return NotFound();
            }
            return Ok(result);
        }
    }
}