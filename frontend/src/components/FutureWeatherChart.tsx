import './FutureWeatherChart.css';
import sunIcon from '../assets/conditions/wi-sunrise.svg';
import moonIcon from '../assets/conditions/wi-moonrise.svg';
import TemperatureChart from './TemperatureChart.tsx';
import type { DailyWeather, HourlyWeather } from '../types/weather';

interface FutureWeatherChartProps {
	dayWeather: DailyWeather | null;
	hourWeather: HourlyWeather[] | null;
}

const FutureWeatherChart = ({dayWeather, hourWeather}: FutureWeatherChartProps) => {
	const getTimeFormat = (timeString: string | undefined) => {
		// console.log("sunrise: ", dayWeather?.sunrise, ", sunset: ", dayWeather?.sunset);
		if (!timeString) {
			return null;
		}

		return timeString.slice(11, 16);
	}

	return (
		<div className='future-weather-container'>
			<div className='daytime-container'>
				<div className='daytime-item'>
					<div className='daytime-item-text'>
						<span className='daytime-item-label'>Sunrise</span>
						<span>{getTimeFormat(dayWeather?.sunrise)}</span>
					</div>
					<img src={sunIcon} className='daytime-icon'></img>
				</div>

				<div className='daytime-item'>
					<img src={moonIcon} className='daytime-icon'></img>
					<div className='daytime-item-text'>
						<span className='daytime-item-label'>Sunset</span>
						<span>{getTimeFormat(dayWeather?.sunset)}</span>
					</div>
				</div>
			</div>

			<div className='weather-chart-container'>
				<TemperatureChart hourWeather={hourWeather}/>
			</div>
		</div>
	)
}
export default FutureWeatherChart;
