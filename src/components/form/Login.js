import PropTypes from "prop-types";
import { forwardRef, Fragment, useState, useContext } from "react";
import { useMutation } from "react-query";
import { useHistory } from "react-router-dom";
import { UserContext } from "../../logics/contexts/authContext";
import { setAuthToken, userLogin } from "../../api/main";
import CustomTextField from "./CustomTextField";

import {
  Button,
  IconButton,
  InputAdornment,
  Link,
  Paper,
  Typography,
} from "@material-ui/core";
import { Visibility, VisibilityOff } from "@material-ui/icons";
import { getLocation } from "../../api/mapApi";

const Login = forwardRef((props, ref) => {
  const { switchForm } = props;
  const { dispatch } = useContext(UserContext);
  const [values, setValues] = useState({
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const history = useHistory();

  const loginUser = useMutation(userLogin, {
    onSuccess: async ({ data }) => {
      setAuthToken(data.data.user.token);
      if (data.data.user.location) {
        const [lng, lat] = data.data.user.location.split(',')
        const locationData = await getLocation(lng, lat)
        return dispatch({
          type: "LOGIN_SUCCESS",
          payload: {
            ...data.data.user,
            location: {
              geolocation: data.data.user.location,
              name: locationData.features[0].place_name
            }
          }
        });
      }
      dispatch({
        type: "LOGIN_SUCCESS",
        payload: {
          ...data.data.user,
          location: {}
        }
      });
      data.data.user.role === "partner" ? history.push("/partner") : history.push("/")
    },
    onError: (error) => {
      alert("Error occured: ", error.message);
    }
  })
  const handleSubmit = async (event) => {
    event.preventDefault();
    loginUser.mutate(JSON.stringify(values, null, 2));
  };
  const handleChange = (event) => {
    setValues({ ...values, [event.target.name]: event.target.value });
  };

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };
  return (
    <Fragment>
      <Paper ref={ref} sx={{ p: 2, width: 416 }} elevation={2} tabIndex={-1}>
        <Typography
          id="login-modal-title"
          variant="h3"
          color="primary"
          sx={{ mb: 2 }}
        >
          Login
        </Typography>
        <form
          id="login-modal-description"
          className="_form"
          onSubmit={handleSubmit}
        >
          <CustomTextField
            id="inputEmail"
            name="email"
            type="email"
            value={values.email}
            onChange={handleChange}
            color="secondary"
            InputProps={{
              "aria-label": "email",
              placeholder: "Email"
            }}
            required
          />
          <CustomTextField
            id="inputPassword"
            name="password"
            type={showPassword ? "text" : "password"}
            value={values.password}
            onChange={handleChange}
            color="secondary"
            InputProps={{
              "aria-label": "password",
              placeholder: "Password",
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                    edge="end"
                  >
                    {showPassword ? <Visibility /> : <VisibilityOff />}
                  </IconButton>
                </InputAdornment>
              )
            }}
            required
          />
          <Button
            className="submitButton"
            variant="contained"
            color="secondary"
            type="submit"
            disabled={values.email || values.password ? false : true}
          >
            Login
          </Button>
        </form>
        <Typography variant="subtitle1" color="textSecondary" align="center">
          Don't have an account? Click{" "}
          <Link
            onClick={switchForm}
            color="textSecondary"
            variant="subtitle1"
            sx={{ cursor: "pointer", fontWeight: 800 }}
          >
            Here
          </Link>
        </Typography>
      </Paper>
    </Fragment>
  );
});

Login.propTypes = {
  switchForm: PropTypes.func
};
export default Login;
