import PropTypes from "prop-types";
import { forwardRef, Fragment, useState } from "react";
import {
  Avatar,
  Divider,
  Grow,
  IconButton,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
} from "@material-ui/core";
import DashboardIcon from '@material-ui/icons/Dashboard';
import AddProductIcon from "../icons/AddProductIcon";
import ProfileIcon from "../icons/ProfileIcon";
import LogoutIcon from "../icons/LogoutIcon";

import avatar_default from "../../assets/images/avatar_default.jpeg";

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
  const imgUrlArr = photoProfile.split('/')
  const userPhoto = imgUrlArr[imgUrlArr.length - 1] !== "null" ? photoProfile : avatar_default;

  return (
    <Fragment>
      <IconButton
        aria-controls="menu-appbar"
        aria-haspopup="true"
        onClick={(event) => setAnchorEl(event.currentTarget)}
      >
        <Avatar variant="circular" alt="user photo" src={userPhoto} />
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
        TransitionComponent={Grow}
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


Dropdown.propTypes = {
  photoProfile: PropTypes.string,
  isPartner: PropTypes.bool,
  logoutHandler: PropTypes.func.isRequired,
  userHandler: PropTypes.func.isRequired,
  addProductHandler: PropTypes.func.isRequired,
  dashboardHandler: PropTypes.func.isRequired
}
export default Dropdown;
