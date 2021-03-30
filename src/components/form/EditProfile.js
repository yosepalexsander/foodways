import { useContext, useEffect, useState } from "react";
import { useMutation, useQueryClient } from "react-query";

import { UserContext } from "../../logics/contexts/authContext";
import {
  Button,
  Grid,
  Input,
  Typography,
} from "@material-ui/core";
import AttachFileIcon from "@material-ui/icons/AttachFile";
import { updateUser, getUserDetail } from "../../api/main";
import CustomMapIcon from "../icons/CustomMapIcon";

import MapboxModal from "../modal/MapboxModal";
import MapBoxSetLocation from "../map/MapBoxSetLocation";
import ToastAlert from "../micro/ToastAlert";
import CustomTextField from "./CustomTextField";

import "./styles.css"

const EditProfile = () => {
  const queryClient = useQueryClient();
  const { dispatch, state: { user: userContext } } = useContext(UserContext);
  const [values, setValues] = useState({
    ...user,
    image: null,
    location: userContext.location.name || userContext.location.geolocation
  });
  const [showMapbox, setMapboxModal] = useState(false);
  const [alertOpen, setAlertOpen] = useState(false);
  useEffect(() => {
    setValues({ ...values, location: userContext.location.name || values.location || "" })
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
      try {
        const { data } = await getUserDetail(user.id);
        dispatch({
          type: "EDIT_PROFILE",
          payload: {
            ...data.data.user,
            location: userContext.location || values.location
          }
        });
        setAlertOpen(true);
        queryClient.invalidateQueries(["userDetail", user.id]);
      } catch (error) {
        console.log(error)
      }
    },
    onError: (error) => {
      alert("ERROR: ", error.message)
    }
  })
  const handleSubmit = (event) => {
    event.preventDefault();
    if (values.image) {
      const formData = new FormData();
      formData.set("fullName", values.fullName);
      formData.set("location", userContext.location.geolocation || values.location || "");
      formData.set("phone", values.phone);
      formData.append("image", values.image, values.image.name);
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
                <CustomTextField
                  id="fullName"
                  name="fullName"
                  value={values.fullName}
                  onChange={handleChange}
                  color="secondary"
                  InputProps={{
                    "aria-label": "full name",
                    placeholder: user.role === "partner" ? "Nama Partner" : "Full Name"
                  }}
                />
              </Grid>
              <Grid item xs={4} sm={3} lg={2}>
                <Input
                  accept="image/*"
                  id="input-file"
                  name="image"
                  onChange={handleChange}
                  type="file"
                  sx={{ display: "none" }}
                  color="secondary"
                  inputProps={{ "aria-label": "image" }}
                />
                <label htmlFor="input-file">
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
              <CustomTextField
                id="email"
                name="email"
                value={values.email}
                disabled
                onChange={handleChange}
                color="secondary"
                InputProps={{ "aria-label": "email", placeholder: "Email" }}
              />
            </Grid>
            <Grid item>
              <CustomTextField
                id="phone"
                name="phone"
                value={values.phone}
                onChange={handleChange}
                inputMode="numeric"
                color="secondary"
                InputProps={{ "aria-label": "phone number", placeholder: "Phone" }}
              />
            </Grid>
            <Grid container item spacing={2} justifyContent="space-between">
              <Grid item xs={8} sm={9}>
                <CustomTextField
                  id="location"
                  name="location"
                  value={values.location}
                  onChange={handleChange}
                  color="secondary"
                  InputProps={{ "aria-label": "location", placeholder: "Location" }}
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
                >
                  <MapBoxSetLocation page="user" />
                </MapboxModal>
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
