import React from 'react';
import { Icon, Menu } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

const MenuItem = ({
  active = false,
  icon,
  label,
  onClick,
  path = '/',
  ...rest
}) => (
  <Link to={path}>
    <Menu.Item active={active} as="div" onClick={onClick} {...rest}>
      <Icon name={icon} />
      {label}
    </Menu.Item>
  </Link>
);

export default MenuItem;
