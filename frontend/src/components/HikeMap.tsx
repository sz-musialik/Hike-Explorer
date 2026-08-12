import 'leaflet/dist/leaflet.css';
import { MapContainer, TileLayer, Marker, Tooltip, Polyline } from 'react-leaflet';
import './HikeMap.css';
import HikeMapEvents from './HikeMapEvents.tsx';
import { useState } from 'react';
import L from 'leaflet';
import peakIcon from '../assets/peak-icon.png';
import type { Dispatch, SetStateAction } from 'react';
import type { WeatherResponse } from '../types/weather.ts';

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

interface ElevationResponse {
	elevation: number[];
}

interface HikeMapProps {
	setSelectedPeak: Dispatch<SetStateAction<HikingPeak | null>>;
	setWeather: Dispatch<SetStateAction<WeatherResponse | null>>;
	setElevation: Dispatch<SetStateAction<ElevationResponse | null>>;
}

const Map = ( {setSelectedPeak, setWeather, setElevation}: HikeMapProps ) => {
	const [peaks, setPeaks] = useState<HikingPeak[]>([]);
	const [paths, setPaths] = useState<HikingPath[]>([]);
	const iconSize:number = 16;
	const maxElevationPoints = 100;

	const peakMarkerIcon = L.icon({
		iconUrl: peakIcon,
		iconSize: [iconSize, iconSize],
		iconAnchor: [iconSize / 2, iconSize / 2],
	});

	const GetPaths = async (lat: number, lng: number) => {
		try {
			const response = await fetch(`http://127.0.0.1:5133/api/paths?lat=${lat}&lng=${lng}&radius=2000`)

			if (!response.ok) {
				throw new Error(`Paths request failed: ${response.status}`);
			}

			const data: HikingPath[] = await response.json();

			setPaths(data);
		} catch (error) {
			console.error("Error fetching data: ", error);
		}
	}

	const GetWeather = async (lat: number, lng: number) => {
		console.log("Lat: ", lat, " Lng: ", lng);

		try {
			const response = await fetch(`http://127.0.0.1:5133/api/weather?lat=${lat}&lng=${lng}`)

			if (!response.ok) {
				throw new Error(`Weather request failed: ${response.status}`);
			}

			const data: WeatherResponse = await response.json();

			setWeather(data);
		} catch (error) {
			console.error("Error fetching data: ", error);
		}
	}

	const GetPathElevation = async (path: HikingPath) => {
		const coordinates = path.coordinates;
		let selectedCoordinates = coordinates;

		// Limiting the points sent in the Api request to maxElevationPoints
		if (coordinates.length > maxElevationPoints) {
			const step = (coordinates.length - 1) / (maxElevationPoints - 1);

			selectedCoordinates = Array.from(
				{ length: maxElevationPoints },
				(_, index) => coordinates[Math.round(index * step)]
			);
		}

		try {
			const latitudes = selectedCoordinates
				.map((coordinate) => coordinate.latitude)
				.join(',')

			const longitudes = selectedCoordinates
				.map((coordinate) => coordinate.longitude)
				.join(',')

			const response = await fetch(`http://127.0.0.1:5133/api/elevation?latitude=${latitudes}&longitude=${longitudes}`)

			if (!response.ok) {
				throw new Error(`Elevation request failed: ${response.status}`);
			}

			const data: ElevationResponse = await response.json();

			setElevation(data);
		} catch (error) {
			console.error("Error fetching Elevation data: ", error);
		} finally {
		}
	}

	return (
		<MapContainer
			center={[50.061, 19.937]}
			zoom={13}
			style={{ height: '100%', width: '100%', borderRadius: '0.25rem', overflow: 'hidden' }}
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
						click: () => {
							GetPaths(peak.latitude, peak.longitude)
							setSelectedPeak(peak)
							GetWeather(peak.latitude, peak.longitude)
						},
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
					eventHandlers={{
						click: () => {
							// Disable fetching new peaks from Api
							// L.DomEvent.stopPropagation(event.originalEvent);
							console.log("Path Click");
							GetPathElevation(path)
						}
					}}
				/>
			))}

		</MapContainer>
	)
}
export default Map;
