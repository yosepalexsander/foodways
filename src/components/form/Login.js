import { forwardRef, Fragment, useState, useContext } from "react";
import { useHistory } from "react-router-dom";
import { UserContext } from "../../logics/contexts/authContext";

import {
  Button,
  IconButton,
  InputAdornment,
  Link,
  Paper,
  TextField,
  Typography,
} from "@material-ui/core";
import { Visibility, VisibilityOff } from "@material-ui/icons";

import fakeData from "../../data/fakeData";

const Login = forwardRef((props, ref) => {
  const { switchForm } = props;
  const { users } = fakeData;
  const { dispatch } = useContext(UserContext);
  const [values, setValues] = useState({
    name: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const history = useHistory();
  const checkUser = () => {
    const user = users.find((user) => user.fullName === values.name);
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
      <Paper ref={ref} sx={{ p: [2, 4, 2] }} elevation={2} tabIndex={-1}>
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
          style={{ display: "flex", flexDirection: "column" }}
          onSubmit={handleSubmit}
        >
          <TextField
            id="inputUsername"
            sx={{ mb: 2, width: "350px" }}
            onChange={(e) => handleChange(e)}
            label="Username"
            value={values.name}
            name="name"
            type="text"
            variant="outlined"
          />
          <TextField
            id="inputPassword"
            sx={{ mb: 2, width: "350px" }}
            onChange={(e) => handleChange(e)}
            label="Password"
            value={values.password}
            name="password"
            type={showPassword ? "text" : "password"}
            variant="outlined"
            InputProps={{
              "aria-label": "password",
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
              ),
            }}
          />
          <Button
            sx={{ my: 2, width: "100%" }}
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
            variant="subtitle1"
            sx={{ cursor: "pointer" }}
          >
            Here
          </Link>
        </Typography>
      </Paper>
    </Fragment>
  );
});

export default Login;
