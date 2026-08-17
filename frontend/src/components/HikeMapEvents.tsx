import type { Dispatch, SetStateAction } from 'react';
import { useMapEvents } from 'react-leaflet';
import  { toast } from 'react-toastify';
import { Flip } from 'react-toastify/unstyled';

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
				toast.error('Couldn\'t load peaks data.', {
					position: "bottom-center",
					autoClose: 5000,
					hideProgressBar: false,
					closeOnClick: false,
					pauseOnHover: true,
					draggable: true,
					progress: undefined,
					theme: "colored",
					transition: Flip,
				});
			}
		},
	});

	return null;
}
export default HikeMapEvents;
