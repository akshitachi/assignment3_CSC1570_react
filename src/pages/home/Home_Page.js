import React from "react";
import Blue_Header from "../../components/Blue_Header";
import Main_Text from "../../components/Main_Text";
import Footer from "../../components/Footer";
import Search_Bar from "../../components/Search_Bar";

function Home_Page() {
  // const [message, setMessage] = useState("");

  // useEffect(() => {
  //   fetch("http://localhost:8080/message")
  //     .then((res) => res.json())
  //     .then((data) => setMessage(data.message));
  // }, []);

  return (
    <div>
    <Blue_Header/>
    <Main_Text/>
    <Search_Bar/>
    <Footer/>
    </div>
  );
}

export default Home_Page