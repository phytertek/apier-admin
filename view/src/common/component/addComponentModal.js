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

const AddComponentModal = props => {
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
    if (!name) return alert('Component must have a name');
    createNewComponent(name);
    setSelectedComponent(name);
    history.push('/component');
    close();
  };
  const close = () => {
    closeModal('addComponentModal');
  };
  return (
    <Dialog open={isOpen} onRequestClose={close}>
      <DialogTitle>Add Component</DialogTitle>
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
    isOpen: state.app.currentOpenModal === 'addComponentModal'
  }),
  { closeModal, createNewComponent, setSelectedComponent }
)(withRouter(withResponsiveFullScreen()(AddComponentModal)));
