import React, { useEffect,useState } from 'react'
import Blue_Header from '../../components/Utils/Blue_Header'
import Footer from '../../components/Utils/Footer'
import './Portfolio_Page.css'
import { CircularProgress } from '@mui/material';
import Portfolio_Card from './Portfolio_Card';

function Portolio_Page ()  {
  const [money, setMoney] = useState(0);
  const [loading, setLoading] = useState(true);
  const [portfolio, setPortfolio] = useState([]);
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
        setLoading(false);
        console.log(data);
      })
      .catch(error => {
        console.error(error);
        setLoading(false);
      })
      
  }, []);
  useEffect(() => {
    fetch(`http://localhost:8080/getportfolio`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then(response => response.json())
      .then(data => {
      setPortfolio(data);
      console.log(portfolio);
      })
      .catch(error => {
        console.error(error);
      });
  }, [portfolio]);

  return (
    <div>
      
          <Blue_Header activeLinkText={"portfolio"}/>
          {loading ? (
       <center> <CircularProgress /> </center>
      ) : (
          <div className='portfolio'>
            <h1 className='portfolioText'>My Portfolio</h1>
            <h3 className='portfolioText'>Money in Wallet: ${parseFloat(money).toFixed(2)}</h3>
            {portfolio.length === 0 ? <div className='portfolionone'>Currently you don't have any stock.</div> : null}
        {portfolio.length !== 0 && portfolio.map(item => (
          <Portfolio_Card quantity={item.quantity} name={item.name} avgCost={item.avgCost} ticker={item.ticker} totalCost={item.totalCost}/>
        ))}
          </div>
      )
    }
          <Footer/>
    </div>
  );
}

export default Portolio_Page