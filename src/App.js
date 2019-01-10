import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import Layout from './components/Layout';
import Employees from './components/Employees';
import Services from './components/Services';

const App = () => (
  <BrowserRouter>
    <Switch>
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
