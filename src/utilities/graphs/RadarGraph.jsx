import React from 'react';
import EChartsReact from 'echarts-for-react';

function RadarGraph({ points }) {
	const option = {
		title: {
			text: '',
		},
		legend: {},
		tooltip: {},
		radar: {
			indicator: [
				{ name: 'Large Rooms', max: 10 },
				{ name: 'Small Rooms', max: 10 },
				{ name: 'High-Level Floors', max: 10 },
				{ name: 'Low-Level Floors', max: 10 },
				{ name: 'Mid-Level Floors', max: 10 },
			],

			axisLine: {
				lineStyle: {
					color: 'rgba(86, 86, 86, 1)',
				},
			},
			splitLine: {
				lineStyle: {
					color: 'rgba(199, 205, 215, 1)',
				},
			},
			splitArea: {
				areaStyle: {
					color: ['rgba(191, 194, 198, 1)', 'rgba(78, 91, 110, 1)'], // Set the colors for the split areas
				},
			},
		},
		series: [
			{
				name: 'Points',
				type: 'radar',
				data: [
					{
						value: [
							points['Large Rooms'] || 0,
							points['Small Rooms'] || 0,
							points['High-Level Floors'] || 0,
							points['Low-Level Floors'] || 0,
							points['Mid-Level Floors'] || 0,
						],
					},
				],
				// Modify area color
				areaStyle: {
					color: 'rgba(73, 121, 169, 0.9)', // Change the color here
				},
				// Modify line color
				lineStyle: {
					color: 'rgba(11, 59, 108, 0.99)', // Change the color here
				},
			},
		],
	};

	return (
		<div style={{ height: 420 }}>
			<EChartsReact
				option={option}
				style={{ height: '100%' }}
			/>
		</div>
	);
}

export default RadarGraph;
