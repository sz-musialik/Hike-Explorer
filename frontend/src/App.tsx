// import { useState } from 'react'
import './App.css';
import Navbar from './components/Navbar.tsx';
import HikeInfo from './components/HikeInfo.tsx';
import HikeMap from './components/HikeMap.tsx';

function App() {
  return (
    <div className='main-container'>
			<Navbar />

			<div className='main-content-container'>
				<div className='main-left'>
					<div className='map-container'>
						<HikeMap />
					</div>

					<div className='hike-info-container'>
						<HikeInfo />
					</div>
				</div>

				<div className='main-right'>
					<div className='location-info-container'>

					</div>
				</div>
			</div>
    </div>
  )
}

export default App
