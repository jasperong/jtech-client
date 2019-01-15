import React, { Fragment } from 'react';
import { Header, Table, Pagination } from 'semantic-ui-react';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';

import TableHead from './TableHead';
import ServiceRow from './ServiceRow';
import { m } from '../../utils';

const Services = () => (
  <Query
    query={getServices}
    variables={{ params: { date: m().format('YYYY/MM/DD') }, page: 0 }}
  >
    {({ loading, error, data, refetch }) => {
      if (loading) return <p>loading</p>;
      if (error) return <p>error</p>;
      const totalPages = Math.ceil(
        data.allServices.totalCount / data.allServices.perPage
      );
      return (
        <Fragment>
          <Header as="h2">
            {m(data.allServices.services[0].date).format('LL')}
          </Header>
          <Table celled selectable>
            <TableHead />
            <Table.Body>
              {data.allServices.services.map((service, i) => (
                <ServiceRow key={i} service={service} />
              ))}
            </Table.Body>
          </Table>
          <Pagination
            defaultActivePage={data.allServices.currentPage + 1}
            totalPages={totalPages}
            onPageChange={(e, data) => refetch({ page: data.activePage - 1 })}
          />
        </Fragment>
      );
    }}
  </Query>
);

export default Services;

const getServices = gql`
  query getServices($params: ServiceInput, $page: Int!) {
    allServices(params: $params, page: $page) {
      services {
        status
        date
        employee {
          fullName
          mobile
          email
        }
        office {
          alias
        }
      }
      totalCount
      currentPage
      perPage
    }
  }
`;
