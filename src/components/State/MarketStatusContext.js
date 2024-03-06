import React, { createContext, useContext, useState } from 'react';

const MarketResultContext = createContext();

export const MarketResultProvider = ({ children }) => {
  const [marketResult, setMarketResults] = useState(null);

  const updateMarketResults = (results) => {
    setMarketResults(results);
  };

  return (
    <MarketResultContext.Provider value={{ marketResult, updateMarketResults }}>
      {children}
    </MarketResultContext.Provider>
  );
};

export const useMarketResults = () => {
  return useContext(MarketResultContext);
};
