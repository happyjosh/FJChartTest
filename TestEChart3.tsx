import {useRef, useEffect} from 'react';
import * as echarts from 'echarts/core';
import 'echarts/lib/component/grid';
import {Dimensions, StyleSheet, View} from 'react-native';
import {BarChart, LineChart} from 'echarts/charts';
import {
  ToolboxComponent,
  LegendComponent,
  TooltipComponent,
  DataZoomComponent,
} from 'echarts/components';
import {SVGRenderer, SvgChart} from '@wuba/react-native-echarts';

echarts.use([
  SVGRenderer,
  // BarChart,
  LineChart,
  ToolboxComponent,
  TooltipComponent,
  LegendComponent,
  DataZoomComponent,
]);

const E_HEIGHT = 400;
const E_WIDTH = Dimensions.get('screen').width;
function randomData() {
  now = new Date(+now + oneDay);
  // value = value + Math.random() * 21 - 10;
  const v = +(Math.random() * 10 + 5).toFixed(1);
  return {
    name: now.toString(),
    value: [
      [now.getFullYear(), now.getMonth() + 1, now.getDate()].join('/'),
      Math.round(v),
    ] as [string, number],
  };
}
let data: {name: string; value: [string, number]}[] = [];
let now = new Date(1997, 9, 3);
let oneDay = 24 * 3600 * 1000;
// let value = Math.random() * 100;
for (var i = 0; i < 50; i++) {
  data.push(randomData());
}
const option = {
  title: {
    text: 'Dynamic Data & Time Axis',
  },
  tooltip: {
    trigger: 'axis',
    formatter: function (params: any) {
      params = params[0];
      var date = new Date(params.name);
      return (
        date.getDate() +
        '/' +
        (date.getMonth() + 1) +
        '/' +
        date.getFullYear() +
        ' : ' +
        params.value[1]
      );
    },
    axisPointer: {
      animation: false,
    },
  },
  xAxis: {
    type: 'time',
    splitLine: {
      show: false,
    },
  },
  yAxis: {
    type: 'value',
    boundaryGap: [0, '100%'],
    splitLine: {
      show: false,
    },
  },
  series: [
    {
      name: 'Fake Data',
      type: 'line',
      showSymbol: false,
      smooth: true,
      data: data,
      // animationDuration: 1000,
      // animationDurationUpdate: 1000,
    },
  ],
};

export default () => {
  const svgRef = useRef(null);

  useEffect(() => {
    let chart: any = undefined;
    let inter: any = undefined;
    if (svgRef.current) {
      chart = echarts.init(svgRef.current, 'light', {
        renderer: 'svg',
        width: E_WIDTH,
        height: E_HEIGHT,
      });
      chart.setOption(option);

      inter = setInterval(function () {
        for (var i = 0; i < 1; i++) {
          data.shift();
          data.push(randomData());
        }
        chart.setOption({
          series: [
            {
              data: data,
            },
          ],
        });
      }, 300);
    }
    return () => {
      chart?.dispose();
      clearInterval(inter);
    };
  }, []);
  return (
    <View style={styles.container}>
      <SvgChart ref={svgRef} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
