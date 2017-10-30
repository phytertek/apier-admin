/* eslint-disable flowtype/require-valid-file-annotation */

import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Typography from 'material-ui/Typography';
import List, {
  ListItem,
  ListItemSecondaryAction,
  ListItemText,
  ListItemIcon
} from 'material-ui/List';
import Switch from 'material-ui/Switch';
import { appIcons } from '../../app/helpers';

import { addComponentUtility, removeComponentUtility } from '../index';

const styles = theme => ({
  root: {
    width: '100%',
    background: theme.palette.background.paper
  },
  componentLink: {
    backgroundColor: theme.palette.primary['500']
  }
});

const ComponentFunctionsList = props => {
  const {
    classes,
    selectedComponent,
    selectedComponentName,
    globalServices,
    globalCommon
  } = props;
  const handleSwitchToggle = (type, targetK2, targetName) => {
    if (
      !selectedComponent.config[type] ||
      (selectedComponent.config[type] &&
        !selectedComponent.config[type][targetK2]) ||
      (selectedComponent.config[type] &&
        selectedComponent.config[type][targetK2] &&
        selectedComponent.config[type][targetK2].indexOf(targetName) === -1)
    ) {
      return props.addComponentUtility(
        type,
        targetK2,
        targetName,
        selectedComponentName
      );
    }
    return props.removeComponentUtility(
      type,
      targetK2,
      targetName,
      selectedComponentName
    );
  };
  return (
    <div>
      <Typography type="headline" gutterBottom>
        Functions
      </Typography>
      <List className={classes.root}>
        <ListItem className={classes.componentLink}>
          <ListItemIcon>{appIcons.controller}</ListItemIcon>
          <ListItemText inset primary="Controllers" />
        </ListItem>
        {selectedComponent
          ? selectedComponent.config.controllers.map((controller, i) => (
              <ListItem key={i}>
                <ListItemText primary={controller} />
              </ListItem>
            ))
          : null}
        <ListItem className={classes.componentLink}>
          <ListItemIcon>{appIcons.service}</ListItemIcon>
          <ListItemText inset primary="Services" />
        </ListItem>
        {selectedComponent
          ? Object.keys(globalServices).map((k, i1) =>
              globalServices[k].map((name, i2) => (
                <ListItem key={`${i1}:${i2}`}>
                  <ListItemText primary={k} secondary={name} />

                  <ListItemSecondaryAction>
                    <Switch
                      checked={
                        Object.keys(
                          selectedComponent.config.importedServices || {}
                        ).findIndex(
                          k2 =>
                            selectedComponent.config.importedServices[
                              k2
                            ].indexOf(name) !== -1
                        ) !== -1
                      }
                      onClick={() =>
                        handleSwitchToggle('importedServices', k, name)}
                    />
                  </ListItemSecondaryAction>
                </ListItem>
              ))
            )
          : null}
        <ListItem className={classes.componentLink}>
          <ListItemIcon>{appIcons.common}</ListItemIcon>
          <ListItemText inset primary="Common Utilities" />
        </ListItem>
        {Object.keys(globalCommon).map((k, i1) =>
          globalCommon[k].map((name, i2) => (
            <ListItem key={`${i1}:${i2}`}>
              <ListItemText primary={k} secondary={name} />

              <ListItemSecondaryAction>
                <Switch
                  checked={
                    Object.keys(
                      selectedComponent.config.importedCommon || {}
                    ).findIndex(
                      k2 =>
                        selectedComponent.config.importedCommon[k2].indexOf(
                          name
                        ) !== -1
                    ) !== -1
                  }
                  onClick={() => handleSwitchToggle('importedCommon', k, name)}
                />
              </ListItemSecondaryAction>
            </ListItem>
          ))
        )}
      </List>
    </div>
  );
};

ComponentFunctionsList.propTypes = {
  classes: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  selectedComponentName: state.common.selectedComponent,
  selectedComponent: state.common.Components[state.common.selectedComponent],
  globalServices: state.common.GlobalServices,
  globalCommon: state.common.GlobalCommon
});

export default connect(mapStateToProps, {
  addComponentUtility,
  removeComponentUtility
})(withStyles(styles)(ComponentFunctionsList));
