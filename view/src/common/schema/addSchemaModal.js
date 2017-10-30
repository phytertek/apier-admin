import React from 'react';
import { connect } from 'react-redux';
import { withResponsiveFullScreen } from 'material-ui/Dialog';
import { withRouter } from 'react-router-dom';
import Button from 'material-ui/Button';
import TextField from 'material-ui/TextField';
import Dialog, {
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle
} from 'material-ui/Dialog';
import { createNewComponent, setSelectedComponent } from '../index';
import { closeModal } from '../../app/index';

const AddSchemaModal = props => {
  const {
    isOpen,
    closeModal,
    createNewComponent,
    setSelectedComponent,
    history
  } = props;
  let name;
  const handleChange = e => {
    name = e.target.value;
  };
  const save = () => {
    close();
  };
  const close = () => {
    closeModal();
  };
  return (
    <Dialog open={isOpen} onRequestClose={close}>
      <DialogTitle>Add Schema</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          name="name"
          label="Name"
          fullWidth
          onChange={handleChange}
        />
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
    isOpen: state.app.currentOpenModal === 'addSchemaModal'
  }),
  { closeModal, createNewComponent, setSelectedComponent }
)(withRouter(withResponsiveFullScreen()(AddSchemaModal)));
