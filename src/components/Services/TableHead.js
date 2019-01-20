import React from 'react';
import { Table } from 'semantic-ui-react';

const TableHead = () => (
  <Table.Header>
    <Table.Row>
      <Table.HeaderCell />
      <Table.HeaderCell>Ticket #</Table.HeaderCell>
      <Table.HeaderCell>Location</Table.HeaderCell>
      <Table.HeaderCell>Technician</Table.HeaderCell>
      <Table.HeaderCell>Phone No.</Table.HeaderCell>
    </Table.Row>
  </Table.Header>
);

export default TableHead;
