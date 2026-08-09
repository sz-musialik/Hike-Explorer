namespace HikeExplorer.API.DTOs;

public class DailyWeatherDto
{
	public double UvIndex { get; set; }
	public DateTime Sunrise { get; set; }
	public DateTime Sunset { get; set; }
	public double MaxWindSpeed { get; set; }
	public double MaxGustSpeed { get; set; }
	public double PrecipitationProbabilityMax { get; set; }
}
