import React from 'react';
import { Link } from 'react-router-dom';
import './styles.css';

const NotFound = () => {
  return (
    <div className='notFound'>
      <p>Error 404</p>
      <p>Nothing in here</p>
      <Link to='/'>Go Back</Link>
    </div>
  );
};

export default NotFound;
