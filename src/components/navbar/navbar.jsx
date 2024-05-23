import { useContext } from "react";
import {
  AccountBalance,
  Chat,
  Home,
  LibraryBooks,
  Logout,
  People,
} from "@mui/icons-material";
import {
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Tooltip,
  Zoom,
} from "@mui/material";
import { Link } from "react-router-dom";
import axiosInstance from "../../utils/axios-instance";
import authAdminStatusContext from "../contexts/auth-admin.context";

export default function Navbar() {
  const { setAdminIsAuthenticated } = useContext(authAdminStatusContext);
  const logoutAdmin = async () => {
    try {
      const res = axiosInstance("/api/admin/auth/logout");
      console.log("logout: ", res);
      setAdminIsAuthenticated(false);
    } catch (error) {
      console.log("error lors du logout: ", error);
    }
  };
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

          {/* Logout */}
          <ListItemButton
            onClick={logoutAdmin}
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
                title="Logout"
                TransitionComponent={Zoom}
                placement="right"
              >
                <Logout />
              </Tooltip>
            </ListItemIcon>
            <ListItemText primary="Logout" sx={{ opacity: open ? 1 : 0 }} />
          </ListItemButton>
        </ListItem>
      </List>
    </nav>
  );
}
