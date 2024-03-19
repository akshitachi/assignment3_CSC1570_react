import React from 'react';
import Blue_Header from '../../components/Utils/Blue_Header';
import Footer from '../../components/Utils/Footer';
import { useEffect, useState } from 'react';
import Watchlist_Card from './Watchlist_Card';
import './Watchlist_Page.css';

  function Watchlist_Page() {
    const [watchlist, setWatchlist] = useState([]);
    useEffect(() => {
      fetch(`http://localhost:8080/getWatchlist`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      })
        .then(response => response.json())
        .then(data => {
        setWatchlist(data);
        console.log(watchlist);
        })
        .catch(error => {
          console.error(error);
        });
    }, [watchlist]);
    return (
      <div >
        <Blue_Header activeLinkText={"watchlist"} />
        <div className='watchlist'>
        <h1 className='watchlistText'>My Watchlist</h1>
        {watchlist.map(item => (
          <Watchlist_Card key={item} ticker={item} />
        ))}
        </div>
        <Footer />
      </div>
    );
  }

  export default Watchlist_Page;