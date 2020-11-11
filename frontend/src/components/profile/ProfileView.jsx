import React from 'react';
import { Link } from 'react-router-dom';
import './ProfileView.css';

class ProfileView extends React.Component {
  render() {
    const { destination } = this.props;

    return (
      <article className='myexotic'>
        <h1 className='mydestTitle'>{destination.title}</h1>
        <img
          className='myspecificImage'
          src={destination.image}
          alt={destination.title}
        />
        <h3 className='mydescriptor'>{destination.description}</h3>
        <Link
          className='delete'
          to='/'
          onClick={() => this.props.unlikeDestination(destination._id)}
        >
          Unsubscribe
        </Link>
      </article>
    );
  }
}

export default ProfileView;
