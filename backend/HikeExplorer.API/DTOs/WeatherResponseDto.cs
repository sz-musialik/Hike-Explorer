namespace HikeExplorer.API.DTOs;

public class WeatherResponseDto
{
	public CurrentWeatherDto Current { get; set; } = new();
	public DailyWeatherDto Daily { get; set; } = new();
	public List<HourlyWeatherDto> Hourly { get; set; } = new();
}
