import React from 'react';
import { Icon, Menu } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

const MenuItem = ({ icon, label, path = '/' }) => (
  <Link to={path}>
    <Menu.Item as="a">
      <Icon name={icon} />
      {label}
    </Menu.Item>
  </Link>
);

export default MenuItem;
