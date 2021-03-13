import { forwardRef } from "react";
import { Modal } from "@material-ui/core";
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
        keepMounted
        onClose={modalControl}
      >
        <Register switchForm={switcher} />
      </Modal>
    </div>
  );
});

export default RegisterModal;
