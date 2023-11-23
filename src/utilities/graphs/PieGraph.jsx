import React from 'react';

import EChartsReact from 'echarts-for-react';

function PieGraph({ data, orientation, values }) {
	const option = {
		tooltip: {
			trigger: 'item',
		},

		legend: {
			top: 'top',

			orient: orientation,
			data: data,
			textStyle: {
				fontSize: 12,
			},
		},
		series: [
			{
				name: 'Units',
				type: 'pie',

				top: 40,
				bottom: 10,
				radius: ['50%', '100%'],
				center: 'center',
				avoidLabelOverlap: true,
				itemStyle: {
					borderRadius: 10,
					borderColor: '#fff',
					borderWidth: 2,
				},
				label: {
					show: false,
					position: 'center',
				},
				emphasis: {
					label: {
						show: false,
						fontSize: 16,
						fontWeight: 'bold',
					},
				},
				labelLine: {
					show: false,
				},
				data: values,
			},
		],
	};

	return (
		<div
			style={{
				marginLeft: -25,
				marginRight: -25,
				paddingTop: 10,
				height: '95%',
			}}
		>
			<EChartsReact
				option={option}
				style={{
					padding: 0,
					height: '95%',
				}}
			/>
		</div>
	);
}

export default PieGraph;
