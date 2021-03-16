import { useContext, useState } from "react";
import { UserContext } from "../../logics/contexts/authContext";
import {
  Button,
  Grid,
  Input,
  InputBase,
  makeStyles,
  Typography,
} from "@material-ui/core";
import AttachFileIcon from "@material-ui/icons/AttachFile";
import CustomMapIcon from "../icons/CustomMapIcon";
import MapboxModal from "../modal/MapboxModal";
import useStyles from "./styles";

const EditProfile = () => {
  const classes = useStyles();
  const {
    state: { user },
    dispatch,
  } = useContext(UserContext);
  const [values, setValues] = useState(user);
  const [showMapbox, setMapboxModal] = useState(false);
  const handleChange = (event) => {
    setValues({ ...values, [event.target.name]: event.target.value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch({
      type: "EDIT_PROFILE",
      payload: values,
    });
  };
  console.log(user);
  return (
    <div>
      <Typography variant="h4" color="inherit" gutterBottom>
        Edit Profile {user.role === "partner" && <span>Partner</span>}
      </Typography>
      <form onSubmit={handleSubmit}>
        <Grid container>
          <Grid container item spacing={2} direction="column">
            <Grid container item spacing={2}>
              <Grid item flexGrow={1}>
                <InputBase
                  placeholder={
                    user.role === "partner" ? "Nama Partner" : "Full Name"
                  }
                  name="fullName"
                  value={values.fullName}
                  onChange={handleChange}
                  className={classes.input}
                  inputProps={{ "aria-label": "full name" }}
                />
              </Grid>
              <Grid item xs={2}>
                <Input
                  accept="image/*"
                  id="icon-button-file"
                  type="file"
                  sx={{ display: "none" }}
                />
                <label htmlFor="icon-button-file">
                  <Button
                    className={classes.fileButton}
                    variant="fileInput"
                    component="span"
                    endIcon={<AttachFileIcon fontSize="medium" />}
                  >
                    Attach Image
                  </Button>
                </label>
              </Grid>
            </Grid>
            <Grid item>
              <InputBase
                placeholder="Email"
                name="email"
                onChange={handleChange}
                value={values.email}
                className={classes.input}
                inputProps={{ "aria-label": "full name" }}
              />
            </Grid>
            <Grid item>
              <InputBase
                placeholder="Phone"
                name="phoneNumber"
                value={values.phoneNumber}
                onChange={handleChange}
                className={classes.input}
                inputProps={{ "aria-label": "full name" }}
              />
            </Grid>
            <Grid container item spacing={2}>
              <Grid item flexGrow={1}>
                <InputBase
                  placeholder="location"
                  name="location"
                  value={values.location}
                  onChange={handleChange}
                  className={classes.input}
                  inputProps={{ "aria-label": "full name" }}
                />
              </Grid>
              <Grid item xs={2}>
                <Button
                  className={classes.fileButton}
                  color="secondary"
                  variant="contained"
                  onClick={() => setMapboxModal(true)}
                  endIcon={<CustomMapIcon />}
                >
                  Location
                </Button>
                <MapboxModal
                  show={showMapbox}
                  modalControl={() => setMapboxModal(false)}
                />
              </Grid>
            </Grid>
          </Grid>
          <Grid container justifyContent="flex-end" sx={{ mt: 8 }}>
            <Grid item>
              <Button
                sx={{ width: 260, height: 40, float: "right" }}
                variant="contained"
                color="secondary"
                type="submit"
              >
                Save
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </form>
    </div>
  );
};

export default EditProfile;
