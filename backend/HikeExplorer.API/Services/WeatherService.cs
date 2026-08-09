using System.Globalization;
using System.Text.Json;
using System.Text.Json.Serialization;
using HikeExplorer.API.DTOs;

namespace HikeExplorer.API.Services;

public class WeatherService
{
	private readonly HttpClient _httpClient;

	public WeatherService(HttpClient httpClient)
	{
		_httpClient = httpClient;
	}

	public async Task<WeatherResponseDto> GetWeather( double lat, double lng )
	{
		// API Query

		var query = "https://api.open-meteo.com/v1/forecast" +
			$"?latitude={lat.ToString(CultureInfo.InvariantCulture)}" +
			$"&longitude={lng.ToString(CultureInfo.InvariantCulture)}" +
			$"&current=temperature_2m,apparent_temperature,relative_humidity_2m,is_day,visibility,weather_code" +
			$"&hourly=temperature_2m,precipitation" +
			$"&daily=uv_index_max,precipitation_probability_max,sunrise,sunset,wind_speed_10m_max,wind_gusts_10m_max" +
			$"&forecast_days=1" +
			$"&timezone=auto";

		// Console.WriteLine(query);

		var response = await _httpClient.GetAsync(query);

		var json = await response.Content.ReadAsStringAsync();

		Console.WriteLine(json);
		
		var openmeteoResponse = JsonSerializer.Deserialize<OpenMeteoResponse>(json) ?? new OpenMeteoResponse();

		var result = new WeatherResponseDto
		{
			Current = new CurrentWeatherDto
			{
				IsDay = openmeteoResponse.Current.IsDay == 1,
				Temperature = openmeteoResponse.Current.Temperature,
				ApparentTemperature = openmeteoResponse.Current.ApparentTemperature,
				Humidity = openmeteoResponse.Current.Humidity,
				Visibility = openmeteoResponse.Current.Visibility,
				WeatherCode = openmeteoResponse.Current.WeatherCode
			},

			// TODO: Add an out of bounds check
			Daily = new DailyWeatherDto
			{
				UvIndex = openmeteoResponse.Daily.UvIndex[0],
				Sunrise = openmeteoResponse.Daily.Sunrise[0],
				Sunset = openmeteoResponse.Daily.Sunset[0],
				MaxWindSpeed = openmeteoResponse.Daily.MaxWindSpeed[0],
				MaxGustSpeed = openmeteoResponse.Daily.MaxGustSpeed[0],
				PrecipitationProbabilityMax = openmeteoResponse.Daily.PrecipitationProbabilityMax[0]
			}
		};

		for (var i = 0; i < openmeteoResponse.Hourly.TimePoint.Count; i++)
		{
			result.Hourly.Add(new HourlyWeatherDto
			{
				TimePoint = openmeteoResponse.Hourly.TimePoint[i],
				Temperature = openmeteoResponse.Hourly.Temperature[i],
				Precipitation = openmeteoResponse.Hourly.Precipitation[i]
			});
		}

		return result;
	}
}

class OpenMeteoResponse
{
	[JsonPropertyName("current")]
	public OpenMeteoCurrent Current { get; set; } = new();

	[JsonPropertyName("daily")]
	public OpenMeteoDaily Daily { get; set; } = new();

	[JsonPropertyName("hourly")]
	public OpenMeteoHourly Hourly { get; set; } = new();
}

class OpenMeteoCurrent
{
	[JsonPropertyName("temperature_2m")]
	public double Temperature { get; set; }

	[JsonPropertyName("apparent_temperature")]
	public double ApparentTemperature { get; set; }

	[JsonPropertyName("relative_humidity_2m")]
	public double Humidity { get; set; }

	[JsonPropertyName("is_day")]
	public int IsDay { get; set; }

	[JsonPropertyName("visibility")]
	public double Visibility { get; set; }

	[JsonPropertyName("weather_code")]
	public int WeatherCode { get; set; }
}

class OpenMeteoDaily
{
	[JsonPropertyName("uv_index_max")]
	public List<double> UvIndex { get; set; } = [];

	[JsonPropertyName("sunrise")]
	public List<DateTime> Sunrise { get; set; } = [];

	[JsonPropertyName("sunset")]
	public List<DateTime> Sunset { get; set; } = [];

	[JsonPropertyName("wind_speed_10m_max")]
	public List<double> MaxWindSpeed { get; set; } = [];

	[JsonPropertyName("wind_gusts_10m_max")]
	public List<double> MaxGustSpeed { get; set; } = [];

	[JsonPropertyName("precipitation_probability_max")]
	public List<double> PrecipitationProbabilityMax { get; set; } = [];
}

class OpenMeteoHourly
{
	[JsonPropertyName("time")]
	public List<DateTime> TimePoint { get; set; } = [];

	[JsonPropertyName("temperature_2m")]
	public List<double> Temperature { get; set; } = [];

	[JsonPropertyName("precipitation")]
	public List<double> Precipitation { get; set; } = [];
}
