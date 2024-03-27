import React from 'react'
import './MarketStatus.css';
import { useSearchResult } from '../State/SearchResultContext';

function MarketStatus  () {
  const {searchResults} = useSearchResult();
  const marketStatus = searchResults.marketStatus;

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

return (
    <div className={`marketStatus${window.innerWidth > 844 ? '' : 'big'}`} style={{ color: marketStatus ? 'green' : 'red' }}>
        {marketStatus ? 'Market is Open' : `Market is Closed on ${formattedDateString}`}
    </div>
);
}

export default MarketStatus