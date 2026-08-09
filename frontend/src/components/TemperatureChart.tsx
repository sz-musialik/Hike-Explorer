'use client';

import './TemperatureChart.css';
import type { HourlyWeather } from '../types/weather';
import { ComposedChart, Bar, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

interface TemperatureChartProps {
	hourWeather: HourlyWeather[] | null;
}

const TemperatureChart = ({hourWeather}: TemperatureChartProps) => {
	if (!hourWeather) {
		return null;
	}

	const formatHour = (value: string) => {
		const date = new Date(value);

		return date.toLocaleTimeString('pl-PL', {
			hour: '2-digit',
			minute: '2-digit',
		});
	};

	return (
		<ResponsiveContainer height='100%' width='100%'>
			<ComposedChart
				data={hourWeather}
				margin={{
					top: 8,
					right: 8,
					left: 0,
					bottom: 0,
				}}
			>
				<XAxis 
					dataKey="timePoint"
					tickFormatter={formatHour}
					interval={4}
					tick={{ fill: '#000000' }}
				/>

				<YAxis
					yAxisId="temperature"
					orientation="left"
					unit="°C"
					tick={{ fill: '#000000' }}
				/>

				<YAxis
					yAxisId="precipitation"
					orientation="right"
					unit="mm"
					domain={[0, 3]}
					tick={{ fill: '#000000' }}
				/>

				<Tooltip
					contentStyle={{
						backgroundColor: '#ffffff88',
						border: '1px solid #ffffff',
						borderRadius: '4px',
					}}

					labelStyle={{
						color: '#000000',
						fontWeight: 'bold',
					}}

					itemStyle={{
						color: '#000000',
					}}

					labelFormatter={(value) => formatHour(String(value))}
					formatter={(value, name) => {
						if (name === 'Temperature') {
							return [`${value} °C`, 'Temperature'];
						}

						if (name === 'Precipitation') {
							return [`${value} mm`, 'Precipitation'];
						}

						return [value, name];
					}}
				/>

				<Area
					name="Temperature"
					type="monotone"
					dataKey="temperature"
					yAxisId="temperature"
					stroke="#ffffff"
					fill="#ffffff"
					fillOpacity={0.5}
				/>

				<Bar
					yAxisId="precipitation"
					dataKey="precipitation"
					name="Precipitation"
					fill='#3b82f6'
				/>
			</ComposedChart>
		</ResponsiveContainer>
	)
}
export default TemperatureChart;
