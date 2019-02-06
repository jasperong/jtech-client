import React from 'react';
import { Table } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import ServiceStatusIcon from './ServiceStatusIcon';
const EmployeeRow = ({
  service: {
    id,
    status,
    ticketNo,
    employee: { fullName, mobile, id: employeeId },
    office: { alias }
  }
}) => (
  <Table.Row>
    <Table.Cell>
      <ServiceStatusIcon status={status} />
    </Table.Cell>
    <Table.Cell>
      <Link to={`/services/${id}`}>{ticketNo}</Link>
    </Table.Cell>
    <Table.Cell>{alias}</Table.Cell>
    <Table.Cell>
      <Link to={`/technicians/${employeeId}`}>{fullName}</Link>
    </Table.Cell>
    <Table.Cell>{mobile}</Table.Cell>
  </Table.Row>
);

export default EmployeeRow;
