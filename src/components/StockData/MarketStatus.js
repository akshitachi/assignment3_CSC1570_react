import React from 'react'
import './MarketStatus.css';
import { useSearchResult } from '../State/SearchResultContext';

function MarketStatus  () {
  const {searchResults} = useSearchResult();
  const marketStatus = searchResults.marketStatus;
  const quoteResult = searchResults.quote;


const unixTimestamp = quoteResult.t;
  const timestampInMilliseconds = unixTimestamp * 1000;
  const date = new Date(timestampInMilliseconds);
  const formattedDate = `${date.getFullYear()}-${(date.getMonth() + 1)
    .toString()
    .padStart(2, '0')}-${date.getDate().toString().padStart(2, '0')} ${date
    .getHours()
    .toString()
    .padStart(2, '0')}:${date.getMinutes().toString().padStart(2, '0')}:${date
    .getSeconds()
    .toString()
    .padStart(2, '0')}`;
return (
    <div className={`marketStatus${window.innerWidth > 844 ? '' : 'big'}`} style={{ color: marketStatus ? 'green' : 'red' }}>
        {marketStatus ? 'Market is Open' : `Market is Closed on ${formattedDate}`}
    </div>
);
}

export default MarketStatus