import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import { withRouter } from 'react-router-dom';
import Typography from 'material-ui/Typography';
import IconButton from 'material-ui/IconButton';
import List, {
  ListItem,
  ListItemIcon,
  ListItemText,
  ListItemSecondaryAction
} from 'material-ui/List';
import ListSubheader from 'material-ui/List/ListSubheader';
import Divider from 'material-ui/Divider';
import { appIcons } from '../../app/helpers';

import { setSelectedComponent } from '../index';

const styles = theme => ({
  root: {
    width: '100%',
    background: theme.palette.background.paper
  },
  component: {
    paddingBottom: theme.spacing.unit
  },
  componentTitle: theme.typography.headline,
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

const GlobalComponentTree = props => {
  const { setSelectedComponent, components, classes, history } = props;
  const handleSelectComponent = name => {
    setSelectedComponent(name);
    history.push('/component');
  };
  return (
    <div>
      <Typography type="display2" gutterBottom>
        Components
      </Typography>
      <List className={classes.root}>
        {Object.keys(components).map((name, i1) => (
          <div className={classes.component} key={i1}>
            <Divider />
            <ListItem
              button
              className={classes.componentLink}
              onClick={() => handleSelectComponent(name)}
            >
              <ListItemIcon>{appIcons.component}</ListItemIcon>
              <ListItemText inset primary={name} />
              <ListItemText
                disableTypography
                secondary="Manage"
                className={classes.componentLinkText}
              />
            </ListItem>
            <Divider />
            <ListSubheader>Routes</ListSubheader>
            {Object.keys(
              components[name].config.routes || { None: true }
            ).map((route, i2) => (
              <ListItem className={classes.nested1} key={i2}>
                {route === 'None' ? null : (
                  <ListItemIcon>{appIcons.route}</ListItemIcon>
                )}
                <ListItemText inset={route !== 'None'} primary={route} />
              </ListItem>
            ))}
            <ListSubheader>Schema</ListSubheader>
            {Object.keys(
              components[name].config.schema || { None: true }
            ).map((schema, i2) => (
              <ListItem className={classes.nested1} key={i2}>
                {schema === 'None' ? null : (
                  <ListItemIcon>{appIcons.schema}</ListItemIcon>
                )}
                <ListItemText inset={schema !== 'None'} primary={schema} />
              </ListItem>
            ))}
            <ListSubheader>Services</ListSubheader>
            {Object.keys(
              components[name].config.services || { None: true }
            ).map((service, i2) => (
              <ListItem className={classes.nested1} key={i2}>
                {service === 'None' ? null : (
                  <ListItemIcon>{appIcons.service}</ListItemIcon>
                )}
                <ListItemText inset={service !== 'None'} primary={service} />
              </ListItem>
            ))}
          </div>
        ))}
      </List>
    </div>
  );
};

GlobalComponentTree.propTypes = {
  classes: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  components: state.common.Components
});

export default withRouter(
  connect(mapStateToProps, { setSelectedComponent })(
    withStyles(styles)(GlobalComponentTree)
  )
);
