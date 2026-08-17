import { useState } from 'react'
import './App.css';
import HikeInfo from './components/HikeInfo.tsx';
import HikeMap from './components/HikeMap.tsx';
import WeatherInfo from './components/WeatherInfo.tsx';
import type { WeatherResponse } from './types/weather.ts';

interface HikingPeak {
	id: number;
	name?: string;
	latitude: number;
	longitude: number;
	elevation?: string;
}

interface ElevationResponse {
	elevation: number[];
}

function App() {
	const [selectedPeak, setSelectedPeak] = useState<HikingPeak | null>(null);
	const [weather, setWeather] = useState<WeatherResponse | null>(null);
	const [elevation, setElevation] = useState<ElevationResponse | null>(null);

  return (
    <div className='main-container'>
			<div className='main-content-container'>
				<div className='main-left'>
					<div className='map-container'>
						<HikeMap setSelectedPeak={setSelectedPeak} setWeather={setWeather} setElevation={setElevation} />
					</div>

					<div className='hike-info-container'>
						<HikeInfo elevation={elevation} />
					</div>
				</div>

				<div className='main-right'>
					<div className='weather-info-container'>
						<WeatherInfo selectedPeak={selectedPeak} weather={weather}/>
					</div>
				</div>
			</div>
    </div>
  )
}

export default App
