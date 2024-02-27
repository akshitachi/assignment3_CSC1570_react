import React, { useState, useEffect } from "react";
import "./App.css";
import Home_Page from "./pages/home/Home_Page";

function App() {
  // const [message, setMessage] = useState("");

  // useEffect(() => {
  //   fetch("http://localhost:8080/message")
  //     .then((res) => res.json())
  //     .then((data) => setMessage(data.message));
  // }, []);

  return (
    <Home_Page/>
  );
}

export default App