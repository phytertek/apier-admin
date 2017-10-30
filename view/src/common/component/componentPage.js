import React from 'react';
import { connect } from 'react-redux';
import Typography from 'material-ui/Typography';
import Grid from 'material-ui/Grid';

import ComponentFunctionsList from './componentFunctionsList';
import ComponentRouteTree from '../route/componentRouteTree';
import ComponentSchemaTree from '../schema/componentSchemaTree';

const ComponentPage = props => {
  if (!props.selectedComponent) props.history.push('/');
  const name = props.selectedComponent;
  return (
    <div style={{ margin: 30 }}>
      <Typography type="display2" gutterBottom>
        {name}
      </Typography>
      {name ? (
        <Grid container spacing={24}>
          <Grid item xs>
            <ComponentFunctionsList />
          </Grid>
          <Grid item xs>
            {/* Component Routes List */}
            <ComponentRouteTree />
          </Grid>
          <Grid item xs>
            {/* Component Schema */}
            <ComponentSchemaTree />
          </Grid>
        </Grid>
      ) : null}
    </div>
  );
};

const mapStateToProps = state => ({
  selectedComponent: state.common.selectedComponent
});

export default connect(mapStateToProps)(ComponentPage);
