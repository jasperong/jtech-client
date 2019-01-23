import React from 'react';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';
import { Redirect } from 'react-router-dom';
import Route from '../ScrollToTopRoute';

import Loading from '../Layout/Loading';
import { loadState } from '../../utils/localStorage';

const AuthRoute = props => (
  <Query query={CHECK_AUTH}>
    {({ loading, error, data }) => {
      if (error) console.log(error);
      if (loading) return <Loading />;
      return (data.currentUser && data.currentUser.authenticationToken) ===
        (loadState() && loadState().token) ? (
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
