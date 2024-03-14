
import { useSearchResult } from '../../../State/SearchResultContext';
import HighchartsReact from 'highcharts-react-official';
import * as Highcharts from "highcharts/highstock";
import IndicatorsCore from 'highcharts/indicators/indicators';
import VBP from 'highcharts/indicators/volume-by-price';

import HCMA from 'highcharts/highcharts-more';
import HSIndicators from "highcharts/indicators/indicators";
import '../Tabs/Charts.css';
HCMA(Highcharts); 

HSIndicators(Highcharts);
 // Initialize the stock module

VBP(Highcharts);
IndicatorsCore(Highcharts);
function Charts  () {
    const { searchResults } = useSearchResult();
    const ohlcData = searchResults.ohlc.results;
    var ohlc = [];
    var volume = [];
    const dataLength = searchResults.ohlc.count;
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
            title: {
                text: 'Volume'
            },
            top: '65%',
            height: '35%',
            offset: 0,
            lineWidth: 2
        },
        
    ],
        tooltip: {
            split: true
        },
        plotOptions: {
            series: {
                dataGrouping: {
                    units: groupingUnits
                }
            }
        },
        series: [{
            type: 'candlestick',
            name: 'AAPL',
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
            }
        }]
    };

    return (
        <HighchartsReact className='chart-indicator' highcharts={Highcharts} options={options} style={{ height: '1000px' }} />
    );
}

export default Charts