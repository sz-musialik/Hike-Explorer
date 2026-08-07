namespace HikeExplorer.API.DTOs;

public class PeakDto
{
	public long Id { get; set; }
	public string? Name { get; set; }
	public double Latitude { get; set; }
	public double Longitude { get; set; }
	public string? Elevation { get; set; }
}
