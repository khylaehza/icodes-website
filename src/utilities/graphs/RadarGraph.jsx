import React from "react";
import EChartsReact from "echarts-for-react";

function RadarGraph({ points }) {
  const option = {
    title: {
      text: 'Points Basis'
    },
    legend: {},
    tooltip: {},
    radar: {
      indicator: [
        { name: 'Larger', max: 10 },
        { name: 'Smaller', max: 10 },
        { name: 'Higher', max: 10 },
        { name: 'Lower', max: 10 },
        { name: 'Medium', max: 10 },
      ],

      axisLine: {
        lineStyle: {
          color: 'rgba(86, 86, 86, 1)', 
        },
      },
      splitLine: {
        lineStyle: {
          color:  'rgba(199, 205, 215, 1)' 
        },
      },
      splitArea: {
        areaStyle: {
          color: ['rgba(191, 194, 198, 1)','rgba(78, 91, 110, 1)'], // Set the colors for the split areas
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
              points["larger"] || 0,
              points["smaller"] || 0,
              points["higher"] || 0,
              points["lower"] || 0,
              points["medium"] || 0,
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
    <div>
      <EChartsReact option={option}  />
    </div>
  );
}

export default RadarGraph;
