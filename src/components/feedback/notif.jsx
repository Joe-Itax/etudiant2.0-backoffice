import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";

import PropTypes from "prop-types";

export default function CustomizedSnackbars({
  severity,
  message,
  open,
  setOpen,
}) {
  // const [open, setOpen] = React.useState(false);

  /*const handleClick = () => {
    setOpen(true);
  };*/

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  return (
    <div className="dd">
      {/* <Button onClick={handleClick}>Open Snackbar</Button> */}
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert
          onClose={handleClose}
          severity={severity}
          variant="filled"
          sx={{ width: "100%" }}
        >
          {message}
        </Alert>
      </Snackbar>
    </div>
  );
}

CustomizedSnackbars.propTypes = {
  severity: PropTypes.string.isRequired,
  message: PropTypes.string.isRequired,
  setOpen: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
};
