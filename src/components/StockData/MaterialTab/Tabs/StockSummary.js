import React, { useEffect } from 'react';
import './StockSummary.css'
import { useSearchResult } from '../../../State/SearchResultContext';
import AggregateCharts from '../../../Utils/AggregateCharts';

function StockSummary () {

  const { searchResults } = useSearchResult();
  const quoteResult = searchResults.quote;
  console.log(quoteResult);
  const peersResult = searchResults.peers;
  return (
    <div className='stockSummary'>
    <div className='stockSummaryoverall'>
      <div className='stockSummaryheader'>
      <div><span>High Price: </span>{quoteResult.h}</div>
      <div><span>Low Price: </span>{quoteResult.l}</div>
      <div><span>Open Price: </span>{quoteResult.o}</div>
      <div><span>Prev. Close: </span>{quoteResult.pc}</div>
      </div>
      <div className='about'>
        <div className='aboutthecompany'>About the company</div>
        <div className='item'><span>IPO Start Date: </span>{searchResults.profile.ipo}</div>
        <div className='item2'><span>Industry: </span>{searchResults.profile.finnhubIndustry}</div>
        <span className='item'>Webpage: </span><a className='item' href={searchResults.profile.weburl} target='_blank'>{searchResults.profile.weburl}</a>
        <div className='peers'>Company peers:</div>
        <div className='peerNames'>{peersResult.map((peer) => <a key={peer} href={`/search/${peer}`}>{peer} </a>)}</div>
      </div>
    </div>
    <AggregateCharts/>
    </div>
  )
}

export default StockSummary