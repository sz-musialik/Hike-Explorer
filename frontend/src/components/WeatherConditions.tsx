import { useState } from 'react';
import './WeatherConditions.css';

const WeatherConditions = () => {
	const [windSpeed, setWindSpeed] = useState<number>(20);
	const [windGust, setWindGust] = useState<number>(30);
	const [humidity, setHumidity] = useState<number>(70);
	const [precipitation, setPrecipitation] = useState<number>(50);
	const [visibility, setVisibility] = useState<number>(50);
	const [uv, setUv] = useState<number>(5);


	return (
		<div className='weather-conditions-container'>
			<div className='conditions-container'>
				<div className='conditions-wind-container'>
					<span>Wind</span>
					<span>{windSpeed}</span>
				</div>

				<div className='conditions-wind-container'>
					<span>Wind gusts</span>
					<span>{windGust}</span>
				</div>
			</div>

			<div className='conditions-container'>
				<span>Humidity</span>
				<span>{humidity}</span>
			</div>

			<div className='conditions-container'>
				<span>Precipitation</span>
				<span>{precipitation}</span>
			</div>

			<div className='conditions-container'>
				<span>Visibility</span>
				<span>{visibility}</span>
			</div>

			<div className='conditions-container'>
				<span>UV index</span>
				<span>{uv}</span>
			</div>

		</div>
	)
}
export default WeatherConditions;
