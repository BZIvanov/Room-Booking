import React from 'react';
import DestinationArticle from './Destination/DestinationArticle';
import './Home.css';

const Home = ({ destinations }) => {
  destinations.sort((a, b) => b.likes.length - a.likes.length);

  return (
    <div className='Destination'>
      {destinations.length ? (
        destinations.map((d) => {
          return <DestinationArticle key={d._id} destination={d} />;
        })
      ) : (
        <h2 className='noData'>No items to display</h2>
      )}
    </div>
  );
};

export default Home;
