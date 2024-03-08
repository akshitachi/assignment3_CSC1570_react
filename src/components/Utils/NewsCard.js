import React from 'react';
import './NewsCard.css';

const NewsCard = ({item}) => {
    // const { searchResults } = useSearchResult();
    // const news = searchResults.news;
    
return (
    <div className='newsTab1'>
        <div className="imageNews">
            <img src={item.image} style={{ width: '130px', height: '70px', borderRadius: '7px' }} />
        </div>
        <div className='newsSource'>
            <div className='newsHeadline'>{item.headline}</div>
        </div>
    </div>
)
}

export default NewsCard