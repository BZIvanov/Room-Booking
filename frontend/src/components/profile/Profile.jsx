import React, { Fragment } from 'react';
import ProfileView from './ProfileView';
import './Profile.css';

class Profile extends React.Component {
  render() {
    let myDestinations = this.props.destinations
      .slice(0)
      .filter((x) => x.likes.includes(this.props.username));

    return (
      <div className='Destination'>
        {this.props.isAdmin ? (
          <h1>Hello Admin</h1>
        ) : (
          <Fragment>
            {myDestinations.length
              ? myDestinations.map((d) => {
                  return (
                    <ProfileView
                      key={d._id}
                      destination={d}
                      unlikeDestination={this.props.unlikeDestination}
                    />
                  );
                })
              : null}
          </Fragment>
        )}
      </div>
    );
  }
}

export default Profile;
