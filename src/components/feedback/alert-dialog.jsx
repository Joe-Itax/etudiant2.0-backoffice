import { forwardRef } from "react";

import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Slide,
} from "@mui/material";
import PropTypes from "prop-types";

const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function AlertDialog({
  open,
  handleClose,
  handleSubmitDeleteAccountReq,
}) {
  return (
    <>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>{"Supprimer mon compte"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            Vous êtes absolument sûr de vouloir supprimer votre compte ? Toutes
            les informations seront perdues, il n&apos;y a aucun moyen de
            revenir en arrière !
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} variant="contained">
            Non, annuler
          </Button>
          <Button
            onClick={handleSubmitDeleteAccountReq}
            variant="outlined"
            color="error"
          >
            Oui, Supprimer mon compte.
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

AlertDialog.propTypes = {
  open: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  handleSubmitDeleteAccountReq: PropTypes.func.isRequired,
};
