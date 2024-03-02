import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import MainHeader from "../../components/StockData/MainHeader";
import "./Stock_Data.css";
import CompanyLogo from "../../components/StockData/CompanyLogo";
import Price from "../../components/StockData/Price";

function Stock_Data() {
  const { ticker } = useParams();
  console.log(ticker);
  const [stockData, setStockData] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:8080/search/${ticker}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      })
      .then(response => response.json())
        .then(data => {
          
          setStockData(data);
        })
        .catch(error => {
          console.error(error);
        });
  }, [ticker]); 

  if (ticker === undefined || stockData === null) {
    return null; 
  }

  return (
    <div className="stock-main">
      <MainHeader stockData={JSON.stringify({stockData})}/>
      <CompanyLogo logoUrl={stockData.logo}/>
      <Price />
    </div>
  );
}

export default Stock_Data;
