import { Backdrop, Modal, Slide } from "@material-ui/core";
import { forwardRef } from "react";
import MapBox from "./MapBox";

const MapboxModal = forwardRef((props, ref) => {
  return (
    <div>
      <Modal
        aria-labelledby="modal-title"
        aria-describedby="modal-description"
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Slide in={open} direction="up">
          <MapBox ref={ref} />
        </Slide>
      </Modal>
    </div>
  );
});

export default MapboxModal;
