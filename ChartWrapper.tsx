import React, {useState, useEffect} from 'react';
import {View} from 'react-native';
import {LineChart, LineData, xAxis} from 'react-native-charts-wrapper';

type Props = {};

const MAX_POINTS = 29; // 控制视窗里显示的点的数量

/**
 *
 */
const ChartWrapper: React.FC<Props> = ({}) => {
  // const [data, setData] = useState<LineData>({
  //   dataSets: [
  //     {
  //       values: new Array(30).fill(0).map(() => ({y: Math.random() * 50})),
  //       label: 'Demo',
  //       config: {
  //         mode: 'CUBIC_BEZIER',
  //         drawValues: false,
  //         drawCircles: false,
  //         lineWidth: 2,
  //       },
  //     },
  //   ],
  // });
  const [config, setConfig] = useState<{data: LineData; xAxis: xAxis}>(() => ({
    data: {
      dataSets: [
        {
          values: new Array(30).fill(0).map(() => ({y: Math.random() * 50})),
          label: 'Demo',
          config: {
            mode: 'CUBIC_BEZIER',
            drawValues: false,
            drawCircles: false,
            lineWidth: 2,
          },
        },
      ],
    },
    xAxis: {
      axisMaximum: MAX_POINTS,
      axisMinimum: 0,
      granularityEnabled: true,
      granularity: 1,
      drawGridLines: false,
    },
  }));

  // const [xAxis, setXAxis] = useState({
  //   axisMaximum: MAX_POINTS,
  //   axisMinimum: 0,
  //   granularityEnabled: true,
  //   granularity: 1,
  // });

  console.log('-------------------begin--------------------');
  console.log(config.xAxis.axisMinimum);
  console.log(config.xAxis.axisMaximum);
  console.log('-------------------end--------------------');

  useEffect(() => {
    const timer = setInterval(() => {
      const newValue = Math.random() * 50;
      setConfig(pre => {
        const dataClone = JSON.parse(JSON.stringify(pre.data));

        // Add the new value to the dataset
        dataClone.dataSets[0].values.push({y: newValue});
        const newValueX = dataClone.dataSets?.[0].values?.length ?? 0;

        return {
          data: dataClone,
          xAxis: {
            ...pre.xAxis,
            axisMaximum: newValueX - 1,
            axisMinimum: newValueX + 1 - MAX_POINTS,
          },
        };
      });
    }, 500);

    // Clear the interval when the component is unmounted
    return () => clearInterval(timer);
  }, []);

  return (
    <View>
      <LineChart
        style={{height: 200}}
        data={config.data}
        animation={{durationX: 500, easingX: 'Linear'}}
        chartDescription={{text: ''}}
        xAxis={config.xAxis}
        yAxis={{left: {drawGridLines: false}, right: {drawGridLines: false}}}
      />
    </View>
  );
};
export default ChartWrapper;
