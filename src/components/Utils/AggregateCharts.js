import {React} from 'react'
import { useSearchResult } from '../State/SearchResultContext';
import Highcharts from 'highcharts'
import HighchartsReact from 'highcharts-react-official';
import './AggregateCharts.css';

function AggregateCharts  ()  {
    const { searchResults } = useSearchResult();
    const chartData1 = searchResults.chartData.results;
//     const chartDataTobeFitted = chartData1.map(item => [item.t, item.c]);
//     console.log(chartDataTobeFitted);

// const formattedChartData = chartData1.map(item => {
//     const date = new Date(item.t);
//     const timeString = date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
//     return [timeString, item.c];
// });
// const latestChartData = formattedChartData.slice(-6);
// if (chartData1 === undefined) {
//   return null; // or any other handling for when chartData1 is undefined
// }
var hourlyChart = [];
for(var i = 0 ; i < chartData1.length; i++){
  let tempTime = new Date(chartData1[i].t);
  let correct_time = tempTime.getTime();

  let hour = tempTime.getHours();
  let minute = tempTime.getMinutes();
  let timeString = `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`;
  hourlyChart.push([timeString.slice(0,5), chartData1[i].c]);
}

const options = {
  chart: {
    backgroundColor: '#F8F8F8',
    width: 600,
    height: 380, 
  },
  rangeSelector: {
    selected: 1
  },
  title: {
    text: `${searchResults.profile.ticker} Hourly Price Variation`,
    style: {
      fontSize: '18px',
      fontWeight:'bold',
      color: 'grey'
    }
  },
  xAxis: {
    type: 'datetime',
    dateTimeLabelFormats: {
      hour: '%H:%M'
    },
    categories: hourlyChart.map(item => item[0]),
    minTickInterval: 16,
    tickWidth: 1,
    tickColor: 'black',
  },
  tooltip: {},
  yAxis: {
    opposite: true,
    title: null,
    tickAmount:4,
  },
  series: [
    {
      name: '',
      data: hourlyChart,
      type: 'line',
      color: searchResults.quote.d > 0 ? 'green' :searchResults.quote.d<0? 'red':'black',
      tooltip: {
        valueDecimals: 2
      },
      marker: false,
      pointPlacement: 'on',
      showInLegend: false,
    },
    
  ]
};
  return (
    <HighchartsReact highcharts={Highcharts} options={options} />
  )
}

export default AggregateCharts