import React, { Fragment } from 'react';
import { Sidebar as SemSidebar, Container } from 'semantic-ui-react';

import Sidebar from '../Sidebar';
const Layout = ({ children }) => (
  <Fragment>
    <Sidebar />
    <SemSidebar.Pusher>
      <div className="layout__container">{children}</div>
    </SemSidebar.Pusher>
  </Fragment>
);
export default Layout;
