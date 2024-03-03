import React from "react";
import Blue_Header from "../../components/Utils/Blue_Header";
import Main_Text from "../../components/Utils/Main_Text";
import Footer from "../../components/Utils/Footer";
import Search_Bar from "../../components/Utils/Search_Bar";
import Stock_Data from "./Stock_Data";

function Home_Page() {
  return (
    <div>
    <Blue_Header activeLinkText={"search"}/>
    <Main_Text/>
    <Search_Bar/>
    <Stock_Data/>
    <Footer/>
    </div>
  );
}
export default Home_Page