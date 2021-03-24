import { Backdrop, Modal, Slide } from "@material-ui/core";
import { forwardRef } from "react";
import MapBox from "../map/MapBox";

const MapboxModal = forwardRef((props, ref) => {
  const { show, modalControl, page } = props;
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
          <MapBox ref={ref} page={page} />
        </Slide>
      </Modal>
    </div>
  );
});

export default MapboxModal;
