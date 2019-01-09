import React from 'react';
import { Table } from 'semantic-ui-react';

const Employees = () => {
  return (
    <Table celled selectable>
      <Table.Header>
        <Table.Row>
          <Table.HeaderCell>Name</Table.HeaderCell>
          <Table.HeaderCell>Phone No.</Table.HeaderCell>
          <Table.HeaderCell>Email</Table.HeaderCell>
        </Table.Row>
      </Table.Header>

      <Table.Body>
        <Table.Row>
          <Table.Cell>Jasper</Table.Cell>
          <Table.Cell>123123123</Table.Cell>
          <Table.Cell>qoweni@oinc.com</Table.Cell>
        </Table.Row>
      </Table.Body>
    </Table>
  );
};

export default Employees;
