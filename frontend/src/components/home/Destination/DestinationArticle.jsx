import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import './DestinationArticle.css';

const DestinationArticle = ({ destination }) => {
  return (
    <article className='exotics'>
      <h1 className='destTitle'>{destination.title}</h1>
      <Link to={`/destination/details/${destination._id}`}>
        <img
          className='destImage'
          src={destination.image}
          alt={destination.title}
        />
      </Link>
      <h3 className='descriptor'>{destination.description}</h3>
      <div className='visitorLikes'>
        <span className='count'>{destination.likes.length}</span>
        <FontAwesomeIcon icon={faHeart} className='heart' spin />
      </div>
    </article>
  );
};

export default DestinationArticle;
