import {React} from 'react'
import { useSearchResult } from '../State/SearchResultContext';
import Highcharts from 'highcharts'
import HighchartsReact from 'highcharts-react-official';
import './AggregateCharts.css';

function AggregateCharts  ()  {
//     const { searchResults } = useSearchResult();
//     const chartData1 = searchResults.chartData.results;
//     const chartDataTobeFitted = chartData1.map(item => [item.t, item.c]);
//     console.log(chartDataTobeFitted);

// const formattedChartData = chartData1.map(item => {
//     const date = new Date(item.t);
//     const timeString = date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
//     return [timeString, item.c];
// });
// const latestChartData = formattedChartData.slice(-6);

// const options = {
//     chart: {
//         backgroundColor: '#F8F8F8',
//         // height: 350,
//         // marginBottom: 0, // Add this line to remove space below x-axis
//     },
//     rangeSelector: {
//         selected: 1
//     },
//     title: {
//         text: `${searchResults.profile.ticker} Hourly Price Variation`,
//         style: {
//             fontSize: '18px',
//             fontWeight:'bold',
//             color: 'grey'
//         }
//     },
//     xAxis: {
//         type: 'datetime',
//         dateTimeLabelFormats: {
//             hour: '%H'
//         }
//     },
//     tooltip: {
//         // formatter: function () {
//         //     return `<span style="color:green">\u25CF</span>${searchResults.profile.ticker}: ` + Highcharts.numberFormat(this.y, 2);
//         // }
//     },
//     yAxis: {
//         opposite: true,
//         title: null  
//     },
//     series: [
//         {
//             name: '',
//             data: latestChartData,
//             type: 'line',
//             color: 'green',
//             tooltip: {
//                 valueDecimals: 2
//             },
//             marker: false,
//             pointPlacement: 'on',
//             color: 'green',
//             showInLegend: false,
//         },
        
//     ]
// };
// const options = {
//     chart: {
//         type: 'line'
//     },
//     title: {
//         text: `${searchResults.profile.ticker} Hourly Price Variation`,
//                 style: {
//                     fontSize: '18px',
//                     fontWeight:'bold',
//                     color: 'grey'
//                 }
//     },
//     xAxis: {
//         // type: 'datetime',
//         // labels: {
//         //     formatter: function () {
//         //         return Highcharts.dateFormat('%H:%M', this.value);
//         //     }
//         // }
//     },
//     yAxis: {
//         title: {
//             text: 'Stock Value'
//         },
//         opposite:true,
//     },
//     series: [{
//         name: 'Stock Price',
//         data: latestChartData,
//         marker:false,
//         showInLegend: false,
//     }]
// };

  return (
    // <HighchartsReact highcharts={Highcharts} options={options} />
    <div>Hello</div>
  )
}

export default AggregateCharts