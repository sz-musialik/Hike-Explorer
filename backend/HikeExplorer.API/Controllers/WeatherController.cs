using Microsoft.AspNetCore.Mvc;
using HikeExplorer.API.Services;

[ApiController]
[Route("/api/weather")]
public class WeatherController : ControllerBase
{
	private readonly WeatherService _weatherService;

	public WeatherController(WeatherService weatherService)
	{
		_weatherService = weatherService;
	}

	[HttpGet]
	public async Task<IActionResult> GetWeather(
		double lat,
		double lng
	)
	{
		var result = await _weatherService.GetWeather(lat, lng);

		return Ok(result);
	}
}
