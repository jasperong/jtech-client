import React from 'react';
import { Table } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

const EmployeeRow = ({
  employee: { id, fullName, mobile, email, currentService }
}) => (
  <Table.Row>
    <Table.Cell>
      <Link to={`/technicians/${id}`}>{fullName}</Link>
    </Table.Cell>
    <Table.Cell>{mobile}</Table.Cell>
    <Table.Cell>{currentService && currentService.office.alias}</Table.Cell>
  </Table.Row>
);

export default EmployeeRow;
