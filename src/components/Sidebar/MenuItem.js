import React from 'react';
import { Icon, Menu } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

const MenuItem = ({ icon, label, path = '/' }) => (
  <Menu.Item>
    <Link to={path}>
      <Menu.Item>
        <Icon name={icon} />
        {label}
      </Menu.Item>
    </Link>
  </Menu.Item>
);

export default MenuItem;
