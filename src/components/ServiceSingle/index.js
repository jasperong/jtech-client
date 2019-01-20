import React from 'react';
import { Grid, Segment, Header } from 'semantic-ui-react';
import { Query } from 'react-apollo';
import { Link } from 'react-router-dom';
import gql from 'graphql-tag';

import Loading from '../Layout/Loading';
import { m } from '../../utils';

const ServiceSingle = ({
  match: {
    params: { id }
  }
}) => (
  <Query query={GET_SERVICE} variables={{ id }}>
    {({ loading, data, refetch }) => {
      if (loading) return <Loading />;
      console.log(data);
      return (
        <div className="employee-single__container">
          <Header as="h2">Ticket # {data.service.ticketNo}</Header>

          <Grid stackable columns="equal">
            <Grid.Column>
              <Segment>
                <Header as="h3">Technician</Header>
                <Header as="h4">
                  <Link to={`/technicians/${data.service.employee.id}`}>
                    {data.service.employee.fullName}
                  </Link>
                  <Header.Subheader>
                    {data.service.employee.mobile}
                  </Header.Subheader>
                </Header>
              </Segment>
            </Grid.Column>
            <Grid.Column>
              <Segment>
                <Header as="h3">Location</Header>
                <Header as="h5">{data.service.office.alias}</Header>
                <Header as="h4">Contact</Header>
                <Header as="h5">
                  {data.service.contactName}
                  <Header.Subheader>{data.service.contactNo}</Header.Subheader>
                </Header>
              </Segment>
            </Grid.Column>
          </Grid>

          <Header as="h3">Details</Header>
          <Segment>
            <Header as="h3">
              {m(data.service.date).format('LL')}
              <Header.Subheader>
                {m(data.service.startTime).format('LT')} -{' '}
                {m(data.service.endTime).format('LT')}
              </Header.Subheader>
            </Header>
            <Header as="h4">Work Requested</Header>
            <p>{data.service.workRequested}</p>
            <Header as="h4">Work Done</Header>
            <p>{data.service.workDone}</p>
          </Segment>
        </div>
      );
    }}
  </Query>
);

export default ServiceSingle;

const GET_SERVICE = gql`
  query service($id: ID!) {
    service(id: $id) {
      ticketNo
      status
      contactName
      contactNo
      workRequested
      workDone
      startTime
      endTime
      date
      employee {
        id
        fullName
        mobile
      }
      office {
        alias
      }
    }
  }
`;
