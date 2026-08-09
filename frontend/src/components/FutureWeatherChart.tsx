import './FutureWeatherChart.css';
import sunIcon from '../assets/sun-icon.svg';
import moonIcon from '../assets/moon-icon.svg';
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
					<div className='daytime-item-label'>
						<span>Sunrise</span>
						<img src={sunIcon} className='daytime-icon'></img>
					</div>
					<span>{getTimeFormat(dayWeather?.sunrise)}</span>
				</div>

				<div className='daytime-item'>
					<div className='daytime-item-label'>
						<img src={moonIcon} className='daytime-icon'></img>
						<span>Sunset</span>
					</div>
					<span>{getTimeFormat(dayWeather?.sunset)}</span>
				</div>
			</div>

			<div className='weather-chart-container'>

			</div>
		</div>
	)
}
export default FutureWeatherChart;
