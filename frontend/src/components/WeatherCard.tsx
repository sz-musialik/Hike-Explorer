import './FutureWeatherCard.css';
import sunIcon from '../assets/sun-icon.svg';

const WeatherCard = () => {
	return (
		<div className='weather-card'>
			<div className='weather-card-item'>
				<span className='weather-timestamp'>19:00</span>
			</div>

			<div className='weather-card-item'>
				<img src={sunIcon} className='weather-icon'></img>
			</div>

			<div className='weather-card-item'>
				<span className='weather-temperature'>20 °C</span>

			</div>
		</div>
	)
}
export default WeatherCard;
