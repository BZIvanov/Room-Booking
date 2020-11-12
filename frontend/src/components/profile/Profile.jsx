import React, { Fragment } from 'react';
import ProfileView from './ProfileView';
import './Profile.css';

const Profile = ({ destinations, username, isAdmin, unlikeDestination }) => {
  let myDestinations = destinations
    .slice(0)
    .filter((x) => x.likes.includes(username));

  return (
    <div className='Destination'>
      {isAdmin ? (
        <h1>Hello Admin</h1>
      ) : (
        <Fragment>
          {myDestinations.length
            ? myDestinations.map((d) => {
                return (
                  <ProfileView
                    key={d._id}
                    destination={d}
                    unlikeDestination={unlikeDestination}
                  />
                );
              })
            : null}
        </Fragment>
      )}
    </div>
  );
};

export default Profile;
