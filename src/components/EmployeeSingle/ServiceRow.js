import React from 'react';
import { Table } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

const EmployeeRow = ({
  service: {
    id,
    date,
    ticketNo,
    office: { alias }
  }
}) => (
  <Table.Row>
    <Table.Cell>
      <Link to={`/services/${id}`}>{ticketNo}</Link>
    </Table.Cell>
    <Table.Cell>{date}</Table.Cell>
    <Table.Cell>{alias}</Table.Cell>
  </Table.Row>
);

export default EmployeeRow;
