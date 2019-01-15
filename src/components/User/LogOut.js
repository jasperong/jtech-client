import React, { Component } from 'react';
import { withApollo } from 'react-apollo';

class LogOut extends Component {
  componentDidMount() {
    const { client, history } = this.props;
    client.resetStore();
    localStorage.clear();
    history.push('/signin');
  }
  render() {
    return <div />;
  }
}

export default withApollo(LogOut);
