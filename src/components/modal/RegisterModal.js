import { forwardRef } from "react";
import { Backdrop, Modal, Slide } from "@material-ui/core";
import Register from "../form/Register";

const styles = {
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    outline: 0,
  },
};

const RegisterModal = forwardRef((props, ref) => {
  const { show, modalControl, switcher } = props;
  return (
    <div>
      <Modal
        aria-labelledby="modal-title"
        aria-describedby="modal-description"
        sx={styles.modal}
        open={show}
        onClose={modalControl}
        disableAutoFocus
        disableEnforceFocus
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Slide in={show} direction="up" unmountOnExit>
          <Register switchForm={switcher} />
        </Slide>
      </Modal>
    </div>
  );
});

export default RegisterModal;
