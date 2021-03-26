import { useContext, useEffect, useState } from "react";
import { useMutation } from "react-query";
import { useLocation } from "react-router-dom";

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
import { updateUser, getUserDetail } from "../../api/main";
import ToastAlert from "../micro/ToastAlert";

import "./styles.css"

const EditProfile = () => {
  const location = useLocation();
  const user = location.state && location.state.user;
  const { dispatch, state: { user: userContext } } = useContext(UserContext);
  const [values, setValues] = useState({
    ...user,
    image: null,
    location: userContext.location.name || ""
  });
  const [showMapbox, setMapboxModal] = useState(false);
  const [alertOpen, setAlertOpen] = useState(false);
  console.log(userContext)
  useEffect(() => {
    setValues({ ...values, location: userContext.location.name || user.location || "" })
  }, [userContext.location])

  const handleChange = (e) => {
    setValues({
      ...values,
      [e.target.name]: e.target.type === "file"
        ? e.target.files[0] : e.target.value
    });
  };

  const editUser = useMutation(formData => {
    return updateUser(user.id, formData)
  }, {
    onSuccess: async () => {
      const response = await getUserDetail(user.id);
      console.log(response.data.data);
      dispatch({
        type: "EDIT_PROFILE",
        payload: {
          id: user.id,
          image: response.data.data.user.image,
          role: response.data.data.user.role,
          location: userContext.location || values.location
        }
      });
      setAlertOpen(true);
    },
    onError: (error) => {
      alert("ERROR: ", error)
    }
  })
  const handleSubmit = (event) => {
    event.preventDefault();
    if (values.image) {
      const formData = new FormData();
      formData.set("fullName", values.fullName);
      formData.set("location", userContext.location.geolocation || values.location);
      formData.set("phone", values.phone);
      formData.append("image", values.image);
      editUser.mutate(formData);
    } else {
      const body = {
        fullName: values.fullName,
        location: userContext.location.geolocation || values.location,
        phone: values.phone
      };

      editUser.mutate(JSON.stringify(body));
    }
  };

  return (
    <div>
      <Typography variant="h4" color="inherit" gutterBottom>
        Edit Profile {user.role === "partner" && <span>Partner</span>}
      </Typography>
      <form onSubmit={(e) => handleSubmit(e)}>
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
                  inputProps={{ "aria-label": "image" }}
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
                name="phone"
                value={values.phone}
                onChange={handleChange}
                inputMode="numeric"
                className="input"
                inputProps={{ "aria-label": "phone number" }}
              />
            </Grid>
            <Grid container item spacing={2} justifyContent="space-between">
              <Grid item xs={8} sm={9}>
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
                  type="button"
                  onClick={() => setMapboxModal(true)}
                  endIcon={<CustomMapIcon />}
                >
                  Select On Map
                </Button>
                <MapboxModal
                  show={showMapbox}
                  modalControl={() => setMapboxModal(false)}
                  page="user"
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
      <ToastAlert alertOpen={alertOpen} alertControl={() => setAlertOpen(false)}>
        Your profile has been updated
      </ToastAlert>
    </div>
  );
};

export default EditProfile;
