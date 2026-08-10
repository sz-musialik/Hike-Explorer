import './HikeInfo.css';
import ElevationChart from './ElevationChart';

interface ElevationResponse {
	elevation: number[];
}

interface HikeInfoProps {
	elevation: ElevationResponse | null;
}

const HikeInfo = ( {elevation}: HikeInfoProps ) => {
	return (
		<div className='elevation-chart-container'>
			<ElevationChart elevation={elevation} />
		</div>
	)
}
export default HikeInfo;
