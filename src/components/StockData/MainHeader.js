import './MainHeader.css';
import { useSearchResult } from '../State/SearchResultContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-regular-svg-icons';
import { faStar as faStarSolid } from '@fortawesome/free-solid-svg-icons';
import React, { useState, useEffect } from 'react';


function MainHeader() {
  const { searchResults } = useSearchResult();
  const [isFavorite, setIsFavorite] = useState(false);

  const [showMessage, setShowMessage] = useState(false);

  const handleFavoriteClick = () => {
    setIsFavorite(!isFavorite);
    const message = isFavorite ? 'Removed from favorites' : 'Added to favorites';
    setShowMessage(true);
    console.log(message);
  };

  useEffect(() => {
    if (showMessage) {
      setTimeout(() => {
        setShowMessage(false);
      }, 5000);
    }
  }, [showMessage]);

  return (
    <div className='column1'>
      {showMessage && <div className='messageFavorite'>{isFavorite ? 'Added to favorites' : 'Removed from favorites'}</div>}
      <div className='row1'>
        <h1 className='ticker_text'>{searchResults.profile.ticker}</h1>
        <FontAwesomeIcon
          icon={isFavorite ? faStarSolid : faStar}
          style={{ width: 30, color: isFavorite ? "#FFD43B" : "black" }}
          className={`favorite_icon ${isFavorite ? 'favorite' : ''}`}
          size="2x"
          onClick={handleFavoriteClick}
        />
      </div>
      <h1 className='companyName'>{searchResults.profile.name}</h1>
      <p className='exchange'>{searchResults.profile.exchange}</p>
      <div className='row2'>
        <button className='buy_button'>Buy</button>
      </div>
    </div>
  );
}

export default MainHeader;
