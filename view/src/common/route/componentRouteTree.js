import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Grid from 'material-ui/Grid';
import Button from 'material-ui/Button';
import Typography from 'material-ui/Typography';
import IconButton from 'material-ui/IconButton';
import List, {
  ListItem,
  ListItemIcon,
  ListItemText,
  ListItemSecondaryAction
} from 'material-ui/List';
import Divider from 'material-ui/Divider';

import { openModal } from '../../app/index';
import { getRouteIcon, appIcons } from '../../app/helpers';

const styles = theme => ({
  root: {
    width: '100%',
    background: theme.palette.background.paper
  },
  component: {
    paddingBottom: theme.spacing.unit
  },
  componentLink: {
    backgroundColor: theme.palette.primary['500']
  },
  componentLinkText: {
    ...theme.typography.subheading,
    color: theme.palette.primary['500'],
    textAlign: 'right'
  },
  nested1: {
    paddingLeft: theme.spacing.unit * 4
  },
  nested2: {
    paddingLeft: theme.spacing.unit * 8
  }
});

const ComponentRouteTree = props => {
  const { selectedComponent, openModal, classes } = props;
  const componentRoutes = selectedComponent.config.routes;
  const addRoute = () => {
    openModal('addRouteModal');
  };
  return (
    <div>
      {Object.keys(componentRoutes).length > 0 ? (
        <div>
          <Typography type="headline" gutterBottom>
            Routes
          </Typography>
          <List className={classes.root}>
            {Object.keys(componentRoutes).map((root, i1) => (
              <div className={classes.component} key={`${i1}:${root}`}>
                <Divider />
                <ListItem className={classes.componentLink}>
                  <ListItemIcon>{appIcons.route}</ListItemIcon>
                  <ListItemText inset primary={root} />
                  <ListItemSecondaryAction>
                    {componentRoutes[root].middleware &&
                    componentRoutes[root].middleware.includes(
                      'authorizeRoute'
                    ) ? (
                      <IconButton>{appIcons.routeAuthorized}</IconButton>
                    ) : null}
                  </ListItemSecondaryAction>
                </ListItem>
                <Divider />
                {Object.keys(componentRoutes[root])
                  .filter(v => v !== 'middleware')
                  .map(verb =>
                    Object.keys(componentRoutes[root][verb]).map(route => (
                      <div key={`${i1}:${root}:${route}`}>
                        <ListItem
                          button
                          className={classes.nested1}
                          key={`${i1}:${verb}:${route}`}
                        >
                          <ListItemIcon>
                            <div>{getRouteIcon(verb)}</div>
                          </ListItemIcon>
                          <ListItemText inset primary={route} />
                          <ListItemSecondaryAction>
                            {componentRoutes[root][verb][route].middleware &&
                            componentRoutes[root][verb][
                              route
                            ].middleware.includes('authorizeRoute') ? (
                              <IconButton>
                                {appIcons.routeAuthorized}
                              </IconButton>
                            ) : null}
                          </ListItemSecondaryAction>
                        </ListItem>
                        {Object.keys(
                          componentRoutes[root][verb][route]
                        ).map((prop, i2) => (
                          <div
                            className={classes.nested2}
                            key={`${i1}:${i2}:${verb}:${route}`}
                          >
                            {prop !== 'controller' ? null : (
                              <ListItem>
                                <ListItemIcon>
                                  {appIcons.controller}
                                </ListItemIcon>
                                <ListItemText
                                  inset
                                  primary="controller"
                                  secondary={
                                    componentRoutes[root][verb][route][prop]
                                  }
                                />
                              </ListItem>
                            )}
                            {prop !== 'middleware' ? null : (
                              <ListItem key={i1}>
                                <ListItemIcon>
                                  {appIcons.routeMiddleware}
                                </ListItemIcon>
                                <ListItemText
                                  inset
                                  primary="middleware"
                                  secondary={componentRoutes[root][verb][route][
                                    prop
                                  ].join(', ')}
                                />
                              </ListItem>
                            )}
                            {prop !== 'reqBody' ? null : (
                              <ListItem key={i1}>
                                <ListItemIcon>{appIcons.routeReq}</ListItemIcon>
                                <ListItemText
                                  inset
                                  primary="req.body"
                                  secondary={componentRoutes[root][verb][route][
                                    prop
                                  ].join(', ')}
                                />
                              </ListItem>
                            )}
                            {prop !== 'reqHeader' ? null : (
                              <ListItem key={i1}>
                                <ListItemIcon>
                                  {appIcons.routeHeader}
                                </ListItemIcon>
                                <ListItemText
                                  inset
                                  primary="req.headers"
                                  secondary={Object.keys(
                                    componentRoutes[root][verb][route][prop]
                                  ).join(', ')}
                                />
                              </ListItem>
                            )}
                            {prop !== 'resBody' ? null : (
                              <ListItem key={i1}>
                                <ListItemIcon>{appIcons.routeRes}</ListItemIcon>
                                <ListItemText
                                  inset
                                  primary="res.body"
                                  secondary={componentRoutes[root][verb][route][
                                    prop
                                  ].join(', ')}
                                />
                              </ListItem>
                            )}
                          </div>
                        ))}
                      </div>
                    ))
                  )}
              </div>
            ))}
          </List>
        </div>
      ) : (
        <Grid container direction="column" justify="center" alignItems="center">
          <Grid item>
            <Button onClick={addRoute}>
              <Grid
                container
                direction="column"
                justify="center"
                alignItems="center"
              >
                <Grid item>{appIcons.route}</Grid>
                <Grid item>
                  <Typography type="title">Add Routes</Typography>
                </Grid>
              </Grid>
            </Button>
          </Grid>
        </Grid>
      )}
    </div>
  );
};

ComponentRouteTree.propTypes = {
  classes: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  selectedComponentName: state.common.selectedComponent,
  selectedComponent: state.common.Components[state.common.selectedComponent],
  globalRoutes: state.common.GlobalRoutes
});

export default withRouter(
  connect(mapStateToProps, { openModal })(
    withStyles(styles)(ComponentRouteTree)
  )
);
