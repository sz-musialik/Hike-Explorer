import './WeatherInfo.css';
import FutureWeatherChart from './FutureWeatherChart.tsx';
import CurrentWeatherCard from './CurrentWeatherCard.tsx';
import WeatherConditions from './WeatherConditions.tsx';
import type { WeatherResponse } from '../types/weather.ts';

interface HikingPeak {
	id: number;
	name?: string;
	latitude: number;
	longitude: number;
	elevation?: string;
}

interface WeatherInfoProps {
	selectedPeak: HikingPeak | null;
	weather: WeatherResponse | null;
}

const WeatherInfo = ( {selectedPeak, weather}: WeatherInfoProps ) => {
	if (!weather) {
		return (
			<div className='weather-fetch-failed'>
				<span>Weather fetching failed!</span>
			</div>
		)
	}

	return (
		<div className='weather-card-container'>
			<div className='weather-location-container'>
				<span className='weather-location-desc'>Selected Peak:</span>
				<span className='weather-location-peak'>
					{selectedPeak ? selectedPeak.name : ""}
				</span>
			</div>

			<CurrentWeatherCard currWeather={weather?.current ?? null} />

			<WeatherConditions dayWeather={weather?.daily ?? null} currWeather={weather?.current ?? null} />

			<FutureWeatherChart dayWeather={weather?.daily ?? null} hourWeather={weather?.hourly ?? null} />
		</div>
	)
}
export default WeatherInfo;
