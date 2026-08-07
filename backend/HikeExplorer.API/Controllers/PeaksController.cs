using Microsoft.AspNetCore.Mvc;
using HikeExplorer.API.Services;

[ApiController]
[Route("api/peaks")]
public class PeaksController : ControllerBase
{
	private readonly OverpassService _overpassService;

	public PeaksController(OverpassService overpassService)
	{
		_overpassService = overpassService;
	}

	[HttpGet]
	public async Task<IActionResult> GetPeaks(
		double lat,
		double lng,
		int radius
	)
	{
		var result = await _overpassService.GetPeaks(lat, lng, radius);

		return Ok(result);
	}
}
