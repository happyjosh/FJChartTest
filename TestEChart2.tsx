import {useRef, useEffect} from 'react';
import {View} from 'react-native';
/**
 * 一、引入echarts依赖，这里先试下折线图
 */
import * as echarts from 'echarts/core';
import {LineChart} from 'echarts/charts';
import {GridComponent} from 'echarts/components';
import {SVGRenderer, SkiaChart} from '@wuba/react-native-echarts';

/**
 * 二、注册需要用到的组件
 * SVGRenderer: 是必须注册的
 * LineChart: 因为用的折线图，所以要引入LineChart（如果不知道该引入哪些组件，就直接看报错，报错说缺什么就加什么）
 * GridComponent: 这个就是报错的时候提示，然后我加的hhh
 */
echarts.use([SVGRenderer, LineChart, GridComponent]);

export default () => {
  const skiaRef = useRef(null); // Ref用于保存图表实例
  useEffect(() => {
    /**
     * 四、图表配置
     */
    const option = {
      xAxis: {
        type: 'category',
        data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
      },
      yAxis: {
        type: 'value',
      },
      series: [
        {
          data: [150, 230, 224, 218, 135, 147, 260],
          type: 'line',
        },
      ],
    };
    let chart: any;
    if (skiaRef.current) {
      /**
       * 五、初始化图表，指定下宽高
       */
      chart = echarts.init(skiaRef.current, 'light', {
        renderer: 'svg',
        width: 400,
        height: 400,
      });
      chart.setOption(option);
    }
    /**
     * 六、页面关闭后要销毁图表实例
     */
    return () => chart?.dispose();
  }, []);
  return (
    <View>
      <SkiaChart ref={skiaRef} />
    </View>
  );
};
