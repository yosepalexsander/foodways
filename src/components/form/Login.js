import { forwardRef, Fragment, useState, useContext } from "react";
import { useHistory } from "react-router-dom";
import { UserContext } from "../../logics/contexts/authContext";

import {
  Button,
  IconButton,
  InputBase,
  InputAdornment,
  Link,
  Paper,
  Typography,
} from "@material-ui/core";
import { Visibility, VisibilityOff } from "@material-ui/icons";
import clsx from "clsx";
import fakeData from "../../data/fakeData";
import "./styles.css";

const Login = forwardRef((props, ref) => {
  const { switchForm } = props;
  const { users } = fakeData;
  const { dispatch } = useContext(UserContext);
  const [values, setValues] = useState({
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const history = useHistory();
  const checkUser = () => {
    const user = users.find((user) => user.email === values.email);
    if (user) {
      dispatch({ type: "LOGIN", payload: user });
      user.role === "partner" && history.push("/partner");
    } else {
      alert("Username or Password Incorret");
    }
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    checkUser();
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
          <InputBase
            id="inputUsername"
            placeholder="Username"
            name="email"
            type="email"
            value={values.name}
            onChange={handleChange}
            className={clsx("input", "input-margin")}
            inputProps={{ "aria-label": "email" }}
            required
          />
          <InputBase
            id="inputPassword"
            placeholder="Password"
            name="password"
            type={showPassword ? "text" : "password"}
            value={values.password}
            onChange={handleChange}
            className={clsx("input", "input-width")}
            inputProps={{ "aria-label": "password" }}
            required
            endAdornment={
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
            }
          />
          <Button
            className="submitButton"
            variant="contained"
            color="secondary"
            type="submit"
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

export default Login;
