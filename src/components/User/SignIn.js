import React, { Component } from 'react';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';
import { Link } from 'react-router-dom';
import {
  Button,
  Card,
  Container,
  Form,
  Header,
  Message
} from 'semantic-ui-react';

import { saveState } from '../../utils/localStorage';

class SignIn extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      error: '',
      hasError: false
    };
  }

  handleChange = ({ target: { name, value } }) =>
    this.setState({ [name]: value });

  handleCompleted = ({ signIn: { user, error, signedIn } }) => {
    if (signedIn) {
      this.setState({ error: '', hasError: false }, () =>
        this.handleSignIn(user.authenticationToken)
      );
    } else {
      this.setState({ error, hasError: true });
    }
  };

  handleSignIn = async token => {
    await saveState({ token });
    await this.props.history.push('/');
  };

  render() {
    const { email, error, hasError, password } = this.state;
    return (
      <Mutation
        mutation={SIGN_IN}
        variables={{ email, password }}
        onCompleted={this.handleCompleted}
      >
        {signIn => (
          <Container className="signin__container">
            <Card className="signin__card" raised>
              <Form onSubmit={signIn} error={hasError}>
                <Form.Field>
                  <label htmlFor="email">Email</label>
                  <input
                    name="email"
                    onChange={this.handleChange}
                    value={email}
                  />
                </Form.Field>
                <Form.Field>
                  <label htmlFor="password">Password</label>
                  <input
                    name="password"
                    type="password"
                    onChange={this.handleChange}
                    value={password}
                  />
                </Form.Field>
                <Link to="/forgot">
                  <Header as="h5">Forgot password?</Header>
                </Link>
                {hasError && <Message error content={error} />}
                <Button style={{ marginTop: '1em' }}>Sign In</Button>
              </Form>
            </Card>
          </Container>
        )}
      </Mutation>
    );
  }
}

export default SignIn;

const SIGN_IN = gql`
  mutation signIn($email: String!, $password: String!) {
    signIn(email: $email, password: $password) {
      user {
        authenticationToken
      }
      error
      signedIn
    }
  }
`;
