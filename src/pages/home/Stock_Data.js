import React, { useEffect,useState } from "react";
import { useParams } from "react-router-dom";
import "./Stock_Data.css";
import CompanyLogo from "../../components/StockData/CompanyLogo";
import Price from "../../components/StockData/Price";
import { useSearchResult } from "../../components/State/SearchResultContext";
import MarketStatus from "../../components/StockData/MarketStatus";
import MaterialTab from "../../components/StockData/MaterialTab/MaterialTab";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-regular-svg-icons';
import { faStar as faStarSolid } from '@fortawesome/free-solid-svg-icons';
import { faX } from '@fortawesome/free-solid-svg-icons';
import { CircularProgress } from '@mui/material';
import Modal from 'react-bootstrap/Modal';

function Stock_Data({}) {
  const { ticker } = useParams();
  const { searchResults, updateSearchResults } = useSearchResult();
  const [isFavorite, setIsFavorite] = useState(false);
  const [showMessage, setShowMessage] = useState(false);
  const [showMessagePortfolio, setShowMessagePortfolio] = useState(false);
  const [show, setShow] = useState(false);
  const [money, setMoney] = useState(0);
  const [quantity, setQuantity] = useState(0);
  const [isPortfolio, setisPortfolio] = useState(false);

        useEffect(() => {
          if (searchResults == null || searchResults.profile.ticker == null) {
            fetch(`http://localhost:8080/search/${ticker}`, {
              method: 'GET',
              headers: {
                'Content-Type': 'application/json',
              },
            })
              .then(response => response.json())
              .then(data => {
                updateSearchResults(data);
              })
              .catch(error => {
                console.error(error);
              });
        }
        const checkFavorite = async () => {
          try {
            const response = await fetch(`http://localhost:8080/watchlistCheck/${ticker}`);
            if (response.ok) {
              setIsFavorite(true);
            } else {
              setIsFavorite(false);
            }
          } catch (error) {
            console.error('Error checking ticker in watchlist:', error);
          }
        };
        checkFavorite();
        fetch(`http://localhost:8080/checkPortfolio/${ticker}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }) .then(response => response.json()).then(data => {
          setisPortfolio(data);
        });
        }, [ticker]);
        
  useEffect(() => {
    if (showMessage) {
      setTimeout(() => {
        setShowMessage(false);
      }, 5000);
    }
  }, [showMessage]);
  useEffect(() => {
    if (showMessagePortfolio) {
      setTimeout(() => {
        setShowMessagePortfolio(false);
      }, 5000);
    }
  }, [showMessagePortfolio]);
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
  if (ticker === undefined || searchResults === null || searchResults.ticker === null){
    return null; 
  }
   const profile = searchResults.profile;
 
   const handleFavoriteClick = () => {
    if (!isFavorite) {
      fetch(`http://localhost:8080/watchlist/${profile.ticker}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      })
      .then(response => {
        if (response.ok) {
          console.log(`${profile.ticker} added to Watchlist.`);
        } else {
          console.error('Error adding to Watchlist.');
        }
      })
      .catch(error => {
        console.error(error);
      });
    } else {
      fetch(`http://localhost:8080/watchlistDelete/${profile.ticker}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    })
    .then(response => {
      console.log('removed');
      if (response.ok) {
        console.log(`${profile.ticker} removed from Watchlist.`);
      } else {
        console.error('Error removing from Watchlist.');
      }
    })
    .catch(error => {
      console.error(error);
    });
    }
     setIsFavorite(!isFavorite);
     setShowMessage(true);
    };

   const closeMessage = () => {
    setShowMessage(false);
   };
   const closeMessagePortfolio = () => {
    setShowMessagePortfolio(false);
   };

   const handleClose = () => {
    setQuantity(0);
    setShow(false);
  }
   const handleShow = () => {
    setShow(true);
    
  }

  const handleBuyClick = () => {
    var newPortfolio = { 
      totalCost: parseFloat(quantity) * searchResults.quote.c,
      ticker: profile.ticker,
      quantity: parseFloat(quantity),
      name: profile.name,
      avgCost: searchResults.quote.c,
    };
    if(!isPortfolio){
    fetch("http://localhost:8080/makeportfolio", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newPortfolio),
    })
      .then((response) => {
        if (response.ok) {
          console.log("New portfolio created.");
        } else {
          console.error("Error creating portfolio.");
        }
      })
      .catch((error) => {
        console.error(error);
      });
    fetch(`http://localhost:8080/updateMoney/${money - (parseFloat(quantity) * searchResults.quote.c)}`, {
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
    }
    else{
        fetch(`http://localhost:8080/updatePortfolio/${profile.ticker}`, {
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
        fetch(`http://localhost:8080/updateMoney/${money - (parseFloat(quantity) * searchResults.quote.c)}`, {
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
    }
      handleClose();
      setShowMessagePortfolio(true);
      setisPortfolio(true);
  };

  return (
    <>
      {searchResults ? (
        <div className="stock-column">
          {showMessage && (
            <div
              className={`messageFavorite ${
                isFavorite ? "added" : "removed"
              }`}
            >
              <span style={{ marginRight: 480, marginLeft: 450 }}>
                {isFavorite
                  ? `${profile.ticker} added to Watchlist.`
                  : `${profile.ticker} removed from Watchlist.`}
              </span>
              <FontAwesomeIcon
                onClick={closeMessage}
                className="x-icon"
                icon={faX}
              />
            </div>
          )}
          {showMessagePortfolio && (
            <div
              className={`messageFavorite ${
                isPortfolio ? "added" : "removed"
              }`}
            >
              <span style={{ marginRight: 480, marginLeft: 450 }}>
                {isPortfolio
                  ? `${profile.ticker} bought successfully.`
                  : `${profile.ticker} sold successfully.`}
              </span>
              <FontAwesomeIcon
                onClick={closeMessagePortfolio}
                className="x-icon"
                icon={faX}
              />
            </div>
          )}
          <div className="stock-main">
            <div className="column1">
              <div className="row1">
                <h1 className="ticker_text">{searchResults.profile.ticker}</h1>
                <div
                  className={`favorite_icon ${
                    isFavorite ? "favorite" : ""
                  }`}
                >
                  <FontAwesomeIcon
                    icon={isFavorite ? faStarSolid : faStar}
                    style={{
                      width: 30,
                      color: isFavorite ? "#FFD43B" : "black",
                    }}
                    size="2x"
                    onClick={handleFavoriteClick}
                  />
                </div>
              </div>
              <h1 className="companyName">{searchResults.profile.name}</h1>
              <p className="exchange">{searchResults.profile.exchange}</p>
              <div className="row2">
                <button className="buy_button" onClick={handleShow}> 
                  Buy
                </button>
                {isPortfolio && (
                  <button className="sell_button" onClick={handleShow}>
                    Sell
                  </button>
                )}
                <Modal show={show} onHide={handleClose} animation={false}>
                  <Modal.Header closeButton>
                    <Modal.Title>
                      {searchResults.profile.ticker}
                    </Modal.Title>
                  </Modal.Header>
                  <Modal.Body>
                    <div>Current Price: {searchResults.quote.c}</div>
                    <div>Money in Wallet: ${money.toFixed(2)}</div>
                    <div>
                      Quantity:
                      <input
                        type="number"
                        value={parseFloat(quantity)}
                        onChange={(e) => setQuantity(parseFloat(e.target.value))}
                        style={{ width: "380px",marginLeft:7 }}
                        min={0}
                        max={9999}
                      />
                      {money < parseFloat(quantity) * searchResults.quote.c && (
                        <div style={{ color: "red", marginBottom:22,marginTop:7}}>Not enough money in wallet!</div>
                      )}
                    </div>
                  </Modal.Body>
                  <Modal.Footer>
                    <div className="buy_column">
                      <div>
                        Total: {quantity ? (parseFloat(quantity) * searchResults.quote.c).toFixed(2) : 0}
                      </div> 
                      <button className="buy_button2" onClick={handleBuyClick} disabled={ (money < parseFloat(quantity) * searchResults.quote.c || quantity===0 || isNaN(quantity))} style={{ backgroundColor: (money < parseFloat(quantity) * searchResults.quote.c || quantity===0 ||isNaN(quantity)) ? "#85B99E" : "" }}>
                        Buy
                      </button>
                    </div>
                  </Modal.Footer>
                </Modal>
              </div>
            </div>
            <CompanyLogo logoUrl={profile.logo} />
            <Price />
          </div>
          <MarketStatus />
          <MaterialTab />
        </div>
      ) : (
        <CircularProgress />
      )}
    </>
  );
}

export default Stock_Data;
