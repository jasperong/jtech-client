import React, { Component } from 'react';
import {
  Button,
  Card,
  Container,
  Form,
  Header,
  Message
} from 'semantic-ui-react';
import { withApollo } from 'react-apollo';
import gql from 'graphql-tag';
import qs from 'qs';

import { saveState } from '../../utils/localStorage';

class ResetPassword extends Component {
  constructor(props) {
    super(props);
    this.state = {
      password: '',
      passwordConfirmation: '',
      hasError: false
    };
  }

  handleChange = ({ target: { name, value } }) =>
    this.setState({ [name]: value });

  requestReset = async () => {
    const { token } = qs.parse(this.props.location.search, {
      ignoreQueryPrefix: true
    });
    const { password, passwordConfirmation } = this.state;
    const { data } = await this.props.client.query({
      query: RESET_PASSWORD,
      variables: {
        fields: {
          resetPasswordToken: token,
          password,
          passwordConfirmation
        }
      }
    });
    console.log(data);
    if (!data.resetPassword) {
      this.setState({ hasError: !data.resetPassword });
    } else {
      this.handleSignIn(data.resetPassword.authenticationToken);
    }
  };

  handleSignIn = async token => {
    await saveState({ token });
    await this.props.history.push('/');
  };

  render() {
    const { password, passwordConfirmation, hasError } = this.state;
    return (
      <Container className="signin__container">
        <Card className="signin__card" raised>
          <Header as="h2">Reset Password</Header>
          <Form onSubmit={this.requestReset} error={hasError}>
            <Form.Field>
              <label htmlFor="password">Password</label>
              <input
                name="password"
                type="password"
                onChange={this.handleChange}
                value={password}
              />
            </Form.Field>

            <Form.Field>
              <label htmlFor="passwordConfirmation">Confirmation</label>
              <input
                name="passwordConfirmation"
                type="password"
                onChange={this.handleChange}
                value={passwordConfirmation}
              />
            </Form.Field>

            {hasError && <Message error content="Email not found" />}
            <Button>Reset Password</Button>
          </Form>
        </Card>
      </Container>
    );
  }
}

export default withApollo(ResetPassword);

const RESET_PASSWORD = gql`
  query resetPassword($fields: UserInput!) {
    resetPassword(fields: $fields) {
      authenticationToken
    }
  }
`;
