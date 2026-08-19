import './WeatherConditions.css';
import WeatherConditionsCard from './WeatherConditionsCard';
import type { DailyWeather, CurrentWeather } from '../types/weather';

import visibilityIcon from '../assets/conditions/wi-fog.svg';
import uvIcon from '../assets/conditions/wi-hot.svg';
import humidityIcon from '../assets/conditions/wi-raindrop.svg';
import precipitationIcon from '../assets/conditions/wi-showers.svg';
import windGustsIcon from '../assets/conditions/wi-strong-wind.svg';
import windIcon from '../assets/conditions/wi-windy.svg';

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
			<WeatherConditionsCard title='Wind' value={`${dayWeather.maxWindSpeed}`} icon={windIcon} />
			<WeatherConditionsCard title='Wind gusts' value={`${dayWeather.maxGustSpeed}`} icon={windGustsIcon} />
			<WeatherConditionsCard title='Humidity' value={`${currWeather.humidity} %`} icon={humidityIcon} />
			<WeatherConditionsCard title='Precipitation' value={`${dayWeather.precipitationProbabilityMax} %`} icon={precipitationIcon} />
			<WeatherConditionsCard title='Visibility' value={`${getVisibilityInKm()} km`} icon={visibilityIcon} />
			<WeatherConditionsCard title='UV Index' value={`${dayWeather.uvIndex}`} icon={uvIcon} />
		</div>
	)
}
export default WeatherConditions;
