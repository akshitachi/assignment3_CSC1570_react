import React, { useEffect,useState } from 'react'
import Blue_Header from '../../components/Utils/Blue_Header'
import Footer from '../../components/Utils/Footer'
import './Portfolio_Page.css'

function Portolio_Page ()  {
  const [money, setMoney] = useState(0);
  useEffect(() => {
    fetch(`http://localhost:8080/getMoney`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then(response => response.json())
      .then(data => {
        setMoney(data);
        console.log(data);
      })
      .catch(error => {
        console.error(error);
      })
  }, []);
  return (
    <div>
    <Blue_Header activeLinkText={"portfolio"}/>
    <div className='portfolio'>
        <h1 className='portfolioText'>My Portfolio</h1>
        <h3 className='portfolioText'>Money in Wallet: ${parseInt(money).toFixed(2)}</h3>
    <div className='portfolionone'>Currently you don't have any stock.</div>
        </div>
    <Footer/>
    </div>
  )
}

export default Portolio_Page