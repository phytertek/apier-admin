import React, { Component } from 'react';
import Grid from 'material-ui/Grid';

import GlobalComponentTree from '../common/component/globalComponentTree';
import GlobalRouteTree from '../common/route/globalRouteTree';
import GlobalSchemaTree from '../common/schema/globalSchemaTree';
// <GlobalSchemaTree />;
class Dashboard extends Component {
  render() {
    return (
      <div style={{ margin: 30 }}>
        <Grid container spacing={24}>
          <Grid item xs>
            <GlobalComponentTree />
          </Grid>
          <Grid item xs>
            <GlobalRouteTree />
          </Grid>
          <Grid item xs>
            <GlobalSchemaTree />;
          </Grid>
        </Grid>
      </div>
    );
  }
}

export default Dashboard;
