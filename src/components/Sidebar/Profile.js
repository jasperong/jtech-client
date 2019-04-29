import React from 'react';
import { Image, MenuItem } from 'semantic-ui-react';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';

import Loading from '../Layout/Loading';
import logo from '../../assets/logo.jpg';

const Profile = () => (
  <Query query={GET_USER}>
    {({ loading, data }) => {
      if (loading) return <Loading />;
      return (
        <MenuItem>
          <Image src={logo} size="tiny" centered spaced />
          <h5>{data.currentUser.fullName}</h5>
        </MenuItem>
      );
    }}
  </Query>
);

export default Profile;

const GET_USER = gql`
  {
    currentUser {
      fullName
    }
  }
`;
