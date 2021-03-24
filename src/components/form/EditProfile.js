import { useContext, useState } from "react";
import { UserContext } from "../../logics/contexts/authContext";
import {
  Button,
  Grid,
  Input,
  InputBase,
  Typography,
} from "@material-ui/core";
import AttachFileIcon from "@material-ui/icons/AttachFile";
import CustomMapIcon from "../icons/CustomMapIcon";
import MapboxModal from "../modal/MapboxModal";
import "./styles.css"

const EditProfile = () => {
  const {
    state: { user },
    dispatch,
  } = useContext(UserContext);
  const [values, setValues] = useState(user);
  const [showMapbox, setMapboxModal] = useState(false);
  const handleChange = (e) => {
    console.log(e.target.files[0])
    setValues({
      ...values,
      [e.target.name]: e.target.type === "file"
        ? e.target.files[0] : e.target.value
    });
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData()
    formData.set("fullName", values.fullName)
    formData.set("phoneNumber", values.phoneNumber)
    formData.append("image", values.image, values.image.name)
    // dispatch({
    //   type: "EDIT_PROFILE",
    //   payload: values,
    // });
  };

  return (
    <div>
      <Typography variant="h4" color="inherit" gutterBottom>
        Edit Profile {user.role === "partner" && <span>Partner</span>}
      </Typography>
      <form onSubmit={handleSubmit}>
        <Grid container>
          <Grid container item spacing={2} direction="column">
            <Grid container item spacing={2}>
              <Grid item xs={8} sm={9} lg={10}>
                <InputBase
                  placeholder={
                    user.role === "partner" ? "Nama Partner" : "Full Name"
                  }
                  name="fullName"
                  value={values.fullName}
                  onChange={handleChange}
                  className="input"
                  inputProps={{ "aria-label": "full name" }}
                />
              </Grid>
              <Grid item xs={4} sm={3} lg={2}>
                <Input
                  accept="image/*"
                  id="button-file"
                  name="image"
                  onChange={handleChange}
                  type="file"
                  sx={{ display: "none" }}
                />
                <label htmlFor="button-file">
                  <Button
                    className="fileButton"
                    variant="fileInput"
                    component="span"
                    endIcon={<AttachFileIcon />}
                  >
                    Attach Image
                  </Button>
                </label>
              </Grid>
            </Grid>
            <Grid item>
              <InputBase
                disabled
                placeholder="Email"
                name="email"
                onChange={handleChange}
                value={values.email}
                className="input"
                inputProps={{ "aria-label": "email" }}
              />
            </Grid>
            <Grid item>
              <InputBase
                placeholder="Phone"
                name="phoneNumber"
                value={values.phoneNumber}
                onChange={handleChange}
                inputMode="numeric"
                className="input"
                inputProps={{ "aria-label": "phone number" }}
              />
            </Grid>
            <Grid container item spacing={2}>
              <Grid item xs={8} sm={9} lg={10}>
                <InputBase
                  placeholder="location"
                  name="location"
                  value={values.location}
                  onChange={handleChange}
                  className="input"
                  inputProps={{ "aria-label": "location" }}
                />
              </Grid>
              <Grid item xs={4} sm={3} lg={2}>
                <Button
                  className="fileButton"
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
            <Grid container item justifyContent="flex-end" sx={{ mt: 8 }}>
              <Grid item>
                <Button
                  sx={{ width: 260, height: 40 }}
                  variant="contained"
                  color="secondary"
                  type="submit"
                >
                  Save
              </Button>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </form>
    </div>
  );
};

export default EditProfile;
