import {React, useEffect, useState} from 'react'
import { useSearchResult } from '../State/SearchResultContext';
import Highcharts from 'highcharts'
import HighchartsReact from 'highcharts-react-official';
import './AggregateCharts.css';

function AggregateCharts  ()  {
    const { searchResults } = useSearchResult();
    const [ chartData,updateChartData ] = useState([]);
useEffect(() => {
  fetch(`http://localhost:8080/getchart/${searchResults.profile.ticker}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then(response => response.json())
    .then(data => {
      updateChartData(data);
    })
    .catch(error => {
      console.error(error);
    });
}, [searchResults.profile.ticker]);
const chartData1 = chartData.results;
if(chartData1===undefined){
  return null;
}
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
    width: window.innerWidth<844 ? 300: 600 ,
    height:window.innerWidth<844 ?300: 380, 
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
      name: `${searchResults.profile.ticker}`,
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
    <div style={{ marginBottom: '20px' }}>
      <HighchartsReact highcharts={Highcharts} options={options} />
    </div>
  )
}

export default AggregateCharts