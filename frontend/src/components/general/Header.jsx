import React from 'react';
import { NavLink, Link } from 'react-router-dom';

import './Header.css';

class Header extends React.Component {
    render() {
        return (
            <nav className="Header">
                <ul className="list">
                    <li>
                        <Link to="/">
                            <img src={ require('../../images/travel.png')} id="siteLogo" alt="travel logo" height="70" width="70" />
                        </Link>
                    </li>
                    <li >
                        <NavLink to="/login">
                            Login
                        </NavLink>
                    </li>
                    <li >
                        <NavLink to="/register">
                            Register
                        </NavLink>
                    </li>
            
                    
                </ul>
            </nav>
        )
    }
}

export default Header;
