import React, { useState } from 'react';
import './Blue_Header.css'; 
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Container from 'react-bootstrap/Container';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from 'react-router-dom';
import { useSearchResult } from '../State/SearchResultContext';

function Blue_Header({activeLinkText}) {
    const [activeLink, setActiveLink] = useState(activeLinkText);
    const navigate = useNavigate();
    const { searchResults } = useSearchResult();

    const handleLinkClick = (link) => {
        setActiveLink(link);
        if(link === 'search' && searchResults.ticker) {navigate(`/search/${searchResults.ticker}`);}
        else if(link === 'search') {navigate('/search/home');}
        else if(link === 'watchlist') {navigate('/watchlist');}
        else if(link === 'portfolio') {navigate('/portfolio');}
    };

    return (
        <Navbar expand="lg" className='stock_navbar' variant='dark'>
            <Container className='navbar-container'>
                <Navbar.Brand className='navbar_brand'>Stock Search</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" className='navbar_toggle' />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="ms-auto">
                        <Nav.Link
                            className={activeLink === 'search' ? 'active' : ''}
                            onClick={() => handleLinkClick('search')}
                        >
                            Search
                        </Nav.Link>
                        <Nav.Link
                            className={activeLink === 'watchlist' ? 'active' : ''}
                            onClick={() => handleLinkClick('watchlist')}
                        >
                            Watchlist
                        </Nav.Link>
                        <Nav.Link
                            className={activeLink === 'portfolio' ? 'active' : ''}
                            onClick={() => handleLinkClick('portfolio')}
                        >
                            Portfolio
                        </Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default Blue_Header;