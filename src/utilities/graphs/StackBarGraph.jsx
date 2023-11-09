import React from 'react';
import EChartsReact from 'echarts-for-react';

function StackBarGraph({ data, orientation, values }) {
	const barColors = ['#0D2B4D', '#2A4B71', '#5E7B9D', '#96ACC5'];
	const seriesColors = values.map(
		(item, index) => barColors[index % barColors.length]
	);

	const option = {
		legend: {
			data: values.map((item) => item.name),
			center: 'center',
		},
		tooltip: {},
		xAxis: {
			type: 'category',
			data: data,
			name: 'X Axis',
			axisLine: { onZero: true },
			splitLine: { show: false },
			splitArea: { show: false },
		},
		yAxis: {},
		series: values.map((item, index) => ({
			name: item.name,
			type: 'bar',
			stack: 'one',
			emphasis: {
				focus: 'series',
				itemStyle: {
					shadowBlur: 10,
					shadowColor: 'rgba(0,0,0,0.3)',
				},
			},
			itemStyle: {
				color: seriesColors[index],
			},
			data: item.values,
		})),
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

export default StackBarGraph;
