namespace HikeExplorer.API.DTOs;

public class ElevationRequestDto
{
	public List<double> Latitudes { get; set; } = [];
	public List<double> Longitudes { get; set; } = [];
}
