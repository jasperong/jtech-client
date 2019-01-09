import React, { Component } from 'react';
import { Sidebar as SemSidebar, Menu } from 'semantic-ui-react';
import MenuItem from './MenuItem';
import Profile from './Profile';

class Sidebar extends Component {
  render() {
    return (
      <SemSidebar
        as={Menu}
        animation="push"
        icon="labeled"
        inverted
        onHide={this.handleSidebarHide}
        vertical
        visible={true}
        width="thin"
      >
        <Profile />
        <MenuItem icon="user" label="EMPLOYEES" />
        <MenuItem icon="dollar sign" label="MONEY" />
      </SemSidebar>
    );
  }
}

export default Sidebar;
