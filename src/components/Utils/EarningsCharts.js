import React from 'react'
import { useSearchResult } from '../State/SearchResultContext';
import HighchartsReact from 'highcharts-react-official';
import Highcharts from 'highcharts';

function EarningsCharts () {
    const {searchResults} = useSearchResult();
    const earningsData = searchResults.earningsData;
    const earningsLength = earningsData.length;
    var estimate = [];
    var actual = [];
    var time = [];
    var surprise=[];
    for(var i = 0; i < earningsLength; i++){
      if(earningsData[i]["estimate"] == null){
        estimate.push(0);
      }else{
        estimate.push(earningsData[i]["estimate"]);
      }
      actual.push(earningsData[i]["actual"]);
      time.push(earningsData[i]["period"] + "<br>"+ "Surprise: "+earningsData[i]["surprise"]);
    }
    const surpriseOptions = {
        chart:{
            type:'line',
            width: window.innerWidth <= 768 ? 300 : 670,
            backgroundColor: '#F8F8F8',
        },
        title: {
            text: 'Historical EPS Surprises'
        },
        
        yAxis: {
            min:0,
            tickAmount: 8,
            title: {
                text: 'Quarterly EPS'
            },
            plotLines: [{
                value: 0,
                width: 2,
                color: 'black',
                zIndex: 5
            },
        ],
        
        },
        tooltip:{
            shared:true
        },
        xAxis: {
            categories: time,
        },
        plotOptions:{

        },
        legend: {
            verticalAlign: 'bottom'
        },
        series: [ {
            name: 'Actual',
            type: 'line',
            color: '#6AA0C9',
            data: actual
        },{
            name: 'Estimate',
            type: 'line',
            color: '#534D95',
            data: estimate
        },],

        responsive: {
            rules: [{
                condition: {
                    maxWidth: 500
                },
                chartOptions: {
                    legend: {
                        layout: 'horizontal',
                        align: 'center',
                        verticalAlign: 'bottom'
                    }
                }
            }]
        },
    };
  return (
    <HighchartsReact className='chart-indicator' highcharts={Highcharts} options={surpriseOptions}/>
  )
}

export default EarningsCharts