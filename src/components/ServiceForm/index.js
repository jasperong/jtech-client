import React, { Component } from 'react';
import { Button, Form, Segment } from 'semantic-ui-react';
import { Mutation, withApollo } from 'react-apollo';
import gql from 'graphql-tag';

import ErrorMessage from '../ErrorMessage';
import SuccessMessage from '../SuccessMessage';
import { m } from '../../utils';

class ServiceForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ticketNo: '',
      status: 'offline',
      officeId: '',
      fare: '',
      workRequested: '',
      workDone: '',
      offices: []
    };
  }

  componentDidMount() {
    this.getOffices();
    this.prepopulateService();
  }

  handleChange = (e, { name, value }) => this.setState({ [name]: value });

  statusOptions = [
    { text: 'Offline', value: 'offline' },
    { text: 'In Transit', value: 'in_transit' },
    { text: 'Online', value: 'online' },
    { text: 'Done', value: 'done' }
  ];

  getOffices = async () => {
    const { data } = await this.props.client.query({ query: GET_OFFICES });
    this.setState({
      offices: data.offices.map(o => ({ text: o.alias, value: o.id }))
    });
  };

  prepopulateService = async () => {
    const { data } = await this.props.client.query({
      query: GET_SERVICE,
      variables: { fields: { date: m().format('LL') } }
    });
    console.log(data.service);
    this.setState({
      ticketNo: data.service.ticketNo || '',
      status: data.service.status || 'offline',
      officeId: data.service.officeId || '',
      fare: data.service.fare || '',
      workRequested: data.service.workRequested || '',
      workDone: data.service.workDone || ''
    });
  };

  resetState = () =>
    this.setState({
      ticketNo: '',
      status: '',
      fare: '',
      workRequested: '',
      workDone: ''
    });

  render() {
    console.log(m().format('LL Z'));
    const {
      offices,
      ticketNo,
      fare,
      officeId,
      status,
      workRequested,
      workDone
    } = this.state;
    return (
      <Mutation
        mutation={CREATE_SERVICE}
        variables={{
          fields: {
            ticketNo,
            officeId,
            workDone,
            workRequested,
            status,
            date: m().format('LL'),
            fare: parseFloat(fare)
          }
        }}
        onCompleted={this.resetState}
      >
        {(createService, { loading, data }) => (
          <Segment>
            <Form
              error={data && Boolean(data.createService.error)} // error and success want boolean as prop
              success={data && Boolean(!data.createService.error)}
              onSubmit={e => {
                e.preventDefault();
                createService();
              }}
            >
              {data && data.createService.error ? (
                data.createService.error.map(err => (
                  <ErrorMessage key={err} error={err} />
                ))
              ) : (
                <SuccessMessage message="Sucess!" />
              )}

              <Form.Field>
                <label>Ticket No.</label>
                <Form.Input
                  value={ticketNo}
                  name="ticketNo"
                  onChange={this.handleChange}
                />
              </Form.Field>

              <Form.Field>
                <label>Status</label>
                <Form.Select
                  name="status"
                  options={this.statusOptions}
                  defaultValue={status}
                  onChange={this.handleChange}
                />
              </Form.Field>

              <Form.Field>
                <label>Location</label>
                <Form.Select
                  name="officeId"
                  options={offices}
                  defaultValue={'1'}
                  onChange={this.handleChange}
                />
              </Form.Field>

              <Form.Field>
                <label>Work Requested</label>
                <Form.TextArea
                  type="text"
                  value={workRequested}
                  name="workRequested"
                  onChange={this.handleChange}
                />
              </Form.Field>

              <Form.Field>
                <label>Work Done</label>
                <Form.TextArea
                  type="text"
                  value={workDone}
                  name="workDone"
                  onChange={this.handleChange}
                />
              </Form.Field>

              <Form.Field>
                <label>Transit Fare</label>
                <Form.Input
                  type="number"
                  name="fare"
                  value={fare}
                  onChange={this.handleChange}
                />
              </Form.Field>

              <Button loading={loading} color="black">
                Submit
              </Button>
            </Form>
          </Segment>
        )}
      </Mutation>
    );
  }
}

export default withApollo(ServiceForm);

const CREATE_SERVICE = gql`
  mutation createService($fields: ServiceInput!) {
    createService(fields: $fields) {
      service {
        id
      }
      error
    }
  }
`;
const GET_OFFICES = gql`
  {
    offices {
      alias
      id
    }
  }
`;

const GET_SERVICE = gql`
  query service($fields: ServiceInput!) {
    service(fields: $fields) {
      ticketNo
      status
      officeId
      fare
      workRequested
      workDone
    }
  }
`;
