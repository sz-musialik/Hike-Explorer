'use client';

import { Area, XAxis, YAxis, ResponsiveContainer, AreaChart } from 'recharts';

interface ElevationInterface {
	elevation: number[];
}

interface SkeletonElevationChartProps {
	elevation: ElevationInterface | null;
}

interface ElevationPoint {
	pathPoint: number;
	height: number;
}

const SkeletonElevationChart = ( {elevation}: SkeletonElevationChartProps ) => {
	if (!elevation) {
		return null;
	}

	const chartData: ElevationPoint[] = elevation.elevation.map(
		(height, index) => ({
			pathPoint: index + 1,
			height,
	}));

	return (
		<ResponsiveContainer height='100%' width='100%'>
			<AreaChart
				data={chartData}
				margin={{
					top: 16,
					right: 16,
					bottom: 16,
					left: 16,
				}}
			>
				<Area
					name="Height"
					type="monotone"
					dataKey="height"
					stroke='var(--color-warm-white)'
					fill='var(--color-warm-white)'
					strokeWidth='2px'
					fillOpacity={0.1}
				/>

				<XAxis 
					dataKey="pathPoint"
					tick={false}
					height={5}
				/>

				<YAxis
					dataKey="height"
					orientation="left"
					unit="m"
					tick={{ fill: 'var(--color-warm-white)' }}
					domain={["auto", "auto"]}
				/>
			</AreaChart>
		</ResponsiveContainer>
	)
}
export default SkeletonElevationChart;
