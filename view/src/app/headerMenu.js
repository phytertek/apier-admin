import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import IconButton from 'material-ui/IconButton';
import Menu, { MenuItem } from 'material-ui/Menu';
import { ListItemIcon } from 'material-ui/List';
import { appIcons } from './helpers';
import { openModal } from './index';

class HeaderMenu extends Component {
  constructor(props) {
    super(props);
  }
  state = {
    anchorEl: null,
    open: false
  };

  handleMenuOpen = event => {
    this.setState({
      open: !this.state.open,
      anchorEl: event.currentTarget
    });
  };

  handleMenuClose = () => {
    this.setState(() => ({ open: false }));
  };

  home = () => {
    this.props.history.push('/');
    this.handleMenuClose();
  };

  addComponent = () => {
    this.props.openModal('addComponentModal');
    this.handleMenuClose();
  };
  render() {
    return (
      <div>
        <IconButton onClick={this.handleMenuOpen}>{appIcons.menu}</IconButton>
        <Menu
          id="header-menu"
          anchorEl={this.state.anchorEl}
          open={this.state.open}
          onRequestClose={this.handleMenuClose}
        >
          <MenuItem onClick={this.home}>
            <ListItemIcon>{appIcons.home}</ListItemIcon>
            Home
          </MenuItem>
          <MenuItem onClick={this.addComponent}>
            <ListItemIcon>{appIcons.add}</ListItemIcon>
            Add Component
          </MenuItem>
        </Menu>
      </div>
    );
  }
}

export default connect(null, { openModal })(withRouter(HeaderMenu));
