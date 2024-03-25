import React, { useEffect,useState } from 'react'
import Blue_Header from '../../components/Utils/Blue_Header'
import Footer from '../../components/Utils/Footer'
import './Portfolio_Page.css'
import { CircularProgress } from '@mui/material';
import Portfolio_Card from './Portfolio_Card';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faX } from '@fortawesome/free-solid-svg-icons';

function Portolio_Page ()  {
  const [money, setMoney] = useState(0);
  const [loading, setLoading] = useState(true);
  const [portfolio, setPortfolio] = useState([]);
  const [showMessage, setShowMessage] = useState(false);
  const [isPortfolio, setisPortfolio] = useState(true);
  const [dataFromChild, setDataFromChild] = useState(null);
  
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
      .catch(error => {
        console.error(error);
      });
      }, [portfolio]);
      
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

  const receiveDataFromChild = (data,data2) => {
    setDataFromChild(data);
    setisPortfolio(data2);
    setShowMessage(true);
  };
  useEffect(() => {
    if (showMessage) {
      setTimeout(() => {
        setShowMessage(false);
      }, 5000);
    }
  }, [showMessage]);
  const closeMessage = () => {
    setShowMessage(false);
   };
  return (
    <div>
          <Blue_Header activeLinkText={"portfolio"}/>
          {loading ? (
       <center> <CircularProgress /> </center>
      ) : (
          <div className='portfolio'>
            {showMessage && (
            <div
              className={`messageFavorite2 ${
                isPortfolio ? "added" : "removed"
              }`}
            >
              <span style={{ marginRight: 480, marginLeft: 450 }}>
                {isPortfolio
                  ? `${dataFromChild} bought successfully.`
                  : `${dataFromChild} sold successfully.`}
              </span>
              <FontAwesomeIcon
                onClick={closeMessage}
                className="x-icon"
                icon={faX}
              />
            </div>
          )}
            <h1 className='portfolioText'>My Portfolio</h1>
            <h3 className='portfolioText'>Money in Wallet: ${parseFloat(money).toFixed(2)}</h3>
            {portfolio.length === 0 ? <div className='portfolionone'>Currently you don't have any stock.</div> : null}
        {portfolio.length !== 0 && portfolio.map(item => (
          <Portfolio_Card quantity={item.quantity} name={item.name} avgCost={item.avgCost} ticker={item.ticker} totalCost={item.totalCost} sendDataToParent={receiveDataFromChild}/>
        ))}
          </div>
      )
    }
          <Footer/>
    </div>
  );
}

export default Portolio_Page