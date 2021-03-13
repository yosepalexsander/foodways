import { forwardRef, Fragment, useState } from "react";
import {
  Avatar,
  IconButton,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
  SvgIcon,
} from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
const CustomMenu = withStyles((theme) => ({
  paper: {
    borderRadius: "10px",
  },
}))((props) => (
  <Menu
    elevation={2}
    getContentAnchorEl={null}
    anchorOrigin={{
      vertical: "bottom",
      horizontal: "right",
    }}
    transformOrigin={{
      vertical: "top",
      horizontal: "right",
    }}
    {...props}
  />
));

const Dropdown = forwardRef((props, ref) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const { photoProfile, logout } = props;

  return (
    <Fragment>
      <IconButton
        ref={ref}
        aria-label="account of current user"
        aria-controls="menu-appbar"
        aria-haspopup="true"
        color="inherit"
        onClick={(event) => setAnchorEl(event.currentTarget)}
      >
        <Avatar variant="circular" alt="user photo" src={photoProfile} />
      </IconButton>
      <CustomMenu
        id="menu-appbar"
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        keepMounted
        getContentAnchorEl={null}
        onClose={() => setAnchorEl(null)}
      >
        <MenuItem>
          <ListItemIcon>
            <SvgIcon viewBox="0 0 40 40">
              <g clipPath="url(#clip0)">
                <path
                  d="M19.715 19.2682C22.3621 19.2682 24.6539 18.3188 26.5271 16.4456C28.3997 14.5728 29.3494 12.2812 29.3494 9.63379C29.3494 6.9873 28.4 4.69543 26.5268 2.82196C24.6536 0.949402 22.3618 0 19.715 0C17.0676 0 14.776 0.949402 12.9031 2.82227C11.0303 4.69513 10.0806 6.987 10.0806 9.63379C10.0806 12.2812 11.0303 14.5731 12.9031 16.4459C14.7766 18.3185 17.0685 19.2682 19.715 19.2682ZM14.5609 4.47968C15.9979 3.0426 17.6837 2.34406 19.715 2.34406C21.7459 2.34406 23.432 3.0426 24.8694 4.47968C26.3065 5.91705 27.0053 7.60315 27.0053 9.63379C27.0053 11.665 26.3065 13.3508 24.8694 14.7882C23.432 16.2256 21.7459 16.9241 19.715 16.9241C17.6843 16.9241 15.9985 16.2253 14.5609 14.7882C13.1235 13.3511 12.4246 11.665 12.4246 9.63379C12.4246 7.60315 13.1235 5.91705 14.5609 4.47968Z"
                  fill="#433434"
                />
                <path
                  d="M36.5726 30.7582C36.5186 29.9788 36.4093 29.1285 36.2485 28.2307C36.0861 27.3262 35.8771 26.4711 35.6268 25.6895C35.368 24.8817 35.0168 24.084 34.5819 23.3195C34.1312 22.5261 33.6014 21.8351 33.0069 21.2666C32.3853 20.6718 31.6241 20.1936 30.744 19.8448C29.8669 19.4978 28.895 19.322 27.8552 19.322C27.4469 19.322 27.052 19.4896 26.2894 19.9861C25.82 20.2922 25.271 20.6462 24.6582 21.0377C24.1342 21.3716 23.4244 21.6844 22.5476 21.9676C21.6922 22.2444 20.8237 22.3848 19.9661 22.3848C19.1092 22.3848 18.2407 22.2444 17.3846 21.9676C16.5088 21.6847 15.7986 21.3719 15.2756 21.038C14.6686 20.6501 14.1193 20.2961 13.6429 19.9858C12.8809 19.4893 12.486 19.3217 12.0776 19.3217C11.0376 19.3217 10.0659 19.4978 9.18915 19.8451C8.30963 20.1933 7.54822 20.6715 6.92596 21.2669C6.33148 21.8358 5.8017 22.5264 5.35126 23.3195C4.91699 24.084 4.56543 24.8814 4.30664 25.6898C4.0567 26.4714 3.84766 27.3262 3.6853 28.2307C3.52417 29.1273 3.41522 29.9778 3.36121 30.7591C3.30811 31.5229 3.28125 32.3179 3.28125 33.1212C3.28125 35.2092 3.94501 36.8995 5.25391 38.1462C6.54663 39.3763 8.25684 40.0001 10.3372 40.0001H29.5975C31.6772 40.0001 33.3875 39.3763 34.6805 38.1462C35.9897 36.9004 36.6534 35.2095 36.6534 33.1208C36.6531 32.3149 36.626 31.5199 36.5726 30.7582ZM33.0643 36.4479C32.2101 37.2609 31.076 37.6561 29.5972 37.6561H10.3372C8.85803 37.6561 7.724 37.2609 6.87012 36.4482C6.03241 35.6508 5.62531 34.5622 5.62531 33.1212C5.62531 32.3716 5.65002 31.6316 5.69946 30.9211C5.74768 30.2241 5.84625 29.4584 5.99243 28.6448C6.13678 27.8413 6.3205 27.0872 6.539 26.4045C6.74866 25.7499 7.03461 25.1017 7.38922 24.4774C7.72766 23.8823 8.11707 23.3717 8.54675 22.9603C8.94867 22.5755 9.45526 22.2606 10.0522 22.0244C10.6042 21.8058 11.2247 21.6862 11.8982 21.6682C11.9803 21.7119 12.1265 21.7952 12.3633 21.9496C12.8452 22.2636 13.4006 22.6219 14.0146 23.014C14.7067 23.4553 15.5984 23.8539 16.6638 24.1978C17.753 24.55 18.8638 24.7288 19.9664 24.7288C21.069 24.7288 22.1802 24.55 23.2687 24.1981C24.335 23.8536 25.2264 23.4553 25.9195 23.0134C26.5479 22.6118 27.0877 22.2639 27.5696 21.9496C27.8064 21.7955 27.9526 21.7119 28.0347 21.6682C28.7085 21.6862 29.3289 21.8058 29.8813 22.0244C30.4779 22.2606 30.9845 22.5758 31.3864 22.9603C31.8161 23.3714 32.2055 23.882 32.5439 24.4777C32.8989 25.1017 33.1851 25.7502 33.3945 26.4042C33.6133 27.0878 33.7973 27.8416 33.9413 28.6445C34.0872 29.4597 34.1861 30.2256 34.2343 30.9214V30.9221C34.2841 31.6298 34.3091 32.3695 34.3094 33.1212C34.3091 34.5625 33.902 35.6508 33.0643 36.4479Z"
                  fill="#433434"
                />
              </g>
              <defs>
                <clipPath id="clip0">
                  <rect width="40" height="40.0001" fill="white" />
                </clipPath>
              </defs>
            </SvgIcon>
          </ListItemIcon>
          <ListItemText primary="Profile" />
        </MenuItem>
        <MenuItem onClick={logout}>
          <ListItemIcon>
            <SvgIcon viewBox="0 0 40 40">
              <g clipPath="url(#clip0)">
                <path
                  d="M38.7489 18.7723H22.916C22.226 18.7723 21.666 18.2205 21.666 17.5405C21.666 16.8606 22.226 16.3087 22.916 16.3087H38.7489C39.4389 16.3087 39.9989 16.8606 39.9989 17.5405C39.9989 18.2205 39.4389 18.7723 38.7489 18.7723Z"
                  fill="#D20000"
                />
                <path
                  d="M32.4989 24.9314C32.1788 24.9314 31.859 24.8114 31.6155 24.5702C31.1272 24.0888 31.1272 23.3087 31.6155 22.8275L36.9821 17.539L31.6155 12.2503C31.1272 11.7691 31.1272 10.989 31.6155 10.5078C32.104 10.0264 32.8956 10.0264 33.3839 10.5078L39.6337 16.6669C40.122 17.1481 40.122 17.9282 39.6337 18.4094L33.3839 24.5684C33.1389 24.8114 32.819 24.9314 32.4989 24.9314Z"
                  fill="#D20000"
                />
                <path
                  d="M13.333 39.7132C12.9763 39.7132 12.6378 39.6638 12.2997 39.5604L2.26983 36.2673C0.905123 35.7976 0 34.5444 0 33.1436V3.5801C0 1.76847 1.49501 0.295166 3.33333 0.295166C3.68976 0.295166 4.02819 0.344487 4.36662 0.44794L14.3962 3.74099C15.7612 4.21074 16.666 5.4639 16.666 6.86473V36.4282C16.666 38.2399 15.1713 39.7132 13.333 39.7132ZM3.33333 2.75879C2.87497 2.75879 2.49992 3.12839 2.49992 3.5801V33.1436C2.49992 33.4933 2.73826 33.8184 3.07821 33.9351L13.0611 37.2134C13.1328 37.2363 13.2262 37.2495 13.333 37.2495C13.7914 37.2495 14.1661 36.8799 14.1661 36.4282V6.86473C14.1661 6.51498 13.9278 6.18988 13.5878 6.07319L3.60493 2.79488C3.53321 2.77202 3.43983 2.75879 3.33333 2.75879Z"
                  fill="#D20000"
                />
                <path
                  d="M25.4157 13.4346C24.7257 13.4346 24.1657 12.8827 24.1657 12.2028V4.81191C24.1657 3.68024 23.231 2.75879 22.0826 2.75879H3.33323C2.64325 2.75879 2.08327 2.20694 2.08327 1.52698C2.08327 0.847016 2.64325 0.295166 3.33323 0.295166H22.0826C24.6109 0.295166 26.6656 2.32032 26.6656 4.81191V12.2028C26.6656 12.8827 26.1056 13.4346 25.4157 13.4346Z"
                  fill="#D20000"
                />
                <path
                  d="M22.0827 34.7859H15.416C14.7261 34.7859 14.1661 34.2341 14.1661 33.5541C14.1661 32.8741 14.7261 32.3223 15.416 32.3223H22.0827C23.231 32.3223 24.1658 31.4008 24.1658 30.2692V22.8783C24.1658 22.1983 24.7257 21.6465 25.4157 21.6465C26.1057 21.6465 26.6657 22.1983 26.6657 22.8783V30.2692C26.6657 32.7607 24.611 34.7859 22.0827 34.7859Z"
                  fill="#D20000"
                />
              </g>
              <defs>
                <clipPath id="clip0">
                  <rect
                    width="40"
                    height="39.4192"
                    fill="white"
                    transform="translate(0 0.293945)"
                  />
                </clipPath>
              </defs>
            </SvgIcon>
          </ListItemIcon>
          <ListItemText primary="Logout" />
        </MenuItem>
      </CustomMenu>
    </Fragment>
  );
});

export default Dropdown;
