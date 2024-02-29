import React, { useState, useEffect } from 'react';
import Form from 'react-bootstrap/Form';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BsSearch, BsX } from 'react-icons/bs';
import './Search_Bar.css';
import Spinner from 'react-bootstrap/Spinner';
import { useNavigate } from 'react-router-dom';

function Search_Bar() {
  const [ticker, setTicker] = useState('');
  const [loading, setLoading] = useState(false);
  const [dropdownData, setDropdownData] = useState([]);
  const [itemSelected, setItemSelected] = useState(false);
  const navigate = useNavigate();
  const [pageChange, setPageChange] = useState(false);

  function ResultClick(symbol) {
    setTicker(symbol);
    setItemSelected(true);
    setDropdownData([]);
    setLoading(false);
    setPageChange(true);
    navigate(`/search/${symbol}`);
  }

  useEffect(() => {
    if (ticker && !itemSelected) {
      setLoading(true);
      fetch(`http://localhost:8080/autocomplete/${ticker}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      })
        .then(response => response.json())
        .then(data => {
          console.log(data);
          setDropdownData(data);
          setLoading(false);
        })
        .catch(error => {
          console.error(error);
          setLoading(false);
        });
    } else {
      setItemSelected(false);
      setDropdownData([]);
    }
  }, [ticker]);

  return (
      <Form className="search-bar">
        <Form.Group className="search-field">
          <Form.Control
            className="input-field"
            type="search"
            placeholder="Enter stock ticker symbol"
            value={ticker}
            onChange={e => setTicker(e.target.value)}
          />
          <BsSearch className="search-icon" />
          <BsX
            className="clear-icon"
            onClick={() => {
              setTicker('');
              setItemSelected(false);
              setDropdownData([]);
              setLoading(false);
              navigate(`/search/home`);
            }}
          />
        </Form.Group>
        <div className="results-list">
        {(loading && ticker) && <div className="loader"><Spinner
          animation="border"
          role="status"
          className="spinner"
        >
        </Spinner></div>}
        {(!loading && dropdownData.length > 0 && ticker) && (
          <div>
            {dropdownData.map(item => (
              <div className='autocomplete-item' key={item.symbol} onClick={() => ResultClick(item.symbol)}>{item.symbol} | {item.description}</div>
            ))}
          </div>
        )}
      </div>
      <div>
        {(!loading && dropdownData.length === 0 && ticker && !pageChange) && <div className='no-results'>No results found</div>}
      </div>
      </Form>
  );
}

export default Search_Bar;
