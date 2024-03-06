import {React} from 'react'
import { useSearchResult } from '../State/SearchResultContext';
import Highcharts from 'highcharts'
import HighchartsReact from 'highcharts-react-official'

function AggregateCharts  ()  {
    const { searchResults } = useSearchResult();
    const chartData = searchResults.chartData.results;
    const chartDataTobeFitted = chartData.map(item => [item.t, item.c]);
    console.log(chartDataTobeFitted);

const formattedChartData = chartData.map(item => {
    const date = new Date(item.t);
    const timeString = date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    return [timeString, item.c];
});
const latestChartData = formattedChartData.slice(-6);
// const formattedChartData = chartData.map(item => {
//     const date = new Date(item.t);
//     const timeString = date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }).replace(/(AM|PM)$/, '');
//     return [timeString, item.c];
// });
const options = {
    rangeSelector: {
        selected: 1
    },
    title: {
        text: 'AAPL Hourly Price Variation'
    },
    xAxis: {
        type: 'category',
        title:'',
        },
        yAxis:{
        opposite:true,
        title:'',
        },
        series: [
        {   
            name:'',
            data: latestChartData,
            type: 'line',
            tooltip: {
            valueDecimals: 2
            },
            marker:false
        }
        ]
    };

  return (
    <HighchartsReact highcharts={Highcharts} options={options} />
  )
}

export default AggregateCharts