import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import { withResponsiveFullScreen } from 'material-ui/Dialog';
import Button from 'material-ui/Button';
import TextField from 'material-ui/TextField';
import Dialog, {
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle
} from 'material-ui/Dialog';
import Input, { InputLabel } from 'material-ui/Input';
import { MenuItem } from 'material-ui/Menu';
import { FormControl, FormHelperText } from 'material-ui/Form';
import Select from 'material-ui/Select';
import { createNewComponent, setSelectedComponent } from '../index';
import { closeModal } from '../../app/index';

const styles = theme => ({
  formControl: {
    margin: theme.spacing.unit,
    minWidth: 120
  }
});

const AddRouteModal = props => {
  const {
    isOpen,
    selectedComponentName,
    closeModal,
    createNewComponent,
    setSelectedComponent,
    history
  } = props;
  let route = {
    root: '',
    type: '',
    route: ''
  };
  const handleChange = e => {
    console.log(e);
    route[e.target.name] = e.target.value;
  };
  const handleSelect = e => {
    route.type = e.target.value;
  };
  const save = () => {
    close();
  };
  const close = () => {
    closeModal();
  };
  return (
    <Dialog open={isOpen} onRequestClose={close}>
      <DialogTitle>Add Route</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          name="root"
          label="Root"
          defaultValue={`/${selectedComponentName}`}
          fullWidth
          onChange={handleChange}
        />
        <FormControl fullWidth>
          <InputLabel htmlFor="route-type">Type</InputLabel>
          <Select
            name="type"
            value={route.type}
            onChange={handleSelect}
            input={<Input id="route-type" name="type" fullWidth />}
          >
            <MenuItem value={'get'}>GET</MenuItem>
            <MenuItem value={'post'}>POST</MenuItem>
            <MenuItem value={'patch'}>PATCH</MenuItem>
            <MenuItem value={'delete'}>DELETE</MenuItem>
            <MenuItem value={'head'}>HEAD</MenuItem>
          </Select>
        </FormControl>
      </DialogContent>
      <DialogActions>
        <Button onClick={close}>Cancel</Button>
        <Button color="primary" onClick={save}>
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default connect(
  state => ({
    isOpen: state.app.currentOpenModal === 'addRouteModal',
    selectedComponentName: state.common.selectedComponent
  }),
  { closeModal, createNewComponent, setSelectedComponent }
)(withRouter(withResponsiveFullScreen()(AddRouteModal)));
