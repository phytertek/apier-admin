import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Typography from 'material-ui/Typography';
import Grid from 'material-ui/Grid';
import Button from 'material-ui/Button';
import IconButton from 'material-ui/IconButton';
import List, {
  ListItem,
  ListItemIcon,
  ListItemText,
  ListItemSecondaryAction
} from 'material-ui/List';
import Divider from 'material-ui/Divider';
import { openModal } from '../../app/index';
import { getFieldIcon, appIcons } from '../../app/helpers';

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
const ComponentSchemaTree = props => {
  const {
    selectedComponent,
    selectedComponentName,
    globalSchema,
    openModal,
    classes
  } = props;
  const addSchema = () => {
    openModal('addSchemaModal');
  };
  return (
    <div>
      {Object.keys(selectedComponent.config.schema).length > 0 ? (
        <div>
          <Typography type="headline" gutterBottom>
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
                  <ListItem
                    className={classes.nested1}
                    key={`${i1}:${i2}`}
                    button
                  >
                    {Object.keys(
                      selectedComponent.config.schema[schemaName]
                    ).includes(fieldName) ? (
                      <ListItemIcon>{appIcons.component}</ListItemIcon>
                    ) : null}
                    <ListItemIcon>
                      <div>
                        {getFieldIcon(globalSchema[schemaName][fieldName])}
                      </div>
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
      ) : (
        <Grid container direction="column" justify="center" alignItems="center">
          <Grid item>
            <Button onClick={addSchema}>
              <Grid
                container
                direction="column"
                justify="center"
                alignItems="center"
              >
                <Grid item>{appIcons.schema}</Grid>
                <Grid item>
                  <Typography type="title">Add Schema</Typography>
                </Grid>
              </Grid>
            </Button>
          </Grid>
        </Grid>
      )}
    </div>
  );
};

ComponentSchemaTree.propTypes = {
  classes: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  selectedComponentName: state.common.selectedComponent,
  selectedComponent: state.common.Components[state.common.selectedComponent],
  globalSchema: state.common.GlobalSchema
});

export default connect(mapStateToProps, { openModal })(
  withStyles(styles)(ComponentSchemaTree)
);
