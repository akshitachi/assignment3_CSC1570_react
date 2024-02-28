import React, { useState, useEffect } from 'react';
import Form from 'react-bootstrap/Form';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BsSearch, BsX } from 'react-icons/bs';
import './Search_Bar.css';

// function Search_Bar() {
//   const [ticker, setTicker] = useState('');
//   useEffect(() => {
//       fetch(`http://localhost:8080/autocomplete/${ticker}`, {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//       })
//         .then(response => response.json())
//         .then(data => {
//           console.log(ticker);
//           console.log(data);
//         })
//         .catch(error => {
//           console.error(error);
//         });
//   }, [ticker]);
function Search_Bar() {
  const [ticker, setTicker] = useState('');
  const [loading, setLoading] = useState(false);
  const [dropdownData, setDropdownData] = useState([]);

  useEffect(() => {
    if (ticker) {
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
        <BsX className="clear-icon" />
      </Form.Group>
      {/* <div className="autocomplete-dropdown"> */}
      {loading && <div className="loader">Loading...</div>}
      {dropdownData.length > 0 && (
        <ul className="show">
          {dropdownData.map(item => (
            <li className='autocomplete-item' key={item.symbol} onClick={() => setTicker(item.symbol)}>
              {item.description}
            </li>
          ))}
        </ul>
      )}
      {/* </div> */}
    </Form>
  );
}

export default Search_Bar;

//   return (
//     <Form className="search-bar">
//       <Form.Group className="mb-3" class="search-field" >
//         <Form.Control
//           className='input-field'
//           type="search"
//           placeholder="Enter stock ticker symbol"
//           value={ticker}
//           onChange={e => setTicker(e.target.value)}
//         />
//         <BsSearch className="search-icon" />
//         <BsX className="clear-icon" />
//       </Form.Group>
//     </Form>
//   );
// }

// export default Search_Bar;


