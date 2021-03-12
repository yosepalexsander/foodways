import { forwardRef, Fragment, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { Button, TextField, Typography, Paper } from "@material-ui/core";

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
      <Paper ref={ref} sx={{ p: [2, 4, 2] }} elevation={2} tabIndex={-1}>
        <Typography
          id="modal-title"
          variant="h3"
          color="primary"
          sx={{ mb: 2 }}
        >
          Register
        </Typography>
        <form
          id="modal-description"
          style={{ display: "flex", flexDirection: "column" }}
          onSubmit={handleSubmit}
        >
          <TextField
            id="inputEmail"
            sx={{ mb: 2, width: "35ch" }}
            onChange={handleChange}
            label="Email"
            name="email"
            value={values.email}
            type="email"
            variant="outlined"
          />
          <TextField
            id="inputPassword"
            sx={{ mb: 2, width: "35ch" }}
            onChange={handleChange}
            label="Password"
            name="password"
            value={values.password}
            type="password"
            variant="outlined"
          />
          <TextField
            id="inputFullName"
            sx={{ mb: 2, width: "35ch" }}
            onChange={handleChange}
            label="Full Name"
            name="fullName"
            value={values.fullName}
            type="text"
            variant="outlined"
          />
          <TextField
            id="inputGender"
            sx={{ mb: 2, width: "35ch" }}
            onChange={handleChange}
            label="Gender"
            name="gender"
            value={values.gender}
            type="text"
            variant="outlined"
          />
          <TextField
            id="inputPhone"
            sx={{ mb: 2, width: "35ch" }}
            onChange={handleChange}
            label="Phone"
            name="phoneNumber"
            value={values.phoneNumber}
            type="text"
            variant="outlined"
          />
          <TextField
            id="inputRole"
            select
            sx={{ mb: 2, width: "35ch" }}
            onChange={handleChange}
            label="Role"
            name="role"
            value={values.role}
            variant="outlined"
            helperText="Please select your role"
            SelectProps={{ native: true }}
          >
            {roles.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </TextField>
          <Button
            sx={{ my: 2, width: "100%" }}
            variant="contained"
            color="secondary"
            type="submit"
          >
            Register
          </Button>
        </form>
        <Typography variant="subtitle1" color="textSecondary" align="center">
          Already have an account? Click{" "}
          <strong>
            <Link to="/login">Here</Link>
          </strong>
        </Typography>
      </Paper>
    </Fragment>
  );
});

export default Register;
