// import { useState } from 'react'
import './App.css'
import Navbar from './components/Navbar.tsx';
import Map from './components/Map.tsx';
import HikeInfo from './components/HikeInfo.tsx';

function App() {
  // const [count, setCount] = useState(0)

  return (
    <div className='main-container'>
			<Navbar/>

			<div className='main-content-container'>

				<div className='main-left'>
					<div className='map-container'>
						<Map/>
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
