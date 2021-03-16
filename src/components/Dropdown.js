import { forwardRef, Fragment, useState } from "react";
import {
  Avatar,
  Divider,
  IconButton,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
} from "@material-ui/core";
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
  } = props;

  return (
    <Fragment>
      <IconButton
        ref={ref}
        aria-label="account of current user"
        aria-controls="menu-appbar"
        aria-haspopup="true"
        onClick={(event) => setAnchorEl(event.currentTarget)}
      >
        <Avatar variant="circular" alt="user photo" src={photoProfile} />
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
        autoFocus={false}
        disablePortal
        keepMounted
        onClose={() => setAnchorEl(null)}
      >
        <MenuItem onClick={userHandler}>
          <ListItemIcon>
            <ProfileIcon viewBox="0 0 40 40" color="inherit" />
          </ListItemIcon>
          <ListItemText primary="Profile" />
        </MenuItem>
        {isPartner && (
          <MenuItem onClick={addProductHandler}>
            <ListItemIcon>
              <AddProductIcon viewBox="0 0 40 40" color="inherit" />
            </ListItemIcon>
            <ListItemText primary="Add Product" />
          </MenuItem>
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
