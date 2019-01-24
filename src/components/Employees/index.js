import React, { Fragment } from 'react';
import { Button, Table, Pagination } from 'semantic-ui-react';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import { Link } from 'react-router-dom';

import EmployeeRow from './EmployeeRow';
import ErrorMessage from '../ErrorMessage';
import Loading from '../Layout/Loading';
import TableHead from './TableHead';

const Employees = () => (
  <Query query={getEmployees} variables={{ page: 0 }}>
    {({ loading, error, data, refetch }) => {
      if (loading) return <Loading />;
      if (error) return <ErrorMessage error={error} />;

      const totalPages = Math.ceil(
        data.allEmployees.totalCount / data.allEmployees.perPage
      );

      return (
        <Fragment>
          <Link to="/technicians/new">
            <Button className="add__button" basic floated="right" icon="plus" />
          </Link>

          <Table celled selectable>
            <TableHead />
            <Table.Body>
              {data.allEmployees.employees.map(employee => (
                <EmployeeRow key={employee.email} employee={employee} />
              ))}
            </Table.Body>
          </Table>

          {totalPages > 1 && (
            <Pagination
              defaultActivePage={data.allEmployees.currentPage + 1}
              totalPages={totalPages}
              onPageChange={(e, data) => refetch({ page: data.activePage - 1 })}
            />
          )}
        </Fragment>
      );
    }}
  </Query>
);

export default Employees;

const getEmployees = gql`
  query allEmployees($page: Int!) {
    allEmployees(page: $page) {
      employees {
        id
        fullName
        mobile
        email
        currentService {
          office {
            alias
          }
        }
      }
      totalCount
      currentPage
      perPage
    }
  }
`;
