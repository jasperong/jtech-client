import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import Employees from './components/Employees';
import Layout from './components/Layout';
import Services from './components/Services';
import SignIn from './components/User/SignIn';

const App = () => (
  <BrowserRouter>
    <Switch>
      <Route path="/signin" component={SignIn} />
      <Layout>
        <Switch>
          <Route path="/" component={Services} />
          <Route path="/employees" component={Employees} />
        </Switch>
      </Layout>
    </Switch>
  </BrowserRouter>
);

export default App;
