import React, { useEffect,useState } from 'react'
import Blue_Header from '../../components/Utils/Blue_Header'
import Footer from '../../components/Utils/Footer'
import './Portfolio_Page.css'
import { CircularProgress } from '@mui/material';
import Portfolio_Card from './Portfolio_Card';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faX } from '@fortawesome/free-solid-svg-icons';

function Portolio_Page ()  {
  const [money, setMoney] = useState(undefined);
  const [portfolio, setPortfolio] = useState(undefined);
  const [showMessage, setShowMessage] = useState(false);
  const [isPortfolio, setisPortfolio] = useState(true);
  const [dataFromChild, setDataFromChild] = useState(null);
  
  useEffect(() => {
    fetch(`https://assignment3-nodejs-akshil-shah.wl.r.appspot.com/getMoney`, {
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
      .catch(error => {
        console.error(error);
      });
      }, [portfolio]);
      
  useEffect(() => {
    fetch(`https://assignment3-nodejs-akshil-shah.wl.r.appspot.com/getportfolio`, {
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
          <div className={`portfolio${window.innerWidth > 844 ? '' : 'big'}`}>
            {showMessage && (
            <div
              className={`messageFavorite2${window.innerWidth > 844 ? '' : 'big'} ${
                isPortfolio ? "added" : "removed"
              } `}
            >
              <span style={window.innerWidth>844?{ marginRight: 480, marginLeft: 450 }:{width:330, textAlign:'center'}}>
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
            <h1 className={`portfolioText${window.innerWidth > 844 ? '' : 'big'}`}>My Portfolio</h1>
            {portfolio === undefined ? <div className="progressIndicator2">
              <center>
                <CircularProgress size={55} />
              </center></div> : null}
           {money !== undefined ? <h3 className={`portfolioText${window.innerWidth > 844 ? '' : 'big'}`}>Money in Wallet: ${parseFloat(money).toFixed(2)}</h3>: null}
            {portfolio && portfolio.length === 0 ? <div className='portfolionone'>Currently you don't have any stock.</div> : null}
        {portfolio && portfolio.length !== 0 && portfolio.map(item => (
          <Portfolio_Card quantity={item.quantity} name={item.name} avgCost={item.avgCost} ticker={item.ticker} totalCost={item.totalCost} sendDataToParent={receiveDataFromChild}/>
        ))}
        </div>
          <Footer/> 
    </div>
  );
}

export default Portolio_Page