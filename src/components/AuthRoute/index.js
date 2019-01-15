import React from 'react';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';
import { Redirect, Route } from 'react-router-dom';

import { loadState } from '../../utils/localStorage';

const AuthRoute = props => (
  <Query query={CHECK_AUTH}>
    {({ loading, error, data }) => {
      if (error) console.log(error);
      if (loading) return <p>loading</p>;
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
