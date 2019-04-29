import React, { Component } from 'react';
import { Icon, Menu } from 'semantic-ui-react';
import RSideBar from 'react-sidebar';
import { withRouter } from 'react-router-dom';
import { compose } from 'recompose';

import MenuItem from './MenuItem';
import Profile from './Profile';
import withCurrentUser from '../../HOC/withCurrentUser';

const mql = window.matchMedia(`(min-width: 800px)`);

class Sidebar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sidebarDocked: mql.matches,
      sidebarOpen: false,
      activeIndex: this.initialIndex()
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

  initialIndex = () => {
    const {
      location: { pathname }
    } = this.props;
    if (pathname === '/' || pathname.includes('/services')) {
      return 0;
    } else if (pathname.includes('/technicians')) {
      return 1;
    }
    return 0;
  };

  changeActiveIndex = idx => this.setState({ activeIndex: idx });

  menuItems = [
    {
      icon: 'wrench',
      label: 'Service',
      path: '/'
    },
    {
      icon: 'user',
      label: 'Technicians',
      path: '/technicians'
    },
    {
      icon: 'sign-out',
      label: 'Log out',
      path: '/logout',
      className: 'menu-item__bottom'
    }
  ];

  techMenuItems = [
    {
      icon: 'wrench',
      label: 'Service',
      path: '/services/new'
    },
    {
      icon: 'user',
      label: 'Profile',
      path: `/technicians/${this.props.currentUser.id}`
    },
    {
      icon: 'sign-out',
      label: 'Log out',
      path: '/logout',
      className: 'menu-item__bottom'
    }
  ];

  render() {
    const { sidebarOpen, sidebarDocked, activeIndex } = this.state;
    const menuItems =
      this.props.currentUser.role === 'employee'
        ? this.techMenuItems
        : this.menuItems;
    return (
      <RSideBar
        sidebar={
          <Menu vertical inverted className="sidebar-menu" icon="labeled">
            <Profile />
            {menuItems.map(({ icon, label, path, className }, i) => (
              <MenuItem
                icon={icon}
                key={i}
                className={className}
                label={label}
                path={path}
                active={activeIndex === i}
                onClick={() => this.changeActiveIndex(i)}
              />
            ))}
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
        <div id="app-body">{this.props.children}</div>
      </RSideBar>
    );
  }
}

export default compose(
  withRouter,
  withCurrentUser
)(Sidebar);
