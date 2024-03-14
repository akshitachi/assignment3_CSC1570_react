import React from 'react'
import { useSearchResult } from '../../../State/SearchResultContext'
import './Insights.css';
import RecommendationChart from '../../../Utils/RecommendationChart';
import EarningsCharts from '../../../Utils/EarningsCharts';
function Insight () {
        const {searchResults} = useSearchResult();
        const insiderSentiment = searchResults.insiderSentiment;
        const totalMSPR = Array.isArray(insiderSentiment.data) ? insiderSentiment.data.reduce((total, result) => total + result.mspr, 0).toFixed(2) : 0;
        const positiveMSPR = Array.isArray(insiderSentiment.data) ? insiderSentiment.data.reduce((total, result) => result.mspr > 0 ? total + result.mspr : total, 0) : 0;
        const negativeMSPR = Array.isArray(insiderSentiment.data) ? insiderSentiment.data.reduce((total, result) => result.mspr < 0 ? total + result.mspr : total, 0).toFixed(2) : 0;
        const totalChange = Array.isArray(insiderSentiment.data) ? insiderSentiment.data.reduce((total, result) => total + result.change, 0) : 0;
        const positiveChange = Array.isArray(insiderSentiment.data) ? insiderSentiment.data.reduce((total, result) => result.change > 0 ? total + result.change : total, 0) : 0;
        const negativeChange = Array.isArray(insiderSentiment.data) ? insiderSentiment.data.reduce((total, result) => result.change < 0 ? total + result.change : total, 0) : 0;
    return (
        <div>
                <center className='mainTextInsider'>Insider Sentiments</center>
                <center>
            <table>
                <thead>
                    <tr>
                        <th>{searchResults.profile.name}</th>
                        <th>MFSR</th>
                        <th>Change</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td className='heading1'>Total</td>
                        <td>{totalMSPR}</td>
                        <td>{totalChange}</td>
                    </tr>
                    <tr>
                        <td className='heading1'>Positive</td>
                        <td>{positiveMSPR}</td>
                        <td>{positiveChange}</td>
                    </tr>
                    <tr>
                        <td className='heading1'>Negative</td>
                        <td>{negativeMSPR}</td>
                        <td>{negativeChange}</td>
                    </tr>
                </tbody>
            </table>
            </center>
            <div className='rowInsights'>
            <div className='recommendationChart'>
<RecommendationChart/>
</div>
<EarningsCharts/>
</div>
            </div>
    )
}

export default Insight