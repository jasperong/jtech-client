import React from 'react';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';
import { Redirect } from 'react-router-dom';

import Route from './ScrollToTopRoute';
import Loading from '../components/shared/Loading';

const AuthRoute = props => (
  <Query query={CHECK_AUTH}>
    {({ loading, error, data }) => {
      {
        /* if (loading) return <Loading size="3x" /> */
      }
      if (loading) return <Loading size="3x" />;
      return data.currentUser.authenticationToken ? (
        <Route {...props} />
      ) : (
        <Redirect to="/logout" />
      );
    }}
  </Query>
);

export default AuthRoute;

const CHECK_AUTH = gql`
  {
    currentUser {
      authenticationToken
    }
  }
`;
