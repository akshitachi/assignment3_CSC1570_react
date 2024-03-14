import React, { createContext, useContext, useState } from 'react';

const TickerContext = createContext();

export const TickerResultProvider = ({ children }) => {
  const [tickerResults, setTickerResults] = useState(null);

  const updateTickerResults = (results) => {
    setTickerResults(results);
  };

  return (
    <TickerContext.Provider value={{ tickerResults, updateTickerResults }}>
      {children}
    </TickerContext.Provider>
  );
};

export const useTickerResult = () => {
  return useContext(TickerContext);
};
