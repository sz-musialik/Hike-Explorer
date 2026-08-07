// import { useState } from 'react'
import './App.css';
import Navbar from './components/Navbar.tsx';
import HikeInfo from './components/HikeInfo.tsx';
import 'leaflet/dist/leaflet.css';
import { MapContainer, TileLayer } from 'react-leaflet';

function App() {
  return (
    <div className='main-container'>
			<Navbar/>

			<div className='main-content-container'>
				<div className='main-left'>
					<div className='map-container'>
						<MapContainer
							center={[50.061, 19.937]}
							zoom={13}
							style={{ height: '100%', width: '100%' }}
						>
							<TileLayer
								attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
								url='https://tile.openstreetmap.org/{z}/{x}/{y}.png'
							/>
						</MapContainer>
					</div>

					<div className='hike-info-container'>
						<HikeInfo/>
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
