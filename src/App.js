import React from "react";
import "./App.css";
import Home_Page from "./pages/home/Home_Page";
import { Routes, Route, Navigate } from "react-router-dom";
import Portolio_Page from "./pages/portfolio/Portolio_Page";
import Watchlist_Page from "./pages/watchlist/Watchlist_Page";
import { SearchResultProvider } from "./components/State/SearchResultContext";
import { TickerResultProvider } from "./components/State/TickerContext";

function App() {

  return (
    // <TickerResultProvider>
    <SearchResultProvider>
    <div>
      <Routes>
        <Route path="/" element={<Navigate to="/search/home" />} />
        <Route path="/search/home" element={<Home_Page />} />
        <Route path="/search/:ticker" element={<Home_Page />} />
        <Route path="/portfolio" element={<Portolio_Page />} />
        <Route path="/watchlist" element={<Watchlist_Page/>} />
      </Routes>
    </div>
    </SearchResultProvider>
    //</TickerResultProvider>
  );
}

export default App