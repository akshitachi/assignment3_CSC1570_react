import React, { useEffect } from 'react'
import * as Highcharts from "highcharts/highstock";
import IndicatorsCore from 'highcharts/indicators/indicators';
import VBP from 'highcharts/indicators/volume-by-price';

import HCMA from 'highcharts/highcharts-more';
import HSIndicators from "highcharts/indicators/indicators";
HCMA(Highcharts); 

HSIndicators(Highcharts);

VBP(Highcharts);
IndicatorsCore(Highcharts);
const Chart1 = ({options}) => {
    useEffect(() => {
        Highcharts.stockChart('container5', options);
    }, []);
  return (
    <div className='chartOhlc'> 
            <div id="container5"></div>
        </div>
  )
}

export default Chart1