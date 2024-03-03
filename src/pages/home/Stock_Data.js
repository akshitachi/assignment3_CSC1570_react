import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import MainHeader from "../../components/StockData/MainHeader";
import "./Stock_Data.css";
import CompanyLogo from "../../components/StockData/CompanyLogo";
import Price from "../../components/StockData/Price";
import { useSearchResult } from "../../components/State/SearchResultContext";
import { useQuoteResults } from "../../components/State/QuoteResultContext";
import MarketStatus from "../../components/StockData/MarketStatus";
import MaterialTab from "../../components/StockData/MaterialTab/MaterialTab";

function Stock_Data({}) {
  const { ticker } = useParams();
  const { searchResults, updateSearchResults } = useSearchResult();
  const { updateQuoteResults } = useQuoteResults();
  useEffect(() => {
    if(searchResults==null || searchResults.ticker==null)
    fetch(`http://localhost:8080/search/${ticker}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      })
      .then(response => response.json())
        .then(data => {
          updateSearchResults(data.profile);
          updateQuoteResults(data.quote);
        })
        .catch(error => {
          console.error(error);
        });
  }, [ticker]); 

  if (ticker === undefined || searchResults === null || searchResults.ticker === null){
    return null; 
  }
  

  return (
    <div className="stock-column">
    <div className="stock-main">
      <MainHeader searchResults={JSON.stringify({searchResults})}/>
      <CompanyLogo logoUrl={searchResults.logo}/>
      <Price/>
    </div>
    <MarketStatus/>
    <MaterialTab/>
    </div>
  );
}

export default Stock_Data;
