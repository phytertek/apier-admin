import React from 'react';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';
import Button from 'material-ui/Button';
import IconButton from 'material-ui/IconButton';
import HomeIcon from 'material-ui-icons/Home';
import GithubCircleIcon from 'mdi-material-ui/GithubCircle';
import HeaderMenu from './headerMenu';

const styles = theme => ({
  root: {},
  flex: {
    flex: 1
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20
  }
});

function ButtonAppBar(props) {
  const { classes } = props;
  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <HeaderMenu />
          <Typography type="title" className={classes.flex}>
            {props.appName}
          </Typography>
          <IconButton aria-label="Menu">
            <GithubCircleIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
    </div>
  );
}

ButtonAppBar.propTypes = {
  classes: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  appName: state.common.appName
});

export default withRouter(
  connect(mapStateToProps)(withStyles(styles)(ButtonAppBar))
);
