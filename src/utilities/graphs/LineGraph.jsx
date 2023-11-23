import React from 'react';
import EChartsReact from 'echarts-for-react';

function LineGraph({ data, orientation, values, name }) {
	const option = {
		tooltip: {
			trigger: 'item',
		},
		legend: {
			top: 'top',
			center: 'center',
			orient: orientation,
			data: [`${name}`],
			textStyle: {
				fontSize: 14,
			},
		},
		xAxis: {
			// type: 'category',
			data: data,
		},
		yAxis: {},
		grid: {
			itemStyle: {
				color: '#FFF', // Set the color to blue
			},
		},
		series: [
			{
				name: name,
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
				style={{ height: '100%', width: '110%' }}
			/>
		</div>
	);
}

export default LineGraph;
