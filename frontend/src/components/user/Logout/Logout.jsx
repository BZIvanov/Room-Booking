import React from 'react';
import { Redirect } from 'react-router-dom';

class Logout extends React.Component {
    
    
    render() {
        return (
            <Redirect to="/" />
        )
    }
}

export default Logout;
