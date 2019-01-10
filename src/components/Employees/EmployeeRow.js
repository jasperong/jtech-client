import React from 'react';
import { Table } from 'semantic-ui-react';

const EmployeeRow = ({ employee: { fullName, mobile, email } }) => (
  <Table.Row>
    <Table.Cell>{fullName}</Table.Cell>
    <Table.Cell>{mobile}</Table.Cell>
    <Table.Cell>{email}</Table.Cell>
  </Table.Row>
);

export default EmployeeRow;
