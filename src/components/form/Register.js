import { forwardRef, Fragment, useState, useContext } from "react";
import { useMutation } from "react-query";
import { useHistory } from "react-router-dom";
import { Button, FormHelperText, InputBase, Link, NativeSelect, Typography, Paper } from "@material-ui/core";
import { setAuthToken, userRegister } from "../../api/main";
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
  const notValidPattern = {
    pass: /[A-Za-z0-9]{1,7}/,
    phone: /[0-9]{1,10}/,
  };
  const { dispatch } = useContext(UserContext);
  const [values, setValues] = useState({
    email: "",
    password: "",
    fullName: "",
    gender: "",
    phone: "",
    role: "",
  });
  const history = useHistory();
  const isNotValid = (values) => {
    if ((values.email.length < 10)
      || (values.password.length < 8)
      || (values.fullName.length < 8)
      || (values.phone.length < 11)
      || (!values.role)) return true
    return false
  }
  let disabled = isNotValid(values);

  const handleChange = (event) => {
    setValues({ ...values, [event.target.name]: event.target.value });
    disabled = isNotValid(values);
  };
  const registerUser = useMutation(formData => {
    return userRegister(formData);
  }, {
    onSuccess: ({ data }) => {
      dispatch({ type: "REGISTER", payload: data.data.user });
      if (data.data.user.role === "partner") return history.push("/partner");
      history.push("/");
      setAuthToken(data.data.user.token);
    },
    onError: (error) => {
      alert(error.response.data.message);
    }
  })
  const handleSubmit = (event) => {
    event.preventDefault();
    registerUser.mutate(JSON.stringify(values, null, 2))
  };
  return (
    <Fragment>
      <Paper ref={ref} sx={{ p: 2, width: 416 }} elevation={2} tabIndex={-1}>
        <Typography
          id="register-modal-title"
          variant="h3"
          color="primary"
          sx={{ mb: 1 }}
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
          {notValidPattern.pass.test(values.password) && (<span className="input-error">
            Password characther length must be 8 or more</span>)}
          <InputBase
            id="inputFullName"
            placeholder="Full Name"
            name="fullName"
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
            value={values.phone}
            onChange={handleChange}
            className={clsx("input", "input-margin")}
            inputProps={{
              "aria-label": "phone",
              inputMode: "numeric"
            }}
            required
          />
          {notValidPattern.phone.test(values.phone) && (<span className="input-error">
            Character must be 11 length or more with numeric value </span>)}
          <NativeSelect
            id="inputRole"
            placeholder="Role"
            value={values.role}
            name={"role"}
            onChange={handleChange}
            inputProps={{ "aria-label": "role" }}
            className={clsx("input", "input-margin")}
            required
            input={
              <InputBase />
            }>
            {roles.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </NativeSelect>
          <FormHelperText id="inputRole" component="span">Please select your role.</FormHelperText>
          <Button
            className="submitButton"
            variant="contained"
            color="secondary"
            type="submit"
            disabled={disabled}
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
