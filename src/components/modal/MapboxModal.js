import { Backdrop, Modal, Slide } from "@material-ui/core";
import { forwardRef } from "react";
import MapBox from "../map/MapBox";

const MapboxModal = forwardRef(({ children, ...props }, ref) => {
  const { show, modalControl } = props;
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
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Slide in={show} direction="up" unmountOnExit>
          <MapBox ref={ref}>{children}</MapBox>
        </Slide>
      </Modal>
    </div>
  );
});

export default MapboxModal;
