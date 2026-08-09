namespace HikeExplorer.API.DTOs;

public class CurrentWeatherDto
{
	public bool IsDay { get; set; }
	public double Temperature { get; set; }
	public double ApparentTemperature { get; set; }
	public double Humidity { get; set; }
	public double Visibility { get; set; }
	public int WeatherCode { get; set; }
}
