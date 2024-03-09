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

  return (
    <>
      <div className="newsTab1" onClick={handleShow} style={{ cursor: 'pointer' }}>
        <div className="imageNews">
          <img src={item.image} className="imageActual" alt="News" />
        </div>
        <div className="newsSource">
          <div className="newsHeadline">{item.headline}</div>
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
            For more details click <span><a target="_blank" rel="noopener noreferrer" href={item.url}>here</a></span>
          </div>
          <div className="sharePart">
            <div className='sharetext'>Share</div>
            <div className="socialMediaButtons">
              <FontAwesomeIcon icon={faXTwitter} style={{ fontSize: '40px'}} />
              <span style={{ marginLeft: '8px' }}></span>
              <FontAwesomeIcon icon={faFacebookSquare} style={{ fontSize: '40px', color: '#0200F4' }} />
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default NewsCard;
