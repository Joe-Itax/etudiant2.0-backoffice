import { Box, Alert, IconButton, Collapse } from "@mui/material";
import { CloseRounded } from "@mui/icons-material";
import PropTypes from "prop-types";

export default function TransitionAlerts({
  open,
  handleCloseAlert,
  severity,
  message,
}) {
  return (
    <Box sx={{ width: "100%", zIndex: 55 }}>
      <Collapse in={open}>
        <Alert
          variant="filled"
          severity={severity || "info"}
          action={
            <IconButton
              aria-label="close"
              color="inherit"
              size="small"
              onClick={handleCloseAlert}
            >
              <CloseRounded fontSize="inherit" />
            </IconButton>
          }
          sx={{ mb: 2 }}
        >
          {message}
        </Alert>
      </Collapse>
    </Box>
  );
}

TransitionAlerts.propTypes = {
  open: PropTypes.bool.isRequired,
  handleCloseAlert: PropTypes.func.isRequired,
  severity: PropTypes.string,
  message: PropTypes.string,
};
