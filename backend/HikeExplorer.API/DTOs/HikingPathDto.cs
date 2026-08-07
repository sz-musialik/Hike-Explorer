namespace HikeExplorer.API.DTOs;

public class HikingPathDto
{
	public long Id { get; set; }
	public string? Name { get; set; }
	public List<CoordinateDto> Coordinates { get; set; } = [];
}
