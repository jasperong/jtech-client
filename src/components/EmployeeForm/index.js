import React, { Component } from 'react';
import { Button, Form, Message, Segment } from 'semantic-ui-react';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';

class EmployeeForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: '',
      lastName: '',
      email: '',
      mobile: '',
      role: 2
    };
  }

  roleOptions = [
    { text: 'Technician', value: 2 },
    { text: 'Client', value: 1 },
    { text: 'Admin', value: 0 }
  ];

  handleChange = (e, { name, value }) => this.setState({ [name]: value });

  resetState = () =>
    this.setState({
      firstName: '',
      lastName: '',
      email: '',
      mobile: '',
      role: 2
    });

  render() {
    const { firstName, lastName, email, mobile, role } = this.state;
    return (
      <Mutation
        mutation={CREATE_USER}
        variables={{ fields: this.state }}
        onCompleted={this.resetState}
      >
        {(createUser, { loading, data }) => (
          <Segment>
            <Form
              error={data && data.createUser.error.length > 0}
              onSubmit={e => {
                e.preventDefault();
                createUser();
              }}
            >
              {console.log(data)}
              {data && data.createUser.error.length && (
                <Message error>
                  <Message.List>
                    {data.createUser.error.map(err => (
                      <Message.Item key={err}>{err}</Message.Item>
                    ))}
                  </Message.List>
                </Message>
              )}
              <Form.Field>
                <label>First Name</label>
                <Form.Input
                  value={firstName}
                  name="firstName"
                  onChange={this.handleChange}
                />
              </Form.Field>
              <Form.Field>
                <label>Last Name</label>
                <Form.Input
                  value={lastName}
                  name="lastName"
                  onChange={this.handleChange}
                />
              </Form.Field>
              <Form.Field>
                <label>Email</label>
                <Form.Input
                  type="email"
                  value={email}
                  name="email"
                  onChange={this.handleChange}
                />
              </Form.Field>
              <Form.Field>
                <label>Mobile No.</label>
                <Form.Input
                  type="number"
                  value={mobile}
                  name="mobile"
                  onChange={this.handleChange}
                />
              </Form.Field>
              <Form.Field>
                <label>User Role</label>
                <Form.Select
                  type="number"
                  options={this.roleOptions}
                  defaultValue={2}
                  name="role"
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

export default EmployeeForm;

const CREATE_USER = gql`
  mutation createUser($fields: UserInput!) {
    createUser(fields: $fields) {
      user {
        id
      }
      error
    }
  }
`;
