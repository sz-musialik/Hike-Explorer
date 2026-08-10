using System.Globalization;
using HikeExplorer.API.DTOs;
using HikeExplorer.API.Services;
using Microsoft.AspNetCore.Mvc;

[ApiController]
[Route("api/[controller]")]
public class ElevationController : ControllerBase
{
	private readonly ElevationService _elevationService;

	public ElevationController(ElevationService elevationService)
	{
		_elevationService = elevationService;
	}

	[HttpGet]
	public async Task<ActionResult<ElevationResponseDto>> GetElevation(
		[FromQuery] string latitude,
		[FromQuery] string longitude)
	{
		try
		{
			var request = new ElevationRequestDto
			{
				Latitudes = latitude
					.Split(',', StringSplitOptions.RemoveEmptyEntries)
					.Select(value => double.Parse(
						value,
						CultureInfo.InvariantCulture))
					.ToList(),

				Longitudes = longitude
					.Split(',', StringSplitOptions.RemoveEmptyEntries)
					.Select(value => double.Parse(
						value,
						CultureInfo.InvariantCulture))
					.ToList()
			};

			Console.WriteLine($"Latitude count: {request.Latitudes.Count}");
			Console.WriteLine($"Longitude count: {request.Longitudes.Count}");

			var result = await _elevationService.GetElevation(request);

			return Ok(result);
		}
		catch (FormatException)
		{
			return BadRequest("Invalid latitude or longitude format.");
		}
		catch (ArgumentException ex)
		{
			return BadRequest(ex.Message);
		}
	}
}
