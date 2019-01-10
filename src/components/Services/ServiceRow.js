import React from 'react';
import { Table } from 'semantic-ui-react';

import ServiceStatusIcon from './ServiceStatusIcon';
const EmployeeRow = ({
  service: {
    status,
    employee: { fullName, mobile },
    office: { alias }
  }
}) => (
  <Table.Row>
    <Table.Cell>
      <ServiceStatusIcon status={status} />
    </Table.Cell>
    <Table.Cell>{alias}</Table.Cell>
    <Table.Cell>{fullName}</Table.Cell>
    <Table.Cell>{mobile}</Table.Cell>
  </Table.Row>
);

export default EmployeeRow;
