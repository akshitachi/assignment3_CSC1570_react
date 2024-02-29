import React from "react";
import Blue_Header from "../../components/Blue_Header";
import Main_Text from "../../components/Main_Text";
import Footer from "../../components/Footer";
import Search_Bar from "../../components/Search_Bar";
import Stock_Data from "./Stock_Data";

function Home_Page() {
  return (
    <div>
    <Blue_Header/>
    <Main_Text/>
    <Search_Bar/>
    <Stock_Data />
    <Footer/>
    </div>
  );
}
export default Home_Page