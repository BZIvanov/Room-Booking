import React from 'react';
import { Link as L } from 'react-router-dom';

const Link = (props) => {
  const { children, ...rest } = props;

  return <L {...rest}>{children}</L>;
};

export default Link;
