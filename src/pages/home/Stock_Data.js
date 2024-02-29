import React from "react";
import { useParams } from "react-router-dom";

function Stock_Data() {
  const { ticker } = useParams();
  console.log(ticker);
  if (ticker === undefined) {
    return null;
  }

  return (
    <div>
      <h2>Stock Data for {ticker}</h2>
    </div>
  );
}

export default Stock_Data;
