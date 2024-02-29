import React, {useState} from "react";
import Blue_Header from "../../components/Blue_Header";
import Main_Text from "../../components/Main_Text";
import Footer from "../../components/Footer";
import Search_Bar from "../../components/Search_Bar";
import Stock_Data from "./Stock_Data";

function Home_Page() {
  const [symbolToPass, setSymbolToPass] = useState('');
  const handleSymbolSelect = (symbol) => {
    setSymbolToPass(symbol);
  };
  return (
    <div>
    <Blue_Header/>
    <Main_Text/>
    <Search_Bar onSymbolSelect={handleSymbolSelect}/>
    <Stock_Data symbolToPass={symbolToPass}/>
    <Footer/>
    </div>
  );
}

export default Home_Page