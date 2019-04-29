import React from 'react';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';

import Loading from '../components/Layout/Loading';

const withCurrentUser = WrappedComponent => props => (
  <Query query={CURRENT_USER}>
    {({ data, loading, error }) => {
      if (error) console.log(error);
      if (loading) return <Loading />;
      return <WrappedComponent {...data} {...props} />;
    }}
  </Query>
);

export default withCurrentUser;

const CURRENT_USER = gql`
  {
    currentUser {
      id
      authenticationToken
      fullName
      role
    }
  }
`;
