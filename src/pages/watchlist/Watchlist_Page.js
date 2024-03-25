import React from 'react';
import Blue_Header from '../../components/Utils/Blue_Header';
import Footer from '../../components/Utils/Footer';
import { useEffect, useState } from 'react';
import Watchlist_Card from './Watchlist_Card';
import './Watchlist_Page.css';
import { CircularProgress } from '@mui/material';

  function Watchlist_Page() {
    const [watchlist, setWatchlist] = useState(undefined);
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
        {watchlist === undefined ? <div className="progressIndicator2">
          <center>
            <CircularProgress size={55} />
          </center></div> : null}
        { watchlist && watchlist.length === 0 ? <div className='watchlistnone'>Currently you don't have any stock in your watchlist.</div> : null}
        {watchlist && watchlist.length !== 0 && watchlist.map(item => (
          <Watchlist_Card key={item} ticker={item} />
        ))}
        </div>
        <Footer />
      </div>
    );
  }

  export default Watchlist_Page;