namespace HikeExplorer.API.DTOs;

public class HourlyWeatherDto
{
	public DateTime TimePoint { get; set; }
	public double Temperature { get; set; }
	public double Precipitation { get; set; }
}
