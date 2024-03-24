import React, { useEffect, useState } from 'react';
import './Portfolio_Card.css';

const Portfolio_Card = ({quantity,avgCost,name,ticker,totalCost}) => {
    const [quote, setQuote] = useState({});
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
return (
    <div className='portfolioCard'>
        <div className='rowportfolio2'>
            <h2 className='portfolioTicker'>{ticker}</h2>
            <div className='portfolioName'>{name}</div>
        </div>
        <div className='rowportfolio3'>
            <div>
                <div className='labels'>Quantity: </div>
                <div className='labels'>Avg. Cost / Share: </div>
                <div className='labels'>Total Cost: </div>
            </div>
            <div className='column2'>
                <div className='labels'>{quantity.toFixed(2)}</div>
                <div className='labels'>{avgCost.toFixed(2)}</div>
                <div className='labels'>{totalCost.toFixed(2)}</div>
            </div>
            <div className='column3'>
                <div className='labels'>Change: </div>
                <div className='labels'>Current Price: </div>
                <div className='labels'>Market Value:</div>
            </div>
            <div>
                <div className={`labels ${quote && quote.quote && (quote.quote.c > avgCost) ? 'green' : quote && quote.quote && (quote.quote.c < avgCost) ? 'red' : '' }`}>
                <div className='rowportolio5'>
            <div>{quote && quote.quote && quote.quote.c.toFixed(2) > avgCost ? '▲' : quote && quote.quote && quote.quote.c.toFixed(2) < avgCost? '▼':''}</div>
                    {quote && quote.quote && (quote.quote.c - avgCost).toFixed(2)}
                    </div>
                </div>
                <div className={`labels ${quote && quote.quote && (quote.quote.c > avgCost) ? 'green' : quote && quote.quote && (quote.quote.c < avgCost) ? 'red' : '' }`}>
                    {quote && quote.quote && quote.quote.c}
                </div>
                <div className={`labels ${quote && quote.quote && (quote.quote.c > avgCost) ? 'green' : quote && quote.quote && (quote.quote.c < avgCost) ? 'red' : '' }`}>
                    {quote && quote.quote && (quote.quote.c * quantity).toFixed(2)}
                </div>
            </div>
        </div>
        <div className='rowportfolio6'>
        <button className="buy_button3" >
                  Buy
                </button>
                  <button className="sell_button2">
                    Sell
                  </button>
        </div>
    </div>
)
}

export default Portfolio_Card