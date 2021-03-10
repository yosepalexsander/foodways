import { useState, useEffect } from 'react';
import {
  Container,
  Button,
  Modal,
  Typography
} from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import Register from '../form/Register';

const styles = theme => ({
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    outline: 0
  }
});

const RegisterModal = (props) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const { classes } = props
  const [open, setOpen] = useState(false);

  // useEffect(() => {
  //   if (localStorage.getItem("username") !== null) {
  //     setIsLoggedIn(true)
  //   } else {
  //     handleOpen()
  //   }
  // }, [isLoggedIn])

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Container>
        {isLoggedIn ?
          <Typography variant="h2" color="primary">
            Welcome
      </Typography>
          :
          <Button variant="contained" color="primary" onClick={handleOpen}>
            Register
      </Button>
        }</Container>
      <Modal
        disableEnforceFocus
        aria-labelledby="modal-title"
        aria-describedby="modal-description"
        className={classes.modal}
        open={open}
        onClose={handleClose}
      >
          <Register />
      </Modal>
    </div>
  )
}

export default withStyles(styles)(RegisterModal);