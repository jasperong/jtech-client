import React from 'react';
import { Table } from 'semantic-ui-react';

const EmployeeRow = ({
  service: {
    date,
    office: { alias }
  }
}) => (
  <Table.Row>
    <Table.Cell>qwerty</Table.Cell>
    <Table.Cell>{date}</Table.Cell>
    <Table.Cell>{alias}</Table.Cell>
  </Table.Row>
);

export default EmployeeRow;
