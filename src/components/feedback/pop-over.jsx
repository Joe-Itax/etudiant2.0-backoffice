import { MoreVert } from "@mui/icons-material";
import {
  Popover,
  List,
  ListItem,
  ListItemText,
  IconButton,
  Tooltip,
} from "@mui/material";

import PropTypes from "prop-types";

export default function BasicPopover({
  deleteComment,
  anchorEl,
  handleClick,
  handleClose,
  textContent,
}) {
  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  return (
    <div>
      <Tooltip title="Voir plus" placement="top">
        <IconButton aria-label="settings" onClick={handleClick}>
          <MoreVert />
        </IconButton>
      </Tooltip>
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
        <List>
          <ListItem
            className="cursor-pointer hover:bg-slate-100"
            onClick={deleteComment}
          >
            <ListItemText primary={textContent} />
          </ListItem>
        </List>
      </Popover>
    </div>
  );
}

BasicPopover.propTypes = {
  deleteComment: PropTypes.func,
  anchorEl: PropTypes.object,
  handleClick: PropTypes.func,
  handleClose: PropTypes.func,
  textContent: PropTypes.string,
};
