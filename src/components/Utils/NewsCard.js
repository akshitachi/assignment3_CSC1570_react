import React, { useState } from 'react';
import './NewsCard.css';
import Modal from 'react-bootstrap/Modal';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXTwitter, faFacebookSquare } from '@fortawesome/free-brands-svg-icons';

const NewsCard = ({ item }) => {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const newsTime = new Date(item.datetime * 1000).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
  const twitterShare = `https://twitter.com/intent/tweet?text=${item.headline}&url=${item.url}`;
  const facebookShare = `https://www.facebook.com/sharer/sharer.php?u=${item.url}`;

return (
    <>
        <div className={`newsTab1${window.innerWidth > 844 ? '' : 'big'}`} onClick={handleShow} style={{ cursor: 'pointer' }}>
            <div className={`imageNews${window.innerWidth > 844 ? '' : 'big'}`}>
                <img src={item.image} className={`imageActual${window.innerWidth > 844 ? '' : 'big'}`} alt="News" />
            </div>
            <div className={`newsSource${window.innerWidth > 844 ? '' : 'big'}`}>
                <div className={`newsHeadline${window.innerWidth > 844 ? '' : 'big'}`}>{item.headline}</div>
            </div>
        </div>
        <Modal show={show} onHide={handleClose} animation={false}>
            <Modal.Header closeButton>
                <Modal.Title>
                    <div className="sourceNews">{item.source}</div>
                    <p className="datetimenews">{newsTime}</p>
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <h5 className="headlineNews">{item.headline}</h5>
                <div className="summaryNews">{item.summary}</div>
                <div className="newsurl">
                    For more details click <span><a target="_blank" rel="noopener noreferrer" href={item.url} style={{ color: '#7A9CDC' }}>here</a></span>
                </div>
                <div className="sharePart">
                    <div className='sharetext'>Share</div>
                    <div className="socialMediaButtons">
                        <a target='_blank' className="twitter-share" href={twitterShare}><FontAwesomeIcon icon={faXTwitter} style={{ fontSize: '40px'}} /></a>
                        <span style={{ marginLeft: '8px' }}></span>
                        <a target='_blank' href={facebookShare}><FontAwesomeIcon icon={faFacebookSquare} style={{ fontSize: '40px', color: '#0200F4' }} /></a>
                    </div>
                </div>
            </Modal.Body>
        </Modal>
    </>
);
};


export default NewsCard;
