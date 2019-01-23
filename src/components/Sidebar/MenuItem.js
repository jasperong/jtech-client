import React from 'react';
import { Icon, Menu } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

const MenuItem = ({ active = false, icon, label, onClick, path = '/' }) => (
  <Link to={path}>
    <Menu.Item active={active} as="div" onClick={onClick}>
      <Icon name={icon} />
      {label}
    </Menu.Item>
  </Link>
);

export default MenuItem;
