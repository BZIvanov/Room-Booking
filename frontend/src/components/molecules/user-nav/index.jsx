import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { Login, Register } from '../../organisms';
import { Logout } from '../../atoms';

const User = (props) => {
  const { path } = props.match;

  return (
    <Switch>
      <Route
        path={`${path}/register`}
        render={() => <Register handleUser={props.handleUser} />}
      />
      <Route
        path={`${path}/login`}
        render={() => <Login handleUser={props.handleUser} />}
      />
      <Route
        path={`${path}/logout`}
        render={() => <Logout logoutUser={props.logoutUser} />}
      />
    </Switch>
  );
};
export default User;
