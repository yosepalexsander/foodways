import { forwardRef } from "react";
import { Backdrop, Modal, Paper, Slide } from "@material-ui/core";

const styles = {
  paper: {
    position: "relative",
    mt: "10rem",
    mx: "auto",
    p: 2,
    width: "80%",
    height: "70%",
  }
};
const MapboxModal = forwardRef((props, ref) => {
  const { children, show, modalControl } = props;
  return (
    <div>
      <Modal
        aria-labelledby="modal-title"
        aria-describedby="modal-description"
        open={show}
        onClose={modalControl}
        disableEnforceFocus
        disableAutoFocus
        closeAfterTransition
        keepMounted
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Slide in={show} direction="up" unmountOnExit>
          <Paper sx={styles.paper} tabIndex={-1}>
            {children}
          </Paper>
        </Slide>
      </Modal>
    </div>
  );
});

export default MapboxModal;
