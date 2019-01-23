import React from 'react';
import { BrowserRouter, Switch } from 'react-router-dom';
import { AnimatedSwitch } from 'react-router-transition';

import AuthRoute from './components/AuthRoute';
import Employees from './components/Employees';
import EmployeeSingle from './components/EmployeeSingle';
import Layout from './components/Layout';
import LogOut from './components/User/LogOut';
import Route from './components/ScrollToTopRoute';
import Services from './components/Services';
import ServiceSingle from './components/ServiceSingle';
import SignIn from './components/User/SignIn';

const App = () => (
  <BrowserRouter>
    <Switch>
      <Route path="/signin" exact component={SignIn} />
      <Route path="/logout" exact component={LogOut} />
      <Layout>
        <AnimatedSwitch
          atEnter={{ opacity: 0 }}
          atLeave={{ opacity: 0 }}
          atActive={{ opacity: 1 }}
          className="switch-wrapper"
        >
          <AuthRoute path="/" exact component={Services} />
          <AuthRoute path="/technicians" exact component={Employees} />
          <AuthRoute path="/technicians/:id" exact component={EmployeeSingle} />
          <AuthRoute path="/services/:id" exact component={ServiceSingle} />
        </AnimatedSwitch>
      </Layout>
    </Switch>
  </BrowserRouter>
);

export default App;
