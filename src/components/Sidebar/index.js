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
          <Menu vertical inverted icon="labeled">
            <Profile />
            <MenuItem icon="user" label="TECHNICIANS" path="/technicians" />
            <MenuItem icon="wrench" label="SERVICE" path="/" />
            <MenuItem icon="sign-out" label="LOG OUT" path="/logout" />
          </Menu>
        }
        open={sidebarOpen}
        sidebarClassName="sidebar__container"
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
