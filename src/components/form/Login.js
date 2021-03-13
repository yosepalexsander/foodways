import { forwardRef, Fragment, useState, useContext } from "react";
import { UserContext } from "../../logics/contexts/authContext";

import {
  Button,
  FormControl,
  IconButton,
  InputLabel,
  InputAdornment,
  Link,
  OutlinedInput,
  Paper,
  TextField,
  Typography,
} from "@material-ui/core";
import { Visibility, VisibilityOff } from "@material-ui/icons";

import fakeData from "../../data/fakeData";

const Login = forwardRef((props, ref) => {
  const { switchForm } = props;
  const { dispatch } = useContext(UserContext);
  const { users } = fakeData;
  const [values, setValues] = useState({
    name: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);

  const checkUser = () => {
    const user = users.find((user) => user.fullName === values.name);
    if (user) {
      dispatch({ type: "LOGIN", payload: user });
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
    setShowPassword(!values.showPassword);
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };
  return (
    <Fragment>
      <Paper ref={ref} sx={{ p: [2, 4, 2] }} elevation={2} tabIndex={-1}>
        <Typography
          id="modal-title"
          variant="h3"
          color="primary"
          sx={{ mb: 2 }}
        >
          Login
        </Typography>
        <form
          id="modal-description"
          style={{ display: "flex", flexDirection: "column" }}
          onSubmit={handleSubmit}
        >
          <TextField
            id="inputUsername"
            sx={{ mb: 2, width: "35ch" }}
            onChange={(e) => handleChange(e)}
            label="Username"
            value={values.uname}
            name="name"
            type="text"
            variant="outlined"
          />
          <FormControl variant="outlined" sx={{ mb: 2, width: "35ch" }}>
            <InputLabel htmlFor="outlined-adornment-password">
              Password
            </InputLabel>
            <OutlinedInput
              id="outlined-adornment-password"
              type={showPassword ? "text" : "password"}
              value={values.password}
              name="password"
              onChange={(e) => handleChange(e)}
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
          </FormControl>
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
          <Link onClick={switchForm} variant="text">
            Here
          </Link>
        </Typography>
      </Paper>
    </Fragment>
  );
});

export default Login;
