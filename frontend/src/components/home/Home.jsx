import React from 'react';

import DestinationsService from '../../services/get-destinations';
import Destination from './Destination/Destination';
import './Home.css';

class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            destinations: []
        }
    }
    
    async componentDidMount() {
        try {
            const destinations = await new DestinationsService().getAllDestinations();
            console.log(destinations)
            this.setState({
                destinations
            })
        } catch (error) {
            console.error(error)
        }
    }

    render() {
        return (
            <div className="Destination">
                {
                    this.state.destinations.length ? this.state.destinations.map(d => {
                        return <Destination key={d._id} destination={d} />
                    }) : null
                }
            </div>
        )
    }
}

export default Home;
