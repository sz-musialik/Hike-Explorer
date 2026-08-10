'use client';

import { Area, XAxis, YAxis, Tooltip, ResponsiveContainer, AreaChart } from 'recharts';

interface ElevationResponse {
	elevation: number[];
}

interface ElevationChartProps {
	elevation: ElevationResponse | null;
}

interface ElevationPoint {
	pathPoint: number;
	height: number;
}

const ElevationChart = ( {elevation}: ElevationChartProps ) => {
	if (!elevation) {
		return null;
	}

	const chartData: ElevationPoint[] = elevation.elevation.map(
		(height, index) => ({
			pathPoint: index + 1,
			height,
	}));

	// Reverse the array if peak lower than start
	if (chartData.length > 0) {
		if (chartData[0].height > chartData[chartData.length -1].height) {
			chartData.reverse();

			chartData.forEach((point, index) => {
				point.pathPoint = index + 1;
			});
		}
	}

	return (
		<ResponsiveContainer height='100%' width='100%'>
			<AreaChart data={chartData}>
				<Area
					name="Height"
					type="monotone"
					dataKey="height"
					stroke="#0000ff"
					fill="#0000ff"
					fillOpacity={0.5}
				/>

				<XAxis 
					dataKey="pathPoint"
					tick={false}
				/>

				<YAxis
					dataKey="height"
					orientation="left"
					unit="m"
					tick={{ fill: '#000000' }}
					domain={["auto", "auto"]}
				/>

				<Tooltip
					labelFormatter={() => ''}
				/>
			</AreaChart>
		</ResponsiveContainer>
	)
}
export default ElevationChart;
