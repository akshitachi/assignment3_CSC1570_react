import React from 'react';
import './Price.css';
import { useSearchResult } from '../State/SearchResultContext';

function Price() {
  const { searchResults } = useSearchResult();
  const quoteResult = searchResults.quote;
  const changeColor = quoteResult.d > 0 ? 'green' : 'red';

  const triangleDirection = quoteResult.d > 0 ? 'up' : 'down';

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
    var roundedD = 0;
    var roundedC = 0;
    var roundedDp = 0;
    if(quoteResult.d!=null && quoteResult.c!=null && quoteResult.dp!=null){
      roundedD = quoteResult.d.toFixed(2);
      roundedC = quoteResult.c.toFixed(2);
      roundedDp = quoteResult.dp.toFixed(2);
    }
  return (
    <div className='price'>
      <div className='lastPrice' style={{ color: changeColor }}>
        {roundedC}
      </div>
      <div className='priceChanges'>
        {roundedD !== 0 && (
          <div
            className={`triangle ${triangleDirection}`}
            style={{ color: changeColor }}
          >
            {triangleDirection === 'up' ? '▲' : '▼'}
          </div>
        )}
        <div className='change' style={{ color: changeColor }}>
          {roundedD}
        </div>
        <div className='percent' style={{ color: changeColor }}>
          ({roundedDp}%)
        </div>
      </div>
      <div className='date'>{formattedDate}</div>
    </div>
  );
}

export default Price;
