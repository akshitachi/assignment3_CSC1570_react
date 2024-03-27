
import { useSearchResult } from '../../../State/SearchResultContext';
import HighchartsReact from 'highcharts-react-official';
import * as Highcharts from "highcharts/highstock";
import IndicatorsCore from 'highcharts/indicators/indicators';
import VBP from 'highcharts/indicators/volume-by-price';

import HCMA from 'highcharts/highcharts-more';
import HSIndicators from "highcharts/indicators/indicators";
import '../Tabs/Charts.css';
import { useEffect, useState } from 'react';
import Chart1 from '../../../Utils/Chart1';
HCMA(Highcharts); 

HSIndicators(Highcharts);
 // Initialize the stock module

VBP(Highcharts);
IndicatorsCore(Highcharts);
function Charts  () {
    const { searchResults } = useSearchResult();
    const [ohlcData1, setOhlcData] = useState([]); 
    useEffect(() => {
        fetch(`http://localhost:8080/getohlc/${searchResults.profile.ticker}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        })
            .then(response => response.json())
            .then(data => {
                setOhlcData(data);
            }
            )
            .catch(error => {
                console.error(error);
            }   
        );
    }, [searchResults.profile.ticker]);
    
    const ohlcData =ohlcData1 && ohlcData1.results;
    if(ohlcData === undefined){
        return null;
     }
    // console.log(ohlcData);
    var ohlc = [];
    var volume = [];
    const dataLength = ohlcData1.count;
    const  groupingUnits = [[
        'week',                         // unit name
        [1]                             // allowed multiples
    ], [
        'month',
        [1, 2, 3, 4, 6]
    ]];
    for (var i = 0; i < dataLength; i += 1) {
        ohlc.push([
            ohlcData[i].t, // the date
            ohlcData[i].o, // open
            ohlcData[i].h, // high
            ohlcData[i].l, // low
            ohlcData[i].c // close
        ]);
        volume.push([
            ohlcData[i].t, // the date
            ohlcData[i].v // the volume
        ]);
    }
    const options = {
        chart: {
            height: 700,
            width: 1300,
            backgroundColor: '#F8F8F8',
            events: {
                load: function () {
                  const chart = this;
                  console.log(window.innerWidth);
                  if(window.innerWidth< 844){
                  function resizeChart() {
                    const chartWidth = chart.renderTo.parentElement.clientWidth;
                    chart.setSize(chartWidth, 700,false);
                }
                  resizeChart();
                  window.addEventListener('resize', resizeChart);
                }
                }
              }
        },
        rangeSelector: {
            selected: 2
        },
        title: {
            text: `${searchResults.profile.ticker} Historical`
        },
        subtitle: {
            text: 'With SMA and Volume by Price technical indicators'
        },
        yAxis:{
            opposite: false, 

        },
        yAxis: [{
            startOnTick: false,
            opposite: true,
            endOnTick: false,
            lineColor: 'black',
            title: {
                text: 'OHLC'
            },
            height: '60%',
            lineWidth: 2,
            resize: {
                enabled: true
            }
        }, {
            opposite: true,
            lineColor: 'black',
            title: {
                text: 'Volume' 
            },
            top: '65%',
            height: '35%',
            offset: 0,
            lineWidth: 2
        }],
        tooltip: {
            split: true
        },
        plotOptions: {
            series: {
                dataGrouping: {
                    units: groupingUnits
                }
            },
            column: {
                color: '#524EA0' 
            }
        },
        series: [{
            type: 'candlestick',
            name: `${searchResults.profile.ticker}`,
            id: 'aapl',
            zIndex: 2,
            data: ohlc
        }, {
            type: 'column',
            name: 'Volume',
            id: 'volume',
            data: volume,
            yAxis: 1
        }, {
            type: 'vbp',
            linkedTo: 'aapl',
            params: {
                volumeSeriesID: 'volume'
            },
            dataLabels: {
                enabled: false
            },
            zoneLines: {
                enabled: false
            }
        }, {
            type: 'sma',
            linkedTo: 'aapl',
            zIndex: 1,
            marker: {
                enabled: false
            },
            color: '#C1907A'
        }]
    };


    return (
        <Chart1 options={options}/>
    );
}

export default Charts
