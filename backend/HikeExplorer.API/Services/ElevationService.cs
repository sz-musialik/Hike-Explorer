using System.Globalization;
using System.Text.Json;
using System.Text.Json.Serialization;
using HikeExplorer.API.DTOs;

namespace HikeExplorer.API.Services;

public class ElevationService
{
	private readonly HttpClient _httpClient;

	public ElevationService(HttpClient httpClient)
	{
		_httpClient = httpClient;
	}

	public async Task<ElevationResponseDto> GetElevation(ElevationRequestDto request)
	{
		if (request.Latitudes.Count != request.Longitudes.Count)
		{
			throw new ArgumentException(
				"Latitude and longitude arrays must have the same number of elements.");
		}

		if (request.Latitudes.Count == 0)
		{
			throw new ArgumentException("At least one coordinate is required.");
		}

		var latitudeQuery = string.Join(
			",",
			request.Latitudes.Select(lat => lat.ToString(CultureInfo.InvariantCulture))
		);

		var longitudeQuery = string.Join(
			",",
			request.Longitudes.Select(lng => lng.ToString(CultureInfo.InvariantCulture))
		);

		var query = "https://api.open-meteo.com/v1/elevation" +
			$"?latitude={latitudeQuery}" +
			$"&longitude={longitudeQuery}";

		var response = await _httpClient.GetAsync(query);

		response.EnsureSuccessStatusCode();

		var json = await response.Content.ReadAsStringAsync();

		// Console.WriteLine(json);

		var openMeteoResponse = JsonSerializer.Deserialize<ElevationResponse>(json)
			?? new ElevationResponse();

		return new ElevationResponseDto
		{
			Elevation = openMeteoResponse.Elevation
		};
	}
}

class ElevationResponse
{
	[JsonPropertyName("elevation")]
	public List<double> Elevation { get; set; } = [];
}
