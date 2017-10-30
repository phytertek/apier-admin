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
import { truncateText, getFieldIcon, appIcons } from '../../app/helpers';

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
const GlobalSchemaTree = props => {
  const { globalSchema, classes } = props;

  return (
    <div>
      <Typography type="display2" gutterBottom>
        Schema
      </Typography>
      <List className={classes.root}>
        {Object.keys(globalSchema).map((schemaName, i1) => (
          <div className={classes.component} key={i1}>
            <Divider />
            <ListItem button className={classes.componentLink}>
              <ListItemIcon>{appIcons.schema}</ListItemIcon>
              <ListItemText inset primary={schemaName} />
              <ListItemText
                disableTypography
                secondary="Manage"
                className={classes.componentLinkText}
              />
            </ListItem>
            <Divider />
            {Object.keys(globalSchema[schemaName]).map((fieldName, i2) => (
              <ListItem className={classes.nested1} key={`${i1}:${i2}`} button>
                <ListItemIcon>
                  <div>{getFieldIcon(globalSchema[schemaName][fieldName])}</div>
                </ListItemIcon>
                <ListItemText inset primary={fieldName} />
                <ListItemSecondaryAction>
                  {globalSchema[schemaName][fieldName].unique ? (
                    <IconButton>{appIcons.schemaUnique}</IconButton>
                  ) : null}
                  {globalSchema[schemaName][fieldName].required ? (
                    <IconButton>{appIcons.schemaRequired}</IconButton>
                  ) : null}
                </ListItemSecondaryAction>
              </ListItem>
            ))}
          </div>
        ))}
      </List>
    </div>
  );
};

GlobalSchemaTree.propTypes = {
  classes: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  globalSchema: state.common.GlobalSchema
});

export default connect(mapStateToProps)(withStyles(styles)(GlobalSchemaTree));
