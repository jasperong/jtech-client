import React from 'react';
import { Segment, Header, Table, Pagination } from 'semantic-ui-react';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import { Redirect } from 'react-router-dom';

import TableHead from './TableHead';
import CurrentService from './CurrentService';
import ServiceRow from './ServiceRow';
import Loading from '../Layout/Loading';
import withCurrentUser from '../../HOC/withCurrentUser';

const EmployeeSingle = ({
  match: {
    params: { id }
  },
  currentUser
}) => (
  <Query query={GET_USER} variables={{ id, params: { userId: id }, page: 0 }}>
    {({ loading, data, refetch }) => {
      if (loading) return <Loading />;
      if (currentUser.role === 'employee' && id !== currentUser.id)
        return <Redirect to={`/technicians/${currentUser.id}`} />;

      const totalPages = Math.ceil(
        data.allServices.totalCount / data.allServices.perPage
      );
      return (
        <div className="employee-single__container">
          <Header as="h2">
            {data.user.fullName}
            <Header.Subheader>{data.user.mobile}</Header.Subheader>
          </Header>
          {/*
          <Grid stackable columns="equal">
            <Grid.Column>
              <Segment>Some chart here</Segment>
            </Grid.Column>
            <Grid.Column>
              <Segment>Some chart here</Segment>
            </Grid.Column>
            <Grid.Column>
              <Segment>Some chart here</Segment>
            </Grid.Column>
          </Grid> */}

          <CurrentService currentService={data.user.currentService} />

          <Header as="h3">Past Services</Header>
          <Segment>
            <Table celled selectable>
              <TableHead />
              <Table.Body>
                {data.allServices.services.map((service, i) => (
                  <ServiceRow key={i} service={service} />
                ))}
              </Table.Body>
            </Table>
            {totalPages > 1 && (
              <Pagination
                defaultActivePage={data.allServices.currentPage + 1}
                totalPages={totalPages}
                onPageChange={(e, data) =>
                  refetch({ page: data.activePage - 1 })
                }
              />
            )}
          </Segment>
        </div>
      );
    }}
  </Query>
);

export default withCurrentUser(EmployeeSingle);

const GET_USER = gql`
  query user($id: ID!, $params: ServiceInput, $page: Int!) {
    user(id: $id) {
      fullName
      mobile
      currentService {
        office {
          alias
        }
        startTime
        endTime
        workRequested
        workDone
      }
    }
    allServices(params: $params, page: $page) {
      services {
        id
        date
        ticketNo
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
