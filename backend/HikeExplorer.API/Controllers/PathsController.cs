using Microsoft.AspNetCore.Mvc;
using HikeExplorer.API.Services;

[ApiController]
[Route("api/paths")]
public class PathsController : ControllerBase
{
	private readonly OverpassService _overpassService;

	public PathsController(OverpassService overpassService)
	{
		_overpassService = overpassService;
	}

	[HttpGet]
	public async Task<IActionResult> GetPaths(
		double lat,
		double lng,
		int radius
	)
	{
		var result = await _overpassService.GetPaths(lat, lng, radius);

		return Ok(result);
	}
}
