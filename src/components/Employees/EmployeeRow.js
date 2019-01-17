import React from 'react';
import { Table } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

const EmployeeRow = ({ employee: { id, fullName, mobile, email } }) => (
  <Table.Row>
    <Table.Cell>
      <Link to={`/technicians/${id}`}>{fullName}</Link>
    </Table.Cell>
    <Table.Cell>{mobile}</Table.Cell>
    <Table.Cell>{email}</Table.Cell>
  </Table.Row>
);

export default EmployeeRow;
