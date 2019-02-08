import React, { Component } from 'react';
import { Button, Card, Container, Form } from 'semantic-ui-react';
import { withApollo } from 'react-apollo';
import gql from 'graphql-tag';

import ErrorMessage from '../ErrorMessage';
import SuccessMessage from '../SuccessMessage';

class ForgotPassword extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      success: false,
      hasError: false
    };
  }

  handleChange = ({ target: { name, value } }) =>
    this.setState({ [name]: value });

  requestReset = async () => {
    const { data } = await this.props.client.query({
      query: REQUEST_RESET,
      variables: { email: this.state.email }
    });
    console.log(data);
    if (data.requestResetPassword) {
      this.setState({ success: true, hasError: false });
    } else {
      this.setState({ hasError: true });
    }
  };

  render() {
    const { email, hasError, success } = this.state;
    return (
      <Container className="signin__container">
        <Card className="signin__card" raised>
          <Form onSubmit={this.requestReset} success={success} error={hasError}>
            <Form.Field>
              <label htmlFor="email">Email</label>
              <input name="email" onChange={this.handleChange} value={email} />
            </Form.Field>

            <SuccessMessage message="Please check your email" />
            <ErrorMessage error="Email not found" />

            <Button>Request Instructions</Button>
          </Form>
        </Card>
      </Container>
    );
  }
}

export default withApollo(ForgotPassword);

const REQUEST_RESET = gql`
  query requestResetPassword($email: String!) {
    requestResetPassword(email: $email)
  }
`;
