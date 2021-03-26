import { forwardRef } from "react";
import { Slide, Snackbar } from "@material-ui/core";
import MuiAlert from "@material-ui/core/Alert";

const Alert = forwardRef((props, ref) => {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const ToastAlert = (props) => {
  const { alertOpen, alertControl, children } = props;
  return (
    <div>
      <Snackbar
        anchorOrigin={{
          vertical: "top",
          horizontal: "center"
        }}
        TransitionComponent={Slide}
        TransitionProps={{ direction: "down" }}
        open={alertOpen}
        onClose={alertControl}
        autoHideDuration={3000}
      >
        <Alert severity="success" onClose={alertControl}>
          {children}
        </Alert>
      </Snackbar>
    </div>
  )
}

export default ToastAlert
