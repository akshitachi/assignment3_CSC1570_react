import React from 'react'

function MainHeader({stockData}) {
    const jsonStockData = JSON.parse(stockData);
    const stockFinalData = jsonStockData.stockData;
  return (
    <div>
      <h1>{stockFinalData.country}</h1>
    </div>
  )
}
export default MainHeader;

