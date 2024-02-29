import React from "react";
import "./App.css";
import Home_Page from "./pages/home/Home_Page";
import { Routes, Route, Navigate } from "react-router-dom";

function App() {

  return (
    <div>
      <Routes>
        <Route path="/" element={<Navigate to="/search/home" />} />
        <Route path="/search/home" element={<Home_Page />} />
        <Route path="/search/:ticker" element={<Home_Page />} />
      </Routes>
    </div>
  );
}

export default App