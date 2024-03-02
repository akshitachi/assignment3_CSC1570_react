import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import MainHeader from "../../components/StockData/MainHeader";
import "./Stock_Data.css";
import CompanyLogo from "../../components/StockData/CompanyLogo";
import Price from "../../components/StockData/Price";
import { useSearchResult } from "../../components/State/SearchResultContext";

function Stock_Data({}) {
  const { ticker } = useParams();
  const { searchResults, updateSearchResults } = useSearchResult();
  console.log("searchResults: ", searchResults);
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
          updateSearchResults(data);
        })
        .catch(error => {
          console.error(error);
        });
  }, [ticker]); 

  if (ticker === undefined || searchResults === null || searchResults.ticker === null){
    return null; 
  }
  

  return (
    <div className="stock-main">
      <MainHeader searchResults={JSON.stringify({searchResults})}/>
      <CompanyLogo logoUrl={searchResults.logo}/>
      <Price />
    </div>
  );
}

export default Stock_Data;
