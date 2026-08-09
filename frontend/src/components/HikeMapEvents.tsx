import type { Dispatch, SetStateAction } from 'react';
import { useMapEvents } from 'react-leaflet';

interface HikingPeak {
	id: number;
	name?: string;
	latitude: number;
	longitude: number;
	elevation?: string;
}

interface HikeMapEventsProps {
	setPeaks: Dispatch<SetStateAction<HikingPeak[]>>;
}

const HikeMapEvents = ({ setPeaks }: HikeMapEventsProps) => {
	useMapEvents({
		async click(event) {
			const lat = event.latlng.lat;
			const lng = event.latlng.lng;

			console.log("Lat: ", lat, " Lng: ", lng);

			try {
				const response = await fetch(`http://127.0.0.1:5133/api/peaks?lat=${lat}&lng=${lng}&radius=10000`)

				const data: HikingPeak[] = await response.json();
				console.log(data);
				console.log(response.status);

				setPeaks(data);
			} catch (error) {
				console.error("Error fetching data: ", error);
			}
		},
	});

	return null;
}
export default HikeMapEvents;
