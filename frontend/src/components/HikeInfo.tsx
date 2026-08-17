import './HikeInfo.css';
import ElevationChart from './ElevationChart';
import SkeletonElevationChart from './SkeletonElevationChart';

interface ElevationResponse {
	elevation: number[];
}

interface HikeInfoProps {
	elevation: ElevationResponse | null;
}

const renderSkeletonChart = () => {
	const skeletonElevationData: ElevationResponse = {
		elevation: [
			2000, 2000, 2025, 2025, 2052, 2052, 2052, 2028, 2028, 2060,
			2090, 2090, 2118, 2118, 2118, 2147, 2147, 2120, 2120, 2160,
			2195, 2195, 2230, 2230, 2200, 2200, 2245, 2285, 2285, 2325,
			2325, 2358, 2358, 2320, 2320, 2370, 2410, 2410, 2455, 2455,
			2495, 2495, 2460, 2460, 2510, 2555, 2555, 2595, 2595, 2635,
			2635, 2600, 2600, 2650, 2695, 2695, 2740, 2740, 2775, 2775,
			2740, 2740, 2795, 2840, 2840, 2875, 2875, 2840, 2840, 2895,
			2935, 2935, 2900, 2900, 2950, 2950, 2985, 2985, 2950, 2950,
			2995, 2995, 2960, 2960, 3000, 3000, 2970, 2970, 3000, 3000,
			2980, 2980, 3000, 3000, 2985, 2985, 3000, 3000, 3000, 3000,
		],
	};

	return (
		<div className='skeleton-elevation-container'>
			<SkeletonElevationChart elevation={skeletonElevationData} />

			<div className='skeleton-dialog-container'>
				<span className='skeleton-dialog-header'>Select a route</span>

				<span className='skeleton-dialog-desc'>Select a route near a peak to get its elevation profile</span>
			</div>
		</div>
	)
}

const HikeInfo = ( {elevation}: HikeInfoProps ) => {
	if (!elevation) {
		return renderSkeletonChart();
	}

	return (
		<ElevationChart elevation={elevation} />
	)
}
export default HikeInfo;
