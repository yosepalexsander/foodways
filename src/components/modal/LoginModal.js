import { useState, forwardRef } from 'react';
import {useHistory} from 'react-router-dom';
import {
  Modal,
} from '@material-ui/core';
import Login from '../form/Login';

const styles = {
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
}

const LoginModal = forwardRef((props, ref) => {
  const [open, setOpen] = useState(true);
  const history = useHistory();
  const handleClose = () => {
    setOpen(false)
    history.push('/')
  }

  return (
    <div>
      <Modal
        disableEnforceFocus
        aria-labelledby="modal-title"
        aria-describedby="modal-description"
        sx={styles.modal}
        open={open}
        onClose={handleClose}
      >
        <Login />
      </Modal>
    </div>
  )
})

export default LoginModal;