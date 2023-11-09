import React from 'react';
import EChartsReact from 'echarts-for-react';

function LineGraph({ data, orientation, values }) {
	const option = {
		tooltip: {
			trigger: 'item',
		},
		legend: {
			top: 'top',
			center: 'center',
			orient: orientation,
			data: ['Sales'],
			textStyle: {
				fontSize: 14,
			},
		},
		xAxis: {
			type: 'category',
			data: data,
		},
		yAxis: {},
		series: [
			{
				name: 'Sales',
				type: 'line',
				data: values,
				itemStyle: {
					color: '#5FC22A', // Set the color to blue
				},
			},
		],
	};

	return (
		<div style={{ height: '450px' }}>
			<EChartsReact
				option={option}
				style={{ height: '100%' }}
			/>
		</div>
	);
}

export default LineGraph;
