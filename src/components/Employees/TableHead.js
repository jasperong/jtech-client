import React from 'react';
import { Table } from 'semantic-ui-react';

const TableHead = () => (
  <Table.Header>
    <Table.Row>
      <Table.HeaderCell>Name</Table.HeaderCell>
      <Table.HeaderCell>Phone No.</Table.HeaderCell>
      <Table.HeaderCell>Current Service</Table.HeaderCell>
    </Table.Row>
  </Table.Header>
);

export default TableHead;
