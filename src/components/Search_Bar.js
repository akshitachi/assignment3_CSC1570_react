import React from 'react';
import Form from 'react-bootstrap/Form';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BsSearch, BsX } from 'react-icons/bs';
import './Search_Bar.css';

function Search_Bar() {
  return (
    <Form className="search-bar">
      <Form.Group className="mb-3" class="search-field" >
        <Form.Control className='input-field' type="search" placeholder="Enter stock ticker symbol" />
        <BsSearch className="search-icon" />
        <BsX className="clear-icon" />
      </Form.Group>
    </Form>
  );
}

export default Search_Bar;


