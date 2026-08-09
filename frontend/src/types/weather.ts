export interface CurrentWeather {
	isDay: boolean;
	temperature: number;
	apparentTemperature: number;
	humidity: number;
	visibility: number;
	weatherCode: number;
}

export interface DailyWeather {
	uvIndex: number;
	sunrise: string;
	sunset: string;
	maxWindSpeed: number;
	maxGustSpeed: number;
	precipitationProbabilityMax: number;
}

export interface HourlyWeather {
	timePoint: string;
	temperature: number;
	precipication: number;
}

export interface WeatherResponse {
	current: CurrentWeather;
	daily: DailyWeather;
	hourly: HourlyWeather[];
}
