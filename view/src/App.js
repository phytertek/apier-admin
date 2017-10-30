import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Route } from 'react-router-dom';
import 'typeface-roboto';

import AppHeader from './app/header';
import Modals from './app/modals';
import DashboardPage from './dashboard/dashboardPage';
import ComponentPage from './common/component/componentPage';

import { getAppConfig } from './common';

class App extends Component {
  componentDidMount() {
    this.props.getAppConfig();
  }
  render() {
    return (
      <div>
        <AppHeader />
        <Route exact path="/" component={DashboardPage} />
        <Route path="/component" component={ComponentPage} />
        <Modals />
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    appConfig: state.common.appConfig
  };
};
export default withRouter(connect(mapStateToProps, { getAppConfig })(App));
