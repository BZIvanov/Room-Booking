import React from 'react';
import DestinationArticle from './Destination/DestinationArticle';
import './Home.css';

class Home extends React.Component {
  render() {
    this.props.destinations.sort((a, b) => b.likes.length - a.likes.length);

    return (
      <div className='Destination'>
        {this.props.destinations.length ? (
          this.props.destinations.map((d) => {
            return <DestinationArticle key={d._id} destination={d} />;
          })
        ) : (
          <h2 className='noData'>No items to display</h2>
        )}
      </div>
    );
  }
}

export default Home;
