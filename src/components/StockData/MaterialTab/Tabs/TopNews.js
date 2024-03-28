import React from 'react';
import { useSearchResult } from '../../../State/SearchResultContext';
import './TopNews.css';
import NewsCard from '../../../Utils/NewsCard';

function TopNews () {

  const { searchResults } = useSearchResult();
  const news = searchResults.news;
  console.log(news);
return (
    <div className={`topNews${window.innerWidth > 844 ? '' : 'big'}`}>
        <div className='row'>
            {news.map((item, index) => {
                if (index % 2 === 0) {
                    return (
                       <div className={`item5${window.innerWidth > 844 ? '' : 'big'}`}>
                        <NewsCard item={item}/>
                        </div>
                    );
                }
                return null;
            })}
        </div>
        <div className='row'>
            {news.map((item, index) => {
                if (index % 2 !== 0) {
                    return (
                       <div className={`item5${window.innerWidth > 844 ? '' : 'big'}`}>
                        <NewsCard item={item}/>
                        </div>
                    );
                }
                return null;
            })}
        </div>
    </div>
);
}

export default TopNews