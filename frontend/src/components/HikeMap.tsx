import 'leaflet/dist/leaflet.css';
import { MapContainer, TileLayer, Marker, Tooltip, Polyline } from 'react-leaflet';
import './HikeMap.css';
import HikeMapEvents from './HikeMapEvents.tsx';
import { useState } from 'react';
import L from 'leaflet';
import peakIcon from '../assets/peak-icon.png';

interface HikingPeak {
	id: number;
	name?: string;
	latitude: number;
	longitude: number;
	elevation?: string;
}

interface Coordinate {
	latitude: number;
	longitude: number;
}

interface HikingPath {
	id: number;
	name?: string;
	coordinates: Coordinate[];
}

const Map = () => {
	const [peaks, setPeaks] = useState<HikingPeak[]>([]);
	const [paths, setPaths] = useState<HikingPath[]>([]);
	const iconSize:number = 16;

	const peakMarkerIcon = L.icon({
		iconUrl: peakIcon,
		iconSize: [iconSize, iconSize],
		iconAnchor: [iconSize / 2, iconSize / 2],
	});

	const getPaths = async (lat: number, lng: number) => {
			console.log("Lat: ", lat, " Lng: ", lng);

			try {
				const response = await fetch(`http://127.0.0.1:5133/api/paths?lat=${lat}&lng=${lng}&radius=2000`)

				const data: HikingPath[] = await response.json();
				console.log(data);
				console.log(response.status);

				setPaths(data);
			} catch (error) {
				console.error("Error fetching data: ", error);
			}
	}

	return (
		<MapContainer
			center={[50.061, 19.937]}
			zoom={13}
			style={{ height: '100%', width: '100%' }}
		>
			<TileLayer
				attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
				url='https://tile.opentopomap.org/{z}/{x}/{y}.png'
			/>

			<HikeMapEvents setPeaks={setPeaks}/>

			{peaks.map((peak) => (
				<Marker
					key={peak.id}
					position={[peak.latitude, peak.longitude]}
					icon={peakMarkerIcon}
					eventHandlers={{
						click: () => getPaths(peak.latitude, peak.longitude),
					}}
				>
					<Tooltip>
						{peak.name ?? 'Unnamed peak'}
					</Tooltip>
				</Marker>
			))};

			{paths.map((path) => (
				<Polyline
					key={path.id}
					positions={path.coordinates.map((coordinate) => [
						coordinate.latitude,
						coordinate.longitude,
					])}
					color='red'
				/>
			))}

		</MapContainer>
	)
}
export default Map;
