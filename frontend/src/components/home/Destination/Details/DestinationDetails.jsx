import React from 'react';
import { Link } from 'react-router-dom';
import DestinationsService from '../../../../services/get-destinations';
import './DestinationDetails.css';

class DestinationDetails extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      description: null,
      image: null,
      title: null,
      likes: [],
      id: null,
    };
  }

  async getDestinationFromDatabase(id) {
    try {
      const destination = await new DestinationsService().getCurrentDestination(
        id
      );

      this.setState({
        description: destination.description,
        image: destination.image,
        title: destination.title,
        likes: destination.likes,
        id: destination._id,
      });
    } catch (error) {
      console.log(error);
    }
  }

  render() {
    const isDisabled = this.state.likes.includes(this.props.username);
    return (
      <div className='specific'>
        <article className='exotic'>
          <h1 className='specificTitle'>{this.state.title}</h1>
          <img
            className='specificImage'
            src={this.state.image}
            alt={this.state.title}
          />
          <h3 className='descriptor'>{this.state.description}</h3>

          {this.props.isAdmin ? (
            <div className='controls'>
              <Link className='edit' to={`/destination/edit/${this.state.id}`}>
                Edit
              </Link>
              <Link
                className='delete'
                to='/'
                onClick={() => this.props.deleteDestination(this.state.id)}
              >
                Delete
              </Link>
            </div>
          ) : (
            <div className='controls'>
              {isDisabled ? (
                <Link className='info' to='/'>
                  Already in your wish list
                </Link>
              ) : (
                <Link
                  className='visit'
                  to='/'
                  onClick={() => this.props.visitDestination(this.state.id)}
                >
                  Want to visit
                </Link>
              )}
            </div>
          )}
        </article>
      </div>
    );
  }

  componentDidMount() {
    const id = this.props.location.pathname.split('/').pop();
    this.getDestinationFromDatabase(id);
  }
}

export default DestinationDetails;
