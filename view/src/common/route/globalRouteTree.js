import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Typography from 'material-ui/Typography';
import IconButton from 'material-ui/IconButton';
import List, {
  ListItem,
  ListItemIcon,
  ListItemText,
  ListItemSecondaryAction
} from 'material-ui/List';
import Divider from 'material-ui/Divider';

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
  }
});

const GlobalRouteTree = props => {
  const { globalRoutes, classes } = props;
  return (
    <div>
      <Typography type="display2" gutterBottom>
        Routes
      </Typography>
      <List className={classes.root}>
        {Object.keys(globalRoutes).map((root, i1) => (
          <div className={classes.component} key={i1}>
            <Divider />
            <ListItem button className={classes.componentLink}>
              <ListItemIcon>{appIcons.route}</ListItemIcon>
              <ListItemText inset primary={root} />
              <ListItemText
                disableTypography
                secondary="Manage"
                className={classes.componentLinkText}
              />
              <ListItemSecondaryAction>
                {globalRoutes[root].middleware &&
                globalRoutes[root].middleware.includes('authorizeRoute') ? (
                  <IconButton>{appIcons.routeAuthorized}</IconButton>
                ) : null}
              </ListItemSecondaryAction>
            </ListItem>
            <Divider />
            {Object.keys(globalRoutes[root])
              .filter(v => v !== 'middleware')
              .map((verb, i2) =>
                Object.keys(globalRoutes[root][verb]).map((route, i3) => (
                  <ListItem
                    button
                    className={classes.nested1}
                    key={`${i2}:${i3}`}
                  >
                    <ListItemIcon>
                      <div>{getRouteIcon(verb)}</div>
                    </ListItemIcon>
                    <ListItemText inset primary={route} />
                    <ListItemSecondaryAction>
                      {globalRoutes[root][verb][route].middleware &&
                      globalRoutes[root][verb][route].middleware.includes(
                        'authorizeRoute'
                      ) ? (
                        <IconButton>{appIcons.routeAuthorized}</IconButton>
                      ) : null}
                    </ListItemSecondaryAction>
                  </ListItem>
                ))
              )}
          </div>
        ))}
      </List>
    </div>
  );
};
GlobalRouteTree.propTypes = {
  classes: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  globalRoutes: state.common.GlobalRoutes
});

export default connect(mapStateToProps)(withStyles(styles)(GlobalRouteTree));
