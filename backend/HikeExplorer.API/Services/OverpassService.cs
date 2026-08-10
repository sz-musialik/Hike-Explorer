using System.Globalization;
using System.Text.Json;
using System.Text.Json.Serialization;
using HikeExplorer.API.DTOs;

namespace HikeExplorer.API.Services;

public class OverpassService
{
	private readonly HttpClient _httpClient;

	public OverpassService(
		HttpClient httpClient
	)
	{
		_httpClient = httpClient;
		_httpClient.DefaultRequestHeaders.UserAgent.ParseAdd(
			"HikeExplorer/1.0"
		);
	}

	public async Task<List<PeakDto>> GetPeaks(
		double lat,
		double lng,
		int radius
	)
	{
		// API Query
		var query = $"""
		[out:json][timeout:25];
		(
			node(around:{radius},{lat.ToString(CultureInfo.InvariantCulture)},{lng.ToString(CultureInfo.InvariantCulture)})["natural"="peak"];
		);
		out body;
		>;
		out skel qt;
		""";

		// Console.WriteLine(query);

		var form = new FormUrlEncodedContent(
			new[]
			{
				new KeyValuePair<string,string>(
					"data",
					query
				)
			}
    );

		// API Request
		var response = await _httpClient.PostAsync(
			"https://overpass-api.de/api/interpreter",
			form
		);

		if (!response.IsSuccessStatusCode)
		{
			var errorBody = await response.Content.ReadAsStringAsync();

			Console.WriteLine(
				$"Overpass Api: error: {(int)response.StatusCode} {response.StatusCode}"
			);

			Console.WriteLine(errorBody);

			throw new OverpassException(
				$"Overpass Api returned: {(int)response.StatusCode} ({response.StatusCode}).",
				(int)response.StatusCode
			);
		}

		// JSON Response
		var json = await response.Content.ReadAsStringAsync();

		// Data deserialization
		var overpassResponse = JsonSerializer.Deserialize<OverpassResponse>(json) ?? new OverpassResponse();

		// DTO Creation
		var result = new List<PeakDto>();

		foreach (var element in overpassResponse.Elements)
		{
			result.Add(new PeakDto
			{
				Id = element.Id,
				Name = element.Tags?.GetValueOrDefault("name"),
				Latitude = element.Lat!.Value,
				Longitude = element.Lon!.Value,
				Elevation = element.Tags?.GetValueOrDefault("ele")
			});
		}

		return result;
	}

	public async Task<List<HikingPathDto>> GetPaths(
		double lat,
		double lng,
		int radius
	)
	{
		// API Query
		var query = $"""
		[out:json][timeout:25];
		(
			way(around:{radius},{lat.ToString(CultureInfo.InvariantCulture)},{lng.ToString(CultureInfo.InvariantCulture)})["highway"="path"];
		);
		out body;
		>;
		out skel qt;
		""";

		var form = new FormUrlEncodedContent(
			new[]
			{
				new KeyValuePair<string,string>(
					"data",
					query
				)
			}
    );

		// API Request
		var response = await _httpClient.PostAsync(
			"https://overpass-api.de/api/interpreter",
			form
		);

		if (!response.IsSuccessStatusCode)
		{
			var errorBody = await response.Content.ReadAsStringAsync();

			Console.WriteLine(
				$"Overpass Api: error: {(int)response.StatusCode} {response.StatusCode}"
			);

			Console.WriteLine(errorBody);

			throw new OverpassException(
				$"Overpass Api returned: {(int)response.StatusCode} ({response.StatusCode}).",
				(int)response.StatusCode
			);
		}

		// JSON Response
		var json = await response.Content.ReadAsStringAsync();

		// Console.WriteLine(json);

		var overpassResponse = JsonSerializer.Deserialize<OverpassResponse>(json) ?? new OverpassResponse();

		// DTO Creation
		var result = new List<HikingPathDto>();

		var nodes = overpassResponse.Elements
			.Where(e => e.Type == "node")
			.ToDictionary(
					e => e.Id,
					e => new CoordinateDto
					{
						Latitude = e.Lat!.Value,
						Longitude = e.Lon!.Value
					}
			);

		foreach (var element in overpassResponse.Elements)
		{
			if (element.Type == "way")
			{
				var path = new HikingPathDto{
					Id = element.Id,
					Name = element.Tags?.GetValueOrDefault("name"),
				};

				foreach (var nodeId in element.Nodes ?? [])
				{
					if (nodes.TryGetValue(nodeId, out var coordinate))
					{
						path.Coordinates.Add(coordinate);
					}
				}
				result.Add(path);
			}
		}

		return result;
	}
}

class OverpassResponse
{
	[JsonPropertyName("elements")]
	public List<OverpassElement> Elements { get; set; } = [];
}

class OverpassElement
{
	[JsonPropertyName("type")]
	public string Type { get; set; } = "";
	[JsonPropertyName("id")]
	public long Id { get; set; }

	[JsonPropertyName("lat")]
	public double? Lat { get; set; }
	[JsonPropertyName("lon")]
	public double? Lon { get; set; }

	[JsonPropertyName("nodes")]
	public List<long>? Nodes { get; set; }

	[JsonPropertyName("tags")]
	public Dictionary<string, string>? Tags { get; set; }
}
