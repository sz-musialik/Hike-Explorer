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
			// Ignore if tried to click a path
			const target = event.originalEvent.target as HTMLElement;

			if (target.classList.contains('leaflet-interactive')) {
				return;
			}

			const lat = event.latlng.lat;
			const lng = event.latlng.lng;

			try {
				const response = await fetch(`http://127.0.0.1:5133/api/peaks?lat=${lat}&lng=${lng}&radius=10000`)

				if (!response.ok) {
					throw new Error(`Peaks request failed: ${response.status}`);
				}

				const data: HikingPeak[] = await response.json();

				setPeaks(data);
			} catch (error) {
				console.error("Error fetching peaks: ", error);
			}
		},
	});

	return null;
}
export default HikeMapEvents;
