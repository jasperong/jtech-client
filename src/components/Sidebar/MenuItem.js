import React from 'react';
import { Icon, Menu } from 'semantic-ui-react';

const MenuItem = ({ icon, label }) => (
  <Menu.Item as="a">
    <Icon name={icon} />
    {label}
  </Menu.Item>
);

export default MenuItem;
