import 'leaflet/dist/leaflet.css';
import { MapContainer, TileLayer } from 'react-leaflet';
import './HikeMap.css';
import HikeMapEvents from './HikeMapEvents.tsx';

const Map = () => {
	return (
		<MapContainer
			center={[50.061, 19.937]}
			zoom={13}
			style={{ height: '100%', width: '100%' }}
		>
			<TileLayer
				attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
				url='https://tile.openstreetmap.org/{z}/{x}/{y}.png'
			/>

			<HikeMapEvents />
		</MapContainer>
	)
}
export default Map;
