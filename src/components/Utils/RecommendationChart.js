import React from 'react'
import { useSearchResult } from '../State/SearchResultContext';
import HighchartsReact from 'highcharts-react-official';
import Highcharts from 'highcharts';

function RecommendationChart () {
    const {searchResults} = useSearchResult();
    const recommendation = searchResults.recommendationData;
    var buy = [];
    var strongBuy= [];
    var sell= [];
    var hold = [];
    var strongBuy= [];
    var strongSell =[];
    var period =[];
    var symbol = "";
    const recommendationLength = recommendation.length;
    for(var i = 0 ; i < recommendationLength; i ++){
        buy.push(recommendation[i]["buy"]);
        sell.push(recommendation[i]["sell"]);
        period.push(recommendation[i]["period"]);
        hold.push(recommendation[i]["hold"]);
        strongBuy.push(recommendation[i]["strongBuy"]);
        strongSell.push(recommendation[i]["strongSell"]);
        symbol = recommendation[i]["symbol"];
      }
      console.log(buy);   

    const RecommChartOptions = {
        chart: {
            type: 'column',
            width: window.innerWidth <= 768 ? 300 : 670,
            backgroundColor: '#F8F8F8',
        },
        title: {
            text: 'Recommendation Trends',
            style: {
                fontWeight: 'bold'
            }
        },
        xAxis: {
            categories: period
        },
        yAxis: {
            min: 0,
            title: {
                text: '#Analysis'
            },
            stackLabels: {
                enabled: true,
                style: {
                    fontWeight: 'bold',
                    color: (
                        Highcharts.defaultOptions.title.style &&
                        Highcharts.defaultOptions.title.style.color
                    ) || 'gray'
                }
            }
        },
        legend: {
            verticalAlign: 'bottom',
        },
        plotOptions: {
            column: {
                stacking: 'normal',
                dataLabels: {
                    enabled: true
                }
            }
        },
        series: [{
            name: 'Strong Buy',
            type: 'column',
            color: '#365A41',
            data: strongBuy
        },
        {
            name: 'Buy',
            type: 'column',
            color: '#4FA25A',
            data: buy
        },
        {
            name: 'Hold',
            type: 'column',
            color: '#92782E',
            data: hold
        }, 
        {
            name: 'Sell',
            type: 'column',
            color: '#A25050',
            data: sell
        }, 
        {
            name: 'Strong Sell',
            type: 'column',
            color: '#602E2B',
            data: strongSell
        },  ]
    }
  return (
    <HighchartsReact className='chart-indicator' highcharts={Highcharts} options={RecommChartOptions}/>
  )
}

export default RecommendationChart