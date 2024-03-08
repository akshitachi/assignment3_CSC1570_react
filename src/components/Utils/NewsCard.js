import React from 'react';
import './NewsCard.css';

const NewsCard = ({item}) => {
    // const { searchResults } = useSearchResult();
    // const news = searchResults.news;
    
  return (
    <div className='newsTab1'>
        <img className="imageNews" src={item.image} />
        <div>{item.headline}</div>
        </div>
  )
}

export default NewsCard