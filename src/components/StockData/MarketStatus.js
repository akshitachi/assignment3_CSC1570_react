import React from 'react'
import { useQuoteResults } from '../State/QuoteResultContext';
import './MarketStatus.css';

function MarketStatus  () {
  const { quoteResult } = useQuoteResults();
  const currentTime = new Date().getTime();

  const currentDate = new Date().toLocaleString('en-US', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit'
});

const formattedDate = new Date(currentDate);
const formattedDateString = `${formattedDate.getFullYear()}-${(formattedDate.getMonth() + 1).toString().padStart(2, '0')}-${formattedDate.getDate().toString().padStart(2, '0')} ${formattedDate.getHours().toString().padStart(2, '0')}:${formattedDate.getMinutes().toString().padStart(2, '0')}:${formattedDate.getSeconds().toString().padStart(2, '0')}`;

const isMarketOpen = () => {
    const lastTimestamp = new Date(quoteResult.t).getTime();
    const timeDifference = (currentTime - lastTimestamp) / (1000 * 60);
    return timeDifference <= 5;
};

return (
    <div className="marketStatus" style={{ color: isMarketOpen() ? 'green' : 'red' }}>
        {isMarketOpen() ? 'Market is Open' : `Market is Closed on ${formattedDateString}`}
    </div>
);
}

export default MarketStatus