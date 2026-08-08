import './FutureWeatherChart.css';
import sunIcon from '../assets/sun-icon.svg';
import moonIcon from '../assets/moon-icon.svg';

const FutureWeatherChart = () => {
	return (
		<div className='future-weather-container'>
			<div className='daytime-container'>
				<div className='daytime-item'>
					<div className='daytime-item-label'>
						<span>Sunrise</span>
						<img src={sunIcon} className='daytime-icon'></img>
					</div>
					<span>05:18</span>
				</div>

				<div className='daytime-item'>
					<div className='daytime-item-label'>
						<img src={moonIcon} className='daytime-icon'></img>
						<span>Sunset</span>
					</div>
					<span>20:39</span>
				</div>
			</div>

			<div className='weather-chart-container'>

			</div>
		</div>
	)
}
export default FutureWeatherChart;
