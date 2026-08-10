using HikeExplorer.API.Services;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
// Learn more about configuring OpenAPI at https://aka.ms/aspnet/openapi
builder.Services.AddOpenApi();
builder.Services.AddControllers();

builder.Services.AddHttpClient<OverpassService>();
builder.Services.AddHttpClient<WeatherService>();
builder.Services.AddHttpClient<ElevationService>();

builder.Services.AddCors(options =>
{
	options.AddPolicy("AllowReact", policy =>
	{
		policy
			.WithOrigins("http://localhost:5173")
			.AllowAnyHeader()
			.AllowAnyMethod();
	});
});

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
	app.MapOpenApi();
}

app.UseHttpsRedirection();

app.UseCors("AllowReact");

app.MapControllers();

app.Run();
