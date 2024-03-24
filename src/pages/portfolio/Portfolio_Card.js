import React, { useEffect, useState } from 'react';
import './Portfolio_Card.css';
import Modal from 'react-bootstrap/Modal';

const Portfolio_Card = ({quantity,avgCost,name,ticker,totalCost}) => {
    const [quote, setQuote] = useState({});
    const [show, setShow] = useState(false);
    const [money, setMoney] = useState(0);
    const [quantity2, setQuantity2] = useState(0);
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
    useEffect(() => {
        fetch(`http://localhost:8080/getMoney`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        })
          .then(response => response.json())
          .then(data => {
            setMoney(data);
            console.log(data);
          })
          .catch(error => {
            console.error(error);
          })
      }, []);
    const handleClose = () => {
        setQuantity2(0);
        setShow(false);
      }
       const handleShow = () => {
        setShow(true); 
      }

      const handleBuyClick = () => {
        var newPortfolio = { 
          totalCost: parseFloat(quantity2) * quote.quote.c,
          ticker: ticker,
          quantity: parseFloat(quantity2),
          name: name,
          avgCost: quote.quote.c,
        };
            fetch(`http://localhost:8080/updatePortfolio/${ticker}`, {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify(newPortfolio),
            })
              .then(response => {
                if (response.ok) {
                  console.log('Portfolio updated successfully.');
                } else {
                  console.error('Error updating portfolio.');
                }
              })
              .catch(error => {
                console.error(error);
              });
            fetch(`http://localhost:8080/updateMoney/${money - (parseFloat(quantity2) * quote.quote.c)}`, {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
            })
              .then(response => {
                if (response.ok) {
                  console.log('Money updated successfully.');
                } else {
                  console.error('Error updating money.');
                }
              })
              .catch(error => {
                console.error(error);
              });
        
          handleClose();
      };
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
                <div className={`labels ${quote && quote.quote && (quote.quote.c.toFixed(2) > avgCost.toFixed(2)) ? 'green' : quote && quote.quote && (quote.quote.c.toFixed(2) < avgCost.toFixed(2)) ? 'red' : '' }`}>
                <div className='rowportolio5'>
            <div>{quote && quote.quote && quote.quote.c.toFixed(2) > avgCost.toFixed(2) ? '▲' : quote && quote.quote && quote.quote.c.toFixed(2) < avgCost.toFixed(2)? '▼':''}</div>
                    {quote && quote.quote && (quote.quote.c - avgCost).toFixed(2)}
                    </div>
                </div>
                <div className={`labels ${quote && quote.quote && (quote.quote.c.toFixed(2) > avgCost.toFixed(2)) ? 'green' : quote && quote.quote && (quote.quote.c.toFixed(2) < avgCost.toFixed(2)) ? 'red' : '' }`}>
                    {quote && quote.quote && quote.quote.c}
                </div>
                <div className={`labels ${quote && quote.quote && (quote.quote.c.toFixed(2) > avgCost.toFixed(2)) ? 'green' : quote && quote.quote && (quote.quote.c.toFixed(2) < avgCost.toFixed(2)) ? 'red' : '' }`}>
                    {quote && quote.quote && (quote.quote.c * quantity).toFixed(2)}
                </div>
            </div>
        </div>
        <div className='rowportfolio6'>
        <button className="buy_button3" onClick={handleShow}>
                  Buy
                </button>
                  <button className="sell_button2">
                    Sell
                  </button>
                  <Modal show={show} onHide={handleClose} animation={false}>
                  <Modal.Header closeButton>
                    <Modal.Title>
                      {ticker}
                    </Modal.Title>
                  </Modal.Header>
                  <Modal.Body>
                    <div>Current Price: {quote && quote.quote && quote.quote.c}</div>
                    <div>Money in Wallet: ${money.toFixed(2)}</div>
                    <div>
                      Quantity:
                      <input
                        type="number"
                        value={parseFloat(quantity2)}
                        onChange={(e) => setQuantity2(parseFloat(e.target.value))}
                        style={{ width: "380px",marginLeft:7 }}
                        min={0}
                        max={9999}
                      />
                      {quote && quote.quote && money < parseFloat(quantity2) * quote.quote.c && (
                        <div style={{ color: "red", marginBottom:22,marginTop:7}}>Not enough money in wallet!</div>
                      )}
                    </div>
                  </Modal.Body>
                  <Modal.Footer>
                    <div className="buy_column">
                      <div>
                        Total: {quote && quote.quote && quantity2 ? (parseFloat(quantity2) * quote.quote.c).toFixed(2) : 0}
                      </div> 
                      <button className="buy_button2" onClick={handleBuyClick} disabled={quote && quote.quote &&  (money < parseFloat(quantity2) * quote.quote.c || quantity2===0 || isNaN(quantity2))} style={{ backgroundColor: quote && quote.quote &&  (money < parseFloat(quantity2) * quote.quote.c || quantity2===0 ||isNaN(quantity2)) ? "#85B99E" : "" }}>
                        Buy
                      </button>
                    </div>
                  </Modal.Footer>
                </Modal>
        </div>
    </div>
)
}

export default Portfolio_Card