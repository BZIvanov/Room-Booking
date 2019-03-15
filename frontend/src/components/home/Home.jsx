import React from 'react';

import DestinationArticle from './Destination/DestinationArticle';
import './Home.css';

class Home extends React.Component {
    
    render() {
        return (
            <div className="Destination">
                {
                    this.props.destinations.length ? this.props.destinations.map(d => {
                        return <DestinationArticle key={d._id} destination={d} />
                    }) : null
                }
            </div>
        )
    }
}

export default Home;
