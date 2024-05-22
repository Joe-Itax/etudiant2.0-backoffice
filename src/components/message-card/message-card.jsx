import { useState } from "react";
import { Link } from "react-router-dom";
import {
  styled,
  Card,
  CardHeader,
  CardContent,
  CardActions,
  Collapse,
  Avatar,
  IconButton,
  Typography,
  Tooltip,
} from "@mui/material";

import { red } from "@mui/material/colors";

import { ExpandMore, Edit } from "@mui/icons-material";
import BasicPopover from "../feedback/pop-over";

import PropTypes from "prop-types";

const ExpandMoreIcon = styled((props) => {
  const { ...other } = props;
  return (
    <Tooltip title="Voir le message" placement="top">
      <IconButton {...other} />
    </Tooltip>
  );
})(({ theme, expand }) => ({
  transform: !expand ? "rotate(0deg)" : "rotate(180deg)",
  marginLeft: "auto",
  transition: theme.transitions.create("transform", {
    duration: theme.transitions.duration.shortest,
  }),
}));

export default function MessageCard({ message, deleteMessage }) {
  const [expanded, setExpanded] = useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
            {`${message.firstname[0]}${message.lastname[0]}`}
          </Avatar>
        }
        action={
          <div aria-label="settings">
            {/* <MoreVert /> */}
            <BasicPopover
              anchorEl={anchorEl}
              handleClick={handleClick}
              handleClose={handleClose}
              textContent="Supprimer le message"
              deleteComment={deleteMessage}
            />
          </div>
        }
        title={`${message.firstname} ${message.lastname}`}
        subheader={`${
          message.createdAt.split("T")[0]
        }, ${message.createdAt.slice(11, 19)}`}
      />
      <CardContent>
        <Typography>
          Email:{" "}
          <Link
            target="_blank"
            className="text-red-600"
            to={`mailto:${message.email}`}
          >
            {message.email}
          </Link>
        </Typography>

        <Typography>Sujet: {message.sujet}</Typography>
      </CardContent>
      <CardActions disableSpacing>
        <Tooltip title="Répondre" placement="top">
          <IconButton aria-label="share">
            <Edit />
          </IconButton>
        </Tooltip>
        <Tooltip title="Voir le message" placement="top">
          <ExpandMoreIcon
            expand={expanded}
            onClick={handleExpandClick}
            aria-expanded={expanded}
            aria-label="show more"
          >
            <ExpandMore />
          </ExpandMoreIcon>
        </Tooltip>
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          <Typography paragraph>Message:</Typography>

          <Typography paragraph>{message.message}</Typography>
        </CardContent>
      </Collapse>
    </Card>
  );
}

MessageCard.propTypes = {
  message: PropTypes.object.isRequired,
  deleteMessage: PropTypes.func.isRequired,
};
