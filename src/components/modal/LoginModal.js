import { forwardRef } from "react";
import { Backdrop, Slide, Modal } from "@material-ui/core";
import Login from "../form/Login";

const styles = {
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
};

const LoginModal = forwardRef((props, ref) => {
  const { show, modalControl, switcher } = props;

  return (
    <div>
      <Modal
        disableEnforceFocus
        aria-labelledby="modal-title"
        aria-describedby="modal-description"
        sx={styles.modal}
        open={show}
        onClose={modalControl}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Slide in={show} direction="up">
          <Login switchForm={switcher} />
        </Slide>
      </Modal>
    </div>
  );
});

export default LoginModal;
