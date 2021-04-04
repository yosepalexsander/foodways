import { Backdrop, Fade, Modal, Paper } from "@material-ui/core";

const styles = {
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  paper: {
    padding: "48px",
    maxWidth: "400px",
    textAlign: "center"
  }
};
const ConfirmModal = (props) => {
  const { children, show, modalControl } = props

  return (
    <Modal
      aria-labelledby="modal-title"
      aria-describedby="modal-description"
      open={show}
      sx={styles.modal}
      onClose={modalControl}
      closeAfterTransition
      disableEnforceFocus
      disableAutoFocus
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 500,
      }}
    >
      <Fade in={show}>
        <Paper sx={styles.paper} elevation={2} tabIndex={-1}>
          {children}
        </Paper>
      </Fade>
    </Modal>
  )
}

export default ConfirmModal;
