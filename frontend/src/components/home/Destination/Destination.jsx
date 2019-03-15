import React from "react";
import { Route, Switch } from "react-router-dom";

import DestinationDetails from "./Details/DestinationDetails";


const Destination = (props) => {
    const { path } = props.match;

    return (
        <Switch>
            <Route path={`${path}/details/:id`} render={() => <DestinationDetails {...props} isAdmin={props.isAdmin} />}/>
        </Switch>
    );
};
export default Destination;
