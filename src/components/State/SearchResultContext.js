import React, { createContext, useContext, useState } from 'react';

const SearchResultContext = createContext();

export const SearchResultProvider = ({ children }) => {
  const [searchResults, setSearchResults] = useState(null);

  const updateSearchResults = (results) => {
    setSearchResults(results);
  };

  return (
    <SearchResultContext.Provider value={{ searchResults, updateSearchResults }}>
      {children}
    </SearchResultContext.Provider>
  );
};

export const useSearchResult = () => {
  return useContext(SearchResultContext);
};
