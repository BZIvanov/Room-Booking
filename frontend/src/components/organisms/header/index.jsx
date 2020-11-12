import React, { Fragment } from 'react';
import { Link, NavLink } from '../../atoms';
import './styles.css';
import travelLogo from '../../../images/travel.png';

const Header = ({ username, isAdmin, logoutUser }) => {
  return (
    <nav className='Header'>
      <ul className='list'>
        <li>
          <Link to='/'>
            <img
              src={travelLogo}
              id='siteLogo'
              alt='travel logo'
              height='70'
              width='70'
            />
          </Link>
        </li>

        {username ? (
          <Fragment>
            {isAdmin ? (
              <li>
                <NavLink to='/create'>Add Destination</NavLink>
              </li>
            ) : (
              <li>
                <NavLink to='/buddies'>Buddies</NavLink>
              </li>
            )}
            <li>
              <Link to='/profile' className='profileLink'>
                Hello {username}!
              </Link>
            </li>
            <li>
              <Link to='/user/logout' onClick={logoutUser}>
                Logout
              </Link>
            </li>
          </Fragment>
        ) : (
          <Fragment>
            <li>
              <NavLink to='/user/login' activeClassName='selected'>
                Login
              </NavLink>
            </li>
            <li>
              <NavLink to='/user/register' activeClassName='selected'>
                Register
              </NavLink>
            </li>
          </Fragment>
        )}
      </ul>
    </nav>
  );
};

export default Header;
