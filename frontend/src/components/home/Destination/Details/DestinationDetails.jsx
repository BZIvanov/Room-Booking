import React from 'react';
import { Link } from 'react-router-dom';

import DestinationsService from '../../../../services/get-destinations';
import './DestinationDetails.css';

class Destination extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            description: null,
            image: null,
            title: null,
            id: null
        }
    }
    
    async getDestinationFromDatabase (id) {
        try {
            const destination = await new DestinationsService().getCurrentDestination(id);
            console.log("hi")
            console.log(destination)
            
            this.setState({
                description: destination.description,
                image: destination.image,
                title: destination.title,
                id: destination._id
            })
        } catch (error) {
            console.log(error);
        }
    }

    render() {  
        return (
            <article className="exotic">
                <h1 className="specificTitle">{this.state.title}</h1>
                <img className="specificImage" src={this.state.image} alt={this.state.title} />
                <h3 className="descriptor">{this.state.description}</h3>

                {
                    this.props.isAdmin 
                    ? (<Link to={`/destination/edit/${this.state.id}`} >
                            Edit
                        </Link>)
                    : null
                }
            </article>
        );
    }
    
    componentDidMount() {
        const id = this.props.location.pathname.split('/').pop();
        this.getDestinationFromDatabase(id);
    }
}

export default Destination;
