import React, { useEffect,useState } from 'react';
import './Watchlist_Card.css';
import { BsX } from 'react-icons/bs';
import { useNavigate } from 'react-router-dom';
import { useSearchResult } from '../../components/State/SearchResultContext';
const Watchlist_Card = ({ticker}) => {
    const navigate = useNavigate();

   const [quote, setQuote] = useState({});
   const { updateSearchResults } = useSearchResult();
    useEffect(() => {
        fetch(`http://localhost:8080/quote/${ticker}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        })
        .then(response => response.json())
        .then(data => {
            setQuote(data);
            console.log(data);
        })
        .catch(error => {
            console.error(error);
        });
    }, [ticker]);
const handleDelete = () => {
    fetch(`http://localhost:8080/watchlistDelete/${ticker}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json', 
        },
      })
      .then(response => {
        console.log('removed');
        if (response.ok) {
          console.log(`${ticker} removed from Watchlist.`);
        } else {
          console.error('Error removing from Watchlist.');
        }
      })
      .catch(error => {
        console.error(error);
      });
      };
      const handleNavigate = () =>{
        updateSearchResults(null);
        navigate(`/search/${ticker}`);
    }
    return (
        <div className='watchlist_card2' >
        <div className='watchlist_card'>
            <BsX className='clear-watchlist' onClick={handleDelete}></BsX>
            <div className='watchlist_card' onClick={handleNavigate}>
            <h2>{ticker}</h2>
           <h5>{quote && quote.quote && quote.profile.name}</h5>
           </div>
        </div>
        <div className='pricesinWatchlist' onClick={handleNavigate}>
            <h2 style={{ color: quote && quote.quote && quote.quote.d > 0 ? 'green' : quote && quote.quote && quote.quote.d < 0 ? 'red' : 'black' }}>
            {quote && quote.quote && quote.quote.c}
            </h2>
            <div className='rowwatchlist'>
            <div style={{ color: quote && quote.quote && quote.quote.d > 0 ? 'green' : quote && quote.quote && quote.quote.d < 0 ? 'red' : 'black' }}>{quote && quote.quote && quote.quote.d.toFixed(2) > 0 ? '▲' : '▼'}</div>
            <h5 className='watchlistD' style={{ color: quote && quote.quote && quote.quote.d > 0 ? 'green' : quote && quote.quote && quote.quote.d < 0 ? 'red' : 'black' }}>
                {quote && quote.quote && quote.quote.d.toFixed(2)}
            </h5>
            <h5 style={{ color: quote && quote.quote && quote.quote.d > 0 ? 'green' : quote && quote.quote && quote.quote.d < 0 ? 'red' : 'black' }}>
                ({quote && quote.quote && quote.quote.dp.toFixed(2)}%)
            </h5>
            </div>

        </div>
        </div>
    )
}

export default Watchlist_Card