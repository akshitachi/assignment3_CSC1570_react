import React, { createContext, useContext, useState } from 'react';

const QuoteResultContext = createContext();

export const QuoteResultProvider = ({ children }) => {
  const [quoteResult, setQuoteResults] = useState(null);

  const updateQuoteResults = (results) => {
    setQuoteResults(results);
  };

  return (
    <QuoteResultContext.Provider value={{ quoteResult, updateQuoteResults }}>
      {children}
    </QuoteResultContext.Provider>
  );
};

export const useQuoteResults = () => {
  return useContext(QuoteResultContext);
};
