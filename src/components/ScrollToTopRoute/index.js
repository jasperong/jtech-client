import React, { Component } from 'react';
import { Route, withRouter } from 'react-router-dom';

class ScrollToTopRoute extends Component {
  componentDidUpdate(prevProps) {
    // if (
    //   this.props.path === this.props.location.pathname &&
    //   this.props.location.pathname !== prevProps.location.pathname
    // ) {
    document.getElementById('app-body').parentNode.scrollTop = 0;
    // }
  }

  render() {
    /* eslint-disable no-shadow */
    const { component: Component, ...rest } = this.props;

    return <Route {...rest} render={props => <Component {...props} />} />;
  }
}

export default withRouter(ScrollToTopRoute);
