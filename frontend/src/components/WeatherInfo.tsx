import './WeatherInfo.css';
import FutureWeatherChart from './FutureWeatherChart.tsx';
import CurrentWeatherCard from './CurrentWeatherCard.tsx';
import WeatherConditions from './WeatherConditions.tsx';

interface HikingPeak {
	id: number;
	name?: string;
	latitude: number;
	longitude: number;
	elevation?: string;
}

interface WeatherInfoProps {
	selectedPeak: HikingPeak | null;
}

const WeatherInfo = ( {selectedPeak}: WeatherInfoProps ) => {
	console.log("selected peak lat is: ", selectedPeak?.latitude, " lon: ", selectedPeak?.longitude);

	const getWeatherForeceast = async (latitude: number, longitude: number) => {

		try {
			const response = await fetch(`http://127.0.0.1:5133/api/weather?lat=${latitude}&lng=${longitude}`)

		} catch (error) {
			console.error("Error fetching data: ", error);
		}
	}




	return (
		<div className='weather-card-container'>
			<div className='weather-location-container'>
				<span className='weather-location-desc'>Selected Peak:</span>
				<span className='weather-location-peak'>Rysy</span>
			</div>

			<CurrentWeatherCard />

			<WeatherConditions />

			<FutureWeatherChart />
		</div>
	)
}
export default WeatherInfo;
