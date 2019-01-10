import React from 'react';
import { Icon } from 'semantic-ui-react';
const ServiceStatusIcon = ({ status }) => (
  <Icon name="circle" color={iconColor(status)} />
);

export default ServiceStatusIcon;

const iconColor = status => {
  switch (status) {
    case 'in_transit':
      return 'orange';
    case 'online':
      return 'green';
    case 'offline':
      return 'grey';
    default:
      return 'grey';
  }
};
