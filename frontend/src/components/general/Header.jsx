import React from 'react';
import { NavLink } from 'react-router-dom';

import './Header.css';

class Header extends React.Component {
    render() {
        return (
            <nav className="Header">
                <ul className="list">
                    <li>
                        <NavLink to="/">
                            <img src={ require('../../images/travel.png')} alt="travel logo" height="70" width="70" />
                        </NavLink>
                    </li>
                </ul>
            </nav>
        )
    }
}

export default Header;
