import {
  PageContainer,
} from '@ant-design/pro-components';
import '@umijs/max';
import * as echarts from 'echarts';
import {getTopInvokeInterfaceInfo} from "@/services/yuapi-backend/analysisController";
import {useEffect, useRef, useState} from "react";
import {sleep} from "@antfu/utils";




const Analysis: React.FC = () => {

  type EChartsOption = echarts.EChartsOption;

  const [key, setKey] = useState<any>();
  const [value, setValue] = useState<any>();

  const div = useRef(null);

  const getData = async () => {
    try {
      const res = await getTopInvokeInterfaceInfo();
      if (res.code === 0){
        console.log(res.data[0])
        console.log(res.data[1])
        setKey(res.data[0])
        setValue(res.data[1])
      }
    }catch (e){
      console.error("请求失败："+e.message);
    }
  };
  useEffect(() => {
    getData();
  }, []); // 空依赖数组，只在组件挂载时执行
  useEffect(() => {
    var chartDom = div.current;
    var myChart = echarts.init(chartDom);
    var option: EChartsOption;
    option = {
      title: {
        text: '接口调用次数',
        subtext: 'Fake Data',
        left: 'center'
      },
      tooltip: {
        trigger: 'item',
        formatter: '{a} <br/>{b} : {c} ({d}%)'
      },
      legend: {
        left: 'center',
        top: 'bottom',
        data: key/*[
          'rose1',
          'rose2',
          'rose3',
          'rose4',
          'rose5',
          'rose6',
          'rose7',
          'rose8'
        ]*/
      },
      toolbox: {
        show: true,
        feature: {
          mark: { show: true },
          dataView: { show: true, readOnly: false },
          restore: { show: true },
          saveAsImage: { show: true }
        }
      },
      series: [
        {
          name: 'Area Mode',
          type: 'pie',
          radius: [20, 140],
          center: ['50%', '50%'],
          roseType: 'area',
          itemStyle: {
            borderRadius: 5
          },
          data: value
            /*[
              { value: 30, name: 'rose 1' },
              { value: 28, name: 'rose 2' },
              { value: 26, name: 'rose 3' },
              { value: 24, name: 'rose 4' },
              { value: 22, name: 'rose 5' },
              { value: 20, name: 'rose 6' },
              { value: 18, name: 'rose 7' },
              { value: 16, name: 'rose 8' }
            ]*/
        }
      ]
    };
    option && myChart.setOption(option);
  }, [key,value]);


  return (
    <PageContainer style={{height: '1000px'}}>
      <div ref={div} style={{height: '500px'}}>

      </div>
    </PageContainer>
  );
};
export default Analysis;
