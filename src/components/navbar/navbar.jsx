import {
  AccountBalance,
  Chat,
  Home,
  Inbox,
  LibraryBooks,
  Mail,
  People,
} from "@mui/icons-material";
import {
  Divider,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Tooltip,
  Zoom,
} from "@mui/material";
import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav>
      <List>
        <ListItem disablePadding sx={{ display: "block" }}>
          {/* Home */}
          <Link className="home-link" to="/">
            <ListItemButton
              sx={{
                minHeight: 48,
                justifyContent: open ? "initial" : "center",
                px: 2.5,
              }}
            >
              <ListItemIcon
                sx={{
                  minWidth: 0,
                  mr: open ? 3 : "auto",
                  justifyContent: "center",
                }}
              >
                <Tooltip
                  title="Home"
                  TransitionComponent={Zoom}
                  placement="right"
                >
                  <Home />
                </Tooltip>
              </ListItemIcon>
              <ListItemText primary="Home" sx={{ opacity: open ? 1 : 0 }} />
            </ListItemButton>
          </Link>

          {/* Users */}
          <Link className="users-link" to="/users">
            <ListItemButton
              sx={{
                minHeight: 48,
                justifyContent: open ? "initial" : "center",
                px: 2.5,
              }}
            >
              <ListItemIcon
                sx={{
                  minWidth: 0,
                  mr: open ? 3 : "auto",
                  justifyContent: "center",
                }}
              >
                <Tooltip
                  title="Users"
                  TransitionComponent={Zoom}
                  placement="right"
                >
                  <People />
                </Tooltip>
              </ListItemIcon>
              <ListItemText primary="Users" sx={{ opacity: open ? 1 : 0 }} />
            </ListItemButton>
          </Link>

          {/* Ressources */}
          <Link className="resource-link" to="/resources">
            <ListItemButton
              sx={{
                minHeight: 48,
                justifyContent: open ? "initial" : "center",
                px: 2.5,
              }}
            >
              <ListItemIcon
                sx={{
                  minWidth: 0,
                  mr: open ? 3 : "auto",
                  justifyContent: "center",
                }}
              >
                <Tooltip
                  title="Resources"
                  TransitionComponent={Zoom}
                  placement="right"
                >
                  <LibraryBooks />
                </Tooltip>
              </ListItemIcon>
              <ListItemText
                primary="Resources"
                sx={{ opacity: open ? 1 : 0 }}
              />
            </ListItemButton>
          </Link>

          {/* Universities */}
          <Link className="universities-link" to="/universities">
            <ListItemButton
              sx={{
                minHeight: 48,
                justifyContent: open ? "initial" : "center",
                px: 2.5,
              }}
            >
              <ListItemIcon
                sx={{
                  minWidth: 0,
                  mr: open ? 3 : "auto",
                  justifyContent: "center",
                }}
              >
                <Tooltip
                  title="Universities"
                  TransitionComponent={Zoom}
                  placement="right"
                >
                  <AccountBalance />
                </Tooltip>
              </ListItemIcon>
              <ListItemText
                primary="Universities"
                sx={{ opacity: open ? 1 : 0 }}
              />
            </ListItemButton>
          </Link>

          {/* Message */}
          <Link className="message-link" to="/message">
            <ListItemButton
              sx={{
                minHeight: 48,
                justifyContent: open ? "initial" : "center",
                px: 2.5,
              }}
            >
              <ListItemIcon
                sx={{
                  minWidth: 0,
                  mr: open ? 3 : "auto",
                  justifyContent: "center",
                }}
              >
                <Tooltip
                  title="Messages"
                  TransitionComponent={Zoom}
                  placement="right"
                >
                  <Chat />
                </Tooltip>
              </ListItemIcon>
              <ListItemText primary="Messages" sx={{ opacity: open ? 1 : 0 }} />
            </ListItemButton>
          </Link>
        </ListItem>
      </List>
      <Divider />
      <List>
        {["All mail", "Trash", "Spam"].map((text, index) => (
          <ListItem key={text} disablePadding sx={{ display: "block" }}>
            <ListItemButton
              sx={{
                minHeight: 48,
                justifyContent: open ? "initial" : "center",
                px: 2.5,
              }}
            >
              <ListItemIcon
                sx={{
                  minWidth: 0,
                  mr: open ? 3 : "auto",
                  justifyContent: "center",
                }}
              >
                {index % 2 === 0 ? <Inbox /> : <Mail />}
              </ListItemIcon>
              <ListItemText primary={text} sx={{ opacity: open ? 1 : 0 }} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </nav>
  );
}
