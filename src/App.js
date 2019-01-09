import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import Layout from './components/Layout';
import Employees from './components/Employees';

const App = () => (
  <BrowserRouter>
    <Switch>
      <Layout>
        <Switch>
          <Route path="/" component={Employees} />
        </Switch>
      </Layout>
    </Switch>
  </BrowserRouter>
);

export default App;
