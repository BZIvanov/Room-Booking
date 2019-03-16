import React from "react";
import { Route, Switch } from "react-router-dom";

import DestinationDetails from "./Details/DestinationDetails";
import DestinationEdit from "./Details/DestinationEdit"

const Destination = (props) => {
    const { path } = props.match;

    return (
        <Switch>
            <Route path={`${path}/details/:id`} render={() => <DestinationDetails 
                {...props} 
                isAdmin={props.isAdmin}
                username={props.username} 
                deleteDestination={props.deleteDestination}
                visitDestination={props.visitDestination}
            />}/>
            <Route path={`${path}/edit/:id`} render={() => <DestinationEdit {...props} isAdmin={props.isAdmin} editDestination={props.editDestination} />}/>
        </Switch>
    );
};
export default Destination;
