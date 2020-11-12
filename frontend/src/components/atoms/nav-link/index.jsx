import React from 'react';
import { NavLink as NL } from 'react-router-dom';

const NavLink = (props) => {
  const { children, ...rest } = props;

  return <NL {...rest}>{children}</NL>;
};

export default NavLink;
