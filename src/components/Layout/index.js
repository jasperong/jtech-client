import React, { Fragment } from 'react';

import Sidebar from '../Sidebar';

const Layout = ({ children }) => (
  <Fragment>
    <Sidebar>
      <div className="layout__container">{children}</div>
    </Sidebar>
  </Fragment>
);
export default Layout;
