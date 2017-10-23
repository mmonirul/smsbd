using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using TheWorld.Models;
using TheWorld.ViewModels;

namespace TheWorld.Controllers.Api
{
    [Route("api/trips/{tripName}/stops")]
    public class StopController: Controller
    {
        private IWorldRepository _worldRepository;
        private ILogger<StopController> _logger;

        public StopController(IWorldRepository worldRepository, ILogger<StopController> logger)
        {
            _worldRepository = worldRepository;
            _logger = logger;
        }
        [HttpGet("")]
        public IActionResult Get(string tripName)
        {
            try
            {
                var trip = _worldRepository.GetTripByName(tripName);
                return Ok(Mapper.Map<IEnumerable<StopViewModel>>(trip.Stops.OrderBy(s => s.Order).ToList()));
            }
            catch (Exception ex)
            {

                _logger.LogError($"Failed to get stops: {ex}");
            }
            return BadRequest("Failed to get stops");
        }
        [HttpPost("")]
        public async Task<IActionResult> Post(string tripName, [FromBody] StopViewModel stop)
        {
            if (ModelState.IsValid)
            {
                var newStop = Mapper.Map<Stop>(stop);

                _worldRepository.AddStop(tripName, newStop);

                if (await _worldRepository.SaveChangesAsync())
                {
                    return Created($"api/trips/{tripName}/stops/newStop.Name", Mapper.Map<Stop>(newStop));
                }
            }
            return BadRequest("Failed to save the trip!");
        }

    }
}
