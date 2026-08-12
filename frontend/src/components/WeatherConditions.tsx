import './WeatherConditions.css';
import type { DailyWeather, CurrentWeather } from '../types/weather';

interface WeatherConditionsProps {
	dayWeather: DailyWeather | null;
	currWeather: CurrentWeather | null;
}

const WeatherConditions = ({dayWeather, currWeather}: WeatherConditionsProps) => {
	if (!dayWeather || !currWeather) {
		return null;
	}

	const getVisibilityInKm = () => {
		return currWeather.visibility / 1000;
	}

	return (
		<div className='weather-conditions-container'>
			<div className='conditions-container'>
				<div className='conditions-wind-container'>
					<span>Wind</span>
					<span>{dayWeather.maxWindSpeed} km/h</span>
				</div>

				<div className='conditions-wind-container'>
					<span>Wind gusts</span>
					<span>{dayWeather.maxGustSpeed} km/h</span>
				</div>
			</div>

			<div className='conditions-container'>
				<span>Humidity</span>
				<span>{currWeather.humidity}%</span>
			</div>

			<div className='conditions-container'>
				<span>Precipitation</span>
				<span>{dayWeather.precipitationProbabilityMax}%</span>
			</div>

			<div className='conditions-container'>
				<span>Visibility</span>
				<span>{getVisibilityInKm()} km</span>
			</div>

			<div className='conditions-container'>
				<span>UV index</span>
				<span>{dayWeather.uvIndex}</span>
			</div>
		</div>
	)
}
export default WeatherConditions;
