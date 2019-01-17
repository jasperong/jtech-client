import React from 'react';
import { Table } from 'semantic-ui-react';

const TableHead = () => (
  <Table.Header>
    <Table.Row>
      <Table.HeaderCell>Ticket #</Table.HeaderCell>
      <Table.HeaderCell>Date</Table.HeaderCell>
      <Table.HeaderCell>Location</Table.HeaderCell>
    </Table.Row>
  </Table.Header>
);

export default TableHead;
