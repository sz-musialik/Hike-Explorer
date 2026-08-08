import './CurrentWeatherCard.css';
import sunIcon from '../assets/sun-icon.svg';
import { useState } from 'react';

const CurrentWeatherCard = () => {
	const [temp, setTemp] = useState<number>(20);
	const [apparentTemp, setApparentTemp] = useState<number>(20);
	const [weatherCode, setWeatherCode] = useState<number>(0);

	const RenderWeatherStatus = () => {
		if (weatherCode == 0) {
			return <img src={sunIcon}></img>
		} else {
			return <img src={sunIcon}></img>
		}
	}

	return (
		<div className='current-weather-container'>
			<div className='current-weather-icon-container'>
				{RenderWeatherStatus()}
			</div>

			<span className='current-temp'>{temp} °C</span>

			<span className='apparent-temp'>Apparent temperature: {apparentTemp} °C</span>
		</div>
	)
}
export default CurrentWeatherCard;

