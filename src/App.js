import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import AuthRoute from './components/AuthRoute';
import Employees from './components/Employees';
import Layout from './components/Layout';
import LogOut from './components/User/LogOut';
import Services from './components/Services';
import SignIn from './components/User/SignIn';

const App = () => (
  <BrowserRouter>
    <Switch>
      <Route path="/signin" component={SignIn} />
      <Route path="/logout" component={LogOut} />
      <Layout>
        <Switch>
          <AuthRoute path="/" component={Services} />
          <AuthRoute path="/employees" component={Employees} />
        </Switch>
      </Layout>
    </Switch>
  </BrowserRouter>
);

export default App;
