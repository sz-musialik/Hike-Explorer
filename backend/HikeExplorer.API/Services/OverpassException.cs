public class OverpassException : Exception
{
	public int StatusCode { get; }

	public OverpassException(string message, int statusCode) : base(message)
	{
		StatusCode = statusCode;
	}
}
