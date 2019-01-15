import React, { Component } from 'react';
import { Icon, Menu } from 'semantic-ui-react';
import RSideBar from 'react-sidebar';

import MenuItem from './MenuItem';
import Profile from './Profile';

const mql = window.matchMedia(`(min-width: 800px)`);

class Sidebar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sidebarDocked: mql.matches,
      sidebarOpen: false
    };
  }

  componentWillMount() {
    mql.addListener(this.mediaQueryChanged);
  }

  componentWillUnmount() {
    mql.removeListener(this.mediaQueryChanged);
  }

  onSetSidebarOpen = open => {
    this.setState({ sidebarOpen: open });
  };

  mediaQueryChanged = () => {
    this.setState({ sidebarDocked: mql.matches, sidebarOpen: false });
  };

  render() {
    const { sidebarOpen, sidebarDocked } = this.state;
    return (
      <RSideBar
        sidebar={
          <Menu vertical>
            <Profile />
            <MenuItem icon="user" label="EMPLOYEES" />
            <MenuItem icon="user" label="SERVICE" />
            <MenuItem icon="dollar sign" label="MONEY" />
          </Menu>
        }
        open={sidebarOpen}
        docked={sidebarDocked}
        onSetOpen={this.onSetSidebarOpen}
      >
        <button
          className="button--hidden"
          onClick={() => this.onSetSidebarOpen(true)}
        >
          {!mql.matches && <Icon name="angle right" />}
        </button>
        {this.props.children}
      </RSideBar>
    );
  }
}

export default Sidebar;
