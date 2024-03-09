import React, {useEffect, useState} from 'react';
import {Dimensions, Text, View} from 'react-native';
import {LineChart} from 'react-native-chart-kit';

type Props = {};

/**
 *
 */
const KitChart: React.FC<Props> = ({}) => {
  const [data, setData] = useState(() => ({
    labels: ['000'],
    datasets: [
      {
        data: [
          99,
          // Math.random() * 100,
          // Math.random() * 100,
          // Math.random() * 100,
          // Math.random() * 100,
          // Math.random() * 100,
          // Math.random() * 100,
        ],
      },
    ],
  }));

  useEffect(() => {
    const timer = setInterval(() => {
      setData(pre => {
        // pre.concat({
        //   x: pre.length,
        //   y: 40 + 30 * Math.random()
        // }),
        const oldLength = pre.labels.length;
        const newLabels = pre.labels.concat([`xxxx${oldLength}`]);
        const newD = pre.datasets[0].data.concat([Math.random() * 100]);
        return {labels: newLabels, datasets: [{data: newD}]};
      });
    }, 500);
    return () => {
      clearInterval(timer);
    };
  }, [data]);

  return (
    <View>
      <Text>Bezier Line Chart</Text>
      <LineChart
        data={data}
        width={Dimensions.get('window').width} // from react-native
        height={220}
        yAxisLabel="$"
        yAxisSuffix="k"
        yAxisInterval={1} // optional, defaults to 1
        chartConfig={{
          // backgroundColor: '#e26a00',
          // backgroundGradientFrom: '#fb8c00',
          // backgroundGradientTo: '#ffa726',
          decimalPlaces: 2, // optional, defaults to 2dp
          color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
          labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
          style: {
            borderRadius: 16,
          },
          propsForDots: {
            r: '6',
            strokeWidth: '2',
            stroke: '#ffa726',
          },
        }}
        bezier
        style={{
          marginVertical: 8,
          borderRadius: 16,
        }}
      />
    </View>
  );
};

export default KitChart;
