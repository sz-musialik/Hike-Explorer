import './CurrentWeatherCard.css';
import sunIcon from '../assets/weather/wi-day-sunny.svg';
import moonIcon from '../assets/weather/wi-night-clear.svg';
import cloudySun from '../assets/weather/wi-day-cloudy.svg';
import cloudyMoon from '../assets/weather/wi-night-alt-cloudy.svg';
import fogIcon from '../assets/weather/wi-fog.svg';
import snowIcon from '../assets/weather/wi-snow.svg';
import thunderIcon from '../assets/weather/wi-thunderstorm.svg';
import heavyRain from '../assets/weather/wi-rain.svg';
import type { CurrentWeather } from '../types/weather';

interface CurrentWeatherCardProps {
	currWeather: CurrentWeather | null;
}

const CurrentWeatherCard = ({currWeather}: CurrentWeatherCardProps) => {
	const RenderWeatherStatus = () => {
		// console.log("Weather code is: ", currWeather?.weatherCode);
		if (!currWeather) {
			return <img src={moonIcon}></img>
		}

		// Sun or Moon
		if (currWeather?.weatherCode == 0) {
			if (currWeather.isDay) {
				return <img src={sunIcon}></img>
			}

			return <img src={moonIcon}></img>
		}

		// Cloudy
		if (currWeather.weatherCode < 4) {
			if (currWeather.isDay) {
				return <img src={cloudySun}></img>
			}

			return <img src={cloudyMoon}></img>
		}

		// Fog
		if (currWeather.weatherCode === 45 || currWeather.weatherCode === 48) {
			return <img src={fogIcon}></img>
		}

		// Rain
		if ((currWeather.weatherCode >= 51 && currWeather.weatherCode <= 57) ||
				(currWeather.weatherCode >= 61 && currWeather.weatherCode <= 67) ||
				(currWeather.weatherCode >= 80 && currWeather.weatherCode <= 82)) {
			return <img src={heavyRain}></img>
		}

		// Thunder
		if (currWeather.weatherCode === 95 || currWeather.weatherCode === 96 || currWeather.weatherCode === 99) {
			return <img src={thunderIcon}></img>
		}

		// Snow
		if ((currWeather.weatherCode >= 71 && currWeather.weatherCode <= 77) ||
				(currWeather.weatherCode >= 85 && currWeather.weatherCode <= 86)) {
			return <img src={snowIcon}></img>
		}
	}

	return (
		<div className='current-weather-container'>
			<div className='current-weather-icon-container'>
				{RenderWeatherStatus()}
			</div>

			<span className='current-temp'>{currWeather?.temperature} °C</span>

			<span className='apparent-temp'>Apparent temperature: {currWeather?.apparentTemperature} °C</span>
		</div>
	)
}
export default CurrentWeatherCard;
