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

function Stock_Data({}) {
  const { ticker } = useParams();
  const { searchResults, updateSearchResults } = useSearchResult();
  const [isFavorite, setIsFavorite] = useState(false);
 
  const [showMessage, setShowMessage] = useState(false);
        useEffect(() => {
          if (searchResults == null || searchResults.ticker == null) {
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
        }, [ticker]);
        
  useEffect(() => {
    if (showMessage) {
      setTimeout(() => {
        setShowMessage(false);
      }, 5000);
    }
  }, [showMessage]);
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
                  <button className="buy_button">Buy</button>
                </div>
              </div>
              {/* <MainHeader searchResults={JSON.stringify({profile})}/> */}
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
