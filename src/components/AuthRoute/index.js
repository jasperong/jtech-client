import React from 'react';
import { Redirect } from 'react-router-dom';
import Route from '../ScrollToTopRoute';

import withCurrentUser from '../../HOC/withCurrentUser';
import { loadState } from '../../utils/localStorage';

const AuthRoute = props =>
  (props.currentUser && props.currentUser.authenticationToken) ===
  (loadState() && loadState().token) ? (
    <Route {...props} />
  ) : (
    <Redirect to="/logout" />
  );

export default withCurrentUser(AuthRoute);
