import { useState } from 'react'
import './App.css';
import Navbar from './components/Navbar.tsx';
import HikeInfo from './components/HikeInfo.tsx';
import HikeMap from './components/HikeMap.tsx';
import WeatherInfo from './components/WeatherInfo.tsx';

interface HikingPeak {
	id: number;
	name?: string;
	latitude: number;
	longitude: number;
	elevation?: string;
}

function App() {
	const [selectedPeak, setSelectedPeak] = useState<HikingPeak | null>(null);

  return (
    <div className='main-container'>
			<Navbar />

			<div className='main-content-container'>
				<div className='main-left'>
					<div className='map-container'>
						<HikeMap setSelectedPeak={setSelectedPeak} />
					</div>

					<div className='hike-info-container'>
						<HikeInfo />
					</div>
				</div>

				<div className='main-right'>
					<div className='weather-info-container'>
						<WeatherInfo selectedPeak={selectedPeak} />
					</div>
				</div>
			</div>
    </div>
  )
}

export default App
