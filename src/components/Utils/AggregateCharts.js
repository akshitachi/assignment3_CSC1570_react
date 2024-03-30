import {React, useEffect, useState} from 'react'
import { useSearchResult } from '../State/SearchResultContext';
import Highcharts from 'highcharts'
import HighchartsReact from 'highcharts-react-official';
import './AggregateCharts.css';

function AggregateCharts  ()  {
    const { searchResults } = useSearchResult();
    const [ chartData,updateChartData ] = useState([]);
useEffect(() => {
  fetch(`https://assignment3-nodejs-akshil-shah.wl.r.appspot.com/getchart/${searchResults.profile.ticker}?isMarketOpen=${searchResults.marketStatus}`, {
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
}, []);
const chartData1 = chartData;
if(chartData1===null){
  return null;
}
var hourlyChart = [];
for(var i = 0 ; i < chartData1.length; i++){
  let tempTime = new Date(chartData1[i].t);
  hourlyChart.push([chartData1[i].t, chartData1[i].c]);
}
const options = {
  chart: {
    backgroundColor: '#F8F8F8',
    width: window.innerWidth<844 ? 300: 600 ,
    height:window.innerWidth<844 ?300: 380, 
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

  },
  tooltip: {
    split: true,
  },
  yAxis: {
    opposite: true,
    title: null,
  },
  scrollbar: {
    enabled: true
  },
legend:{
  enabled: false
},
navigator: {
  enabled: true
},
plotOptions: {
  series: {
    marker: {
      enabled: false
    },
  },
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
      // yAxis:1,
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