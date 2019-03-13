import React from "react";
import { Route, Switch } from "react-router-dom";

import Register from "./Register/Register";
import Login from "./Login/Login";

const User = (props) => {
    const { path } = props.match;

    return (
        <Switch>
            <Route path={`${path}/register`} render={() => <Register handleUser={props.handleUser}/>}/>
            <Route path={`${path}/login`} render={() => <Login handleUser={props.handleUser}/>}/>
        </Switch>
    );
};
export default User;
