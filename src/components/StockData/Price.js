import React from 'react';
import './Price.css';
import { useQuoteResults } from '../State/QuoteResultContext';

function Price() {
  const { quoteResult } = useQuoteResults();

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

  return (
    <div className='price'>
      <div className='lastPrice' style={{ color: changeColor }}>
        {quoteResult.c}
      </div>
      <div className='priceChanges'>
        {quoteResult.d !== 0 && (
          <div
            className={`triangle ${triangleDirection}`}
            style={{ color: changeColor }}
          >
            {triangleDirection === 'up' ? '▲' : '▼'}
          </div>
        )}
        <div className='change' style={{ color: changeColor }}>
          {quoteResult.d}
        </div>
        <div className='percent' style={{ color: changeColor }}>
          ({quoteResult.dp}%)
        </div>
      </div>
      <div className='date'>{formattedDate}</div>
    </div>
  );
}

export default Price;
