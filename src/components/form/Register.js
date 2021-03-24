import { forwardRef, Fragment, useState, useContext } from "react";
import { useHistory } from "react-router-dom";
import { Button, InputBase, Link, NativeSelect, Typography, Paper } from "@material-ui/core";

import { UserContext } from "../../logics/contexts/authContext";

import clsx from "clsx";
import "./styles.css";

const roles = [
  {
    value: "user",
    label: "As User",
  },
  {
    value: "partner",
    label: "As Partner",
  },
];

const Register = forwardRef((props, ref) => {
  const { switchForm } = props;
  const { dispatch } = useContext(UserContext);
  const [values, setValues] = useState({
    email: "",
    password: "",
    fullName: "",
    gender: "",
    phoneNumber: "",
    role: "",
  });
  const history = useHistory();
  const handleSubmit = (event) => {
    event.preventDefault();
    localStorage.setItem("user data", JSON.stringify(values, 2, null));
    // dispatch({ type: "REGISTER", payload: values });
    setValues({
      email: "",
      password: "",
      fullName: "",
      gender: "",
      phoneNumber: "",
      role: "",
    });

    history.push("/");
  };
  const handleChange = (event) => {
    setValues({ ...values, [event.target.name]: event.target.value });
  };
  return (
    <Fragment>
      <Paper ref={ref} sx={{ p: 2, width: 416 }} elevation={2} tabIndex={-1}>
        <Typography
          id="register-modal-title"
          variant="h3"
          color="primary"
          sx={{ mb: 2 }}
        >
          Register
        </Typography>
        <form
          id="register-modal-description"
          className="_form"
          onSubmit={handleSubmit}
        >
          <InputBase
            id="inputEmail"
            placeholder="Email"
            name="email"
            type="email"
            value={values.email}
            onChange={handleChange}
            className={clsx("input", "input-margin")}
            inputProps={{ "aria-label": "email" }}
            required
          />
          <InputBase
            id="inputPassword"
            placeholder="Password"
            name="password"
            type="password"
            value={values.password}
            onChange={handleChange}
            className={clsx("input", "input-margin")}
            inputProps={{ "aria-label": "password" }}
            required
          />
          <InputBase
            id="inputFullName"
            placeholder="Full Name"
            name="full name"
            value={values.fullName}
            onChange={handleChange}
            className={clsx("input", "input-margin")}
            inputProps={{ "aria-label": "full name" }}
            required
          />
          <InputBase
            id="inputGender"
            placeholder="Gender"
            name="gender"
            value={values.gender}
            onChange={handleChange}
            className={clsx("input", "input-margin")}
            inputProps={{ "aria-label": "gender" }}
            required
          />
          <InputBase
            id="inputPhone"
            placeholder="Phone"
            name="phone"
            value={values.phoneNumber}
            inputMode="numeric"
            onChange={handleChange}
            className={clsx("input", "input-margin")}
            inputProps={{ "aria-label": "phone" }}
            required
          />
          <NativeSelect
            id="inputRole"
            placeholder="Role"
            value={values.role}
            name={"role"}
            onChange={handleChange}
            inputProps={{ "aria-label": "phone" }}
            className={clsx("input", "input-margin")}
            required
            input={
              <InputBase
                helperText="Please select your role"
              />
            }>
            {roles.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}

          </NativeSelect>
          <Button
            className="submitButton"
            variant="contained"
            color="secondary"
            type="submit"
          >
            Register
          </Button>
        </form>
        <Typography variant="subtitle1" color="textSecondary" align="center">
          Already have an account? Click{" "}
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

export default Register;
