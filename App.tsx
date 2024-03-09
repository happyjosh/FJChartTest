/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, {useEffect, useRef, useState} from 'react';
import type {PropsWithChildren} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';

import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';
import {
  CartesianChart,
  Line,
  PointsArray,
  useAnimatedPath,
  useLinePath,
} from 'victory-native';
import {Path} from '@shopify/react-native-skia';
import ChartWrapper from './ChartWrapper.tsx';
import KitChart from './KitChart.tsx';
import TestEChart from './TestEChart.tsx';
import TestEChart2 from "./TestEChart2.tsx";

type SectionProps = PropsWithChildren<{
  title: string;
}>;

function Section({children, title}: SectionProps): React.JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';
  return (
    <View style={styles.sectionContainer}>
      <Text
        style={[
          styles.sectionTitle,
          {
            color: isDarkMode ? Colors.white : Colors.black,
          },
        ]}>
        {title}
      </Text>
      <Text
        style={[
          styles.sectionDescription,
          {
            color: isDarkMode ? Colors.light : Colors.dark,
          },
        ]}>
        {children}
      </Text>
    </View>
  );
}

export const tradeLineHistoriesConfig = {
  /** 历史数据采样间隔，单位毫秒 */
  sample_rate: 800,
  /** 历史数据跨度；注：这个时间还代表了线性图一屏的时间跨度 */
  time_offset: 55 * 1000,
  /** wss 数据采样间隔，单位毫秒；注：这个时间还代表了线性图动画过度的时间 */
  wss_sample_rate: 800,
  /** 最大展示时间范围，单位毫秒；注意：这个值必须要大于 tradeLineHistoriesConfig.time_offset */
  max_time_range: 8 * 60 * 1000,
};

export const animate = {
  onLoad: {duration: tradeLineHistoriesConfig.wss_sample_rate},
  easing: 'linear',
};

function MyAnimatedLine({points}: {points: PointsArray}) {
  const {path} = useLinePath(points);
  // 👇 create an animated path
  // const animPath = useAnimatedPath(path);
  const animPath = useAnimatedPath(path, {type: 'timing', duration: 500});

  return <Path path={animPath} style="stroke" color="red" strokeWidth={3} />;
}

export function MyChart() {
  const [data, setData] = useState<{x: number; y: number}[]>([]);
  useEffect(() => {
    // set data to 10 random points every 2 seconds
    // keep the x values the same for the points to animate along the x axis
    const interval = setInterval(() => {
      setData(
        Array.from({length: 10}, (_, index) => ({
          x: index + 1,
          y: Math.random() * 100,
        })),
      );
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  // const mockLengthRef = useRef(31);
  // const [data, setData] = useState(() => {
  //   return Array.from({length: mockLengthRef.current}, (_, i) => ({
  //     x: i,
  //     y: 40 + (mockLengthRef.current - 1) * Math.random(),
  //   }));
  // });
  // useEffect(() => {
  //   const timer = setInterval(() => {
  //     setData(pre =>
  //       pre.concat({
  //         x: pre.length,
  //         y: 40 + 30 * Math.random(),
  //       }),
  //     );
  //   }, 500);
  //   return () => {
  //     clearInterval(timer);
  //   };
  // }, [data]);

  return (
    <CartesianChart data={data} xKey="x" yKeys={['y']}>
      {({points}) => <MyAnimatedLine points={points.y} />}
    </CartesianChart>
  );
}

// function Testing() {
//   // const [data, setData] = useState<{x: number; y: number}[]>([]);
//   //
//   // useEffect(() => {
//   //   // set data to 10 random points every 2 seconds
//   //   // keep the x values the same for the points to animate along the x axis
//   //   const interval = setInterval(() => {
//   //     setData(
//   //       Array.from({length: 10}, (_, index) => ({
//   //         x: index + 1,
//   //         y: Math.random() * 100,
//   //       })),
//   //     );
//   //   }, 2000);
//   //   return () => clearInterval(interval);
//   // }, []);
//
//   const mockLengthRef = useRef(31);
//   const [data, setData] = useState(() => {
//     return Array.from({length: mockLengthRef.current}, (_, i) => ({
//       x: i,
//       y: 40 + (mockLengthRef.current - 1) * Math.random(),
//     }));
//   });
//   useEffect(() => {
//     const timer = setInterval(() => {
//       setData(pre =>
//         pre.concat({
//           x: pre.length,
//           y: 40 + 30 * Math.random(),
//         }),
//       );
//     }, 500);
//     return () => {
//       clearInterval(timer);
//     };
//   }, [data]);
//
//   // console.log("data", data);
//   return (
//     <CartesianChart data={data} xKey="x" yKeys={['y']}>
//       {({points}) => <MyAnimatedLines points={points.y} />}
//     </CartesianChart>
//   );
// }

function Test2() {
  const mockLengthRef = useRef(31);
  const [data, setData] = useState(() => {
    return Array.from({length: mockLengthRef.current}, (_, i) => ({
      x: i,
      y: 40 + (mockLengthRef.current - 1) * Math.random(),
    }));
  });
  useEffect(() => {
    const timer = setInterval(() => {
      setData(pre =>
        pre.concat({
          x: pre.length,
          y: 40 + 30 * Math.random(),
        }),
      );
    }, 500);
    return () => {
      clearInterval(timer);
    };
  }, [data]);

  return (
    <CartesianChart data={data} xKey="x" yKeys={['y']}>
      {({points}) => (
        //👇 pass a PointsArray to the Line component, as well as options.
        <Line
          points={points.y}
          color="red"
          strokeWidth={3}
          animate={{type: 'timing', duration: 300}}
        />
      )}
    </CartesianChart>
  );
}

function App(): React.JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  return (
    <SafeAreaView style={backgroundStyle}>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={backgroundStyle.backgroundColor}
      />
      <View style={{height: 300}}>
        {/*<CartesianChart data={data} xKey="day" yKeys={['highTmp']}>*/}
        {/*  {({points}) => (*/}
        {/*    <Line*/}
        {/*      points={points.highTmp}*/}
        {/*      color="red"*/}
        {/*      strokeWidth={3}*/}
        {/*      animate={{*/}
        {/*        onLoad: {duration: tradeLineHistoriesConfig.wss_sample_rate},*/}
        {/*        easing: 'linear',*/}
        {/*      }}*/}
        {/*    />*/}
        {/*  )}*/}
        {/*</CartesianChart>*/}
        {/*<Testing />*/}
        {/*<MyChart />*/}
        {/*<Test2 />*/}
        {/*<ChartWrapper />*/}
        {/*<KitChart />*/}
        <TestEChart />
        {/*<TestEChart2 />*/}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

export default App;
