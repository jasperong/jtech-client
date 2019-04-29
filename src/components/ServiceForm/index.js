import React, { Component } from 'react';
import { Button, Form, Segment } from 'semantic-ui-react';
import { Mutation, withApollo } from 'react-apollo';
import gql from 'graphql-tag';

import DatePicker from '../DatePicker';
import ErrorMessage from '../ErrorMessage';
import SuccessMessage from '../SuccessMessage';
import { m } from '../../utils';

class ServiceForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      focused: false,
      date: m(),
      startTime: null,
      endTime: null,
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

  handleChange = (e, { name, value }) => {
    this.setState({ [name]: value }, () => {
      console.log(
        this.state.date
          .clone()
          .startOf('day')
          .add(this.state.startTime, 'hours')
          .format()
      );
    });
  };

  statusOptions = [
    { text: 'Offline', value: 'offline' },
    { text: 'In Transit', value: 'in_transit' },
    { text: 'Online', value: 'online' },
    { text: 'Done', value: 'done' }
  ];

  timeOptions = [
    { text: '', value: null },
    { text: '8AM', value: 8 },
    { text: '9AM', value: 9 },
    { text: '10AM', value: 10 },
    { text: '11AM', value: 11 },
    { text: '12PM', value: 12 },
    { text: '1PM', value: 13 },
    { text: '2PM', value: 14 },
    { text: '3PM', value: 15 },
    { text: '4PM', value: 16 },
    { text: '5PM', value: 17 },
    { text: '6PM', value: 18 },
    { text: '7PM', value: 19 },
    { text: '8PM', value: 20 }
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
    console.log(m(data.service.startTime).hour());
    if (data.service) {
      this.setState({
        date: data.service.date || m(),
        startTime: m(data.service.startTime).hour() || null,
        endTime: m(data.service.endTime).hour() || null,
        ticketNo: data.service.ticketNo || '',
        status: data.service.status || 'offline',
        officeId: data.service.officeId || '',
        fare: data.service.fare || '',
        workRequested: data.service.workRequested || '',
        workDone: data.service.workDone || ''
      });
    }
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
    const {
      date,
      focused,
      startTime,
      endTime,
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
            date,
            startTime:
              startTime &&
              date
                .clone()
                .startOf('day')
                .add(startTime, 'hours')
                .format(),
            endTime:
              endTime &&
              date
                .clone()
                .startOf('day')
                .add(endTime, 'hours')
                .format(),
            fare: parseFloat(fare)
          }
        }}
        // onCompleted={this.resetState}
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
                <label>Date</label>
                <DatePicker
                  date={date}
                  focused={focused}
                  onDateChange={date =>
                    this.handleChange(null, { name: 'date', value: date })
                  }
                  onFocusChange={({ focused }) => this.setState({ focused })}
                />
              </Form.Field>

              <Form.Group widths="equal">
                <Form.Select
                  fluid
                  options={this.timeOptions}
                  name="startTime"
                  value={startTime}
                  label="Start Time"
                  onChange={this.handleChange}
                />
                <Form.Select
                  fluid
                  options={this.timeOptions}
                  name="endTime"
                  value={endTime}
                  label="End Time"
                  onChange={this.handleChange}
                />
              </Form.Group>

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
                  value={status}
                  onChange={this.handleChange}
                />
              </Form.Field>

              <Form.Field>
                <label>Location</label>
                <Form.Select
                  name="officeId"
                  options={offices}
                  value={officeId}
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
      startTime
      endTime
    }
  }
`;
