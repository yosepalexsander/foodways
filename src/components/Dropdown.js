import { forwardRef, Fragment, useState } from "react";
import {
  Avatar,
  Divider,
  IconButton,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
  Slide,
} from "@material-ui/core";
import DashboardIcon from '@material-ui/icons/Dashboard';
import AddProductIcon from "./icons/AddProductIcon";
import ProfileIcon from "./icons/ProfileIcon";
import LogoutIcon from "./icons/LogoutIcon";

const Dropdown = forwardRef((props, ref) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const {
    photoProfile,
    isPartner,
    logoutHandler,
    userHandler,
    addProductHandler,
    dashboardHandler
  } = props;

  return (
    <Fragment>
      <IconButton
        aria-controls="menu-appbar"
        aria-haspopup="true"
        onClick={(event) => setAnchorEl(event.currentTarget)}
      >
        <Avatar variant="circular" alt="user photo" src={photoProfile || ""} />
      </IconButton>
      <Menu
        id="menu-appbar"
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        elevation={0}
        getContentAnchorEl={null}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "center",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
        TransitionComponent={Slide}
        disableAutoFocusItem
        disablePortal
        onClose={() => setAnchorEl(null)}
      >
        <MenuItem onClick={userHandler}>
          <ListItemIcon>
            <ProfileIcon viewBox="0 0 40 40" color="secondary" />
          </ListItemIcon>
          <ListItemText primary="Profile" />
        </MenuItem>
        {isPartner && (
          <div>
            <MenuItem onClick={dashboardHandler}>
              <ListItemIcon>
                <DashboardIcon color="secondary" />
              </ListItemIcon>
              <ListItemText primary="Dashboard" />
            </MenuItem>
            <MenuItem onClick={addProductHandler}>
              <ListItemIcon>
                <AddProductIcon viewBox="0 0 40 40" color="inherit" />
              </ListItemIcon>
              <ListItemText primary="Add Product" />
            </MenuItem>
          </div>
        )}
        <Divider />
        <MenuItem onClick={logoutHandler}>
          <ListItemIcon>
            <LogoutIcon viewBox="0 0 40 40" color="error" />
          </ListItemIcon>
          <ListItemText primary="Logout" />
        </MenuItem>
      </Menu>
    </Fragment>
  );
});

export default Dropdown;
