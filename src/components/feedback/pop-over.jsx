import { Popover, List, ListItem, ListItemText } from "@mui/material";

import { RiMore2Fill } from "@remixicon/react";
import PropTypes from "prop-types";

export default function BasicPopover({
  deleteComment,
  anchorEl,
  handleClick,
  handleClose,
}) {
  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  return (
    <div>
      <RiMore2Fill
        onClick={handleClick}
        aria-describedby={id}
        size={40}
        className="cursor-pointer hover:bg-slate-200 p-2 rounded-full"
      />
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
      >
        {/* <ul className="p-2">
          <li className="p-2">Supprimer le commentaire</li>
        </ul> */}
        <List>
          <ListItem
            className="cursor-pointer hover:bg-slate-200"
            onClick={deleteComment}
          >
            <ListItemText primary="Supprimer le commentaire" />
          </ListItem>
        </List>
      </Popover>
    </div>
  );
}

BasicPopover.propTypes = {
  deleteComment: PropTypes.func.isRequired,
  anchorEl: PropTypes.object,
  handleClick: PropTypes.func.isRequired,
  handleClose: PropTypes.func.isRequired,
};
