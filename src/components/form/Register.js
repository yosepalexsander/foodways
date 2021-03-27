import { forwardRef, Fragment, useContext, useState } from "react";
import { useMutation } from "react-query";
import { useHistory } from "react-router-dom";
import { Button, Link, Typography, Paper } from "@material-ui/core";
import { setAuthToken, userRegister } from "../../api/main";
import { FormikProvider, Form, useFormik } from "formik";
import { UserContext } from "../../logics/contexts/authContext";
import { RegisterSchema } from "./ValidationSchema";
import FormikInput from "./FormikInput";

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
  const history = useHistory();
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
      fullName: "",
      gender: "",
      phone: "",
      role: "",
    },
    validationSchema: RegisterSchema,
    onSubmit: (value) => {
      registerUser.mutate(JSON.stringify(value, null, 2))
    }
  });
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
  });

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
        <FormikProvider value={formik}>

          <Form
            id="register-modal-description"
            className="_form"
          >
            <FormikInput
              id="inputEmail"
              name="email"
              type="email"
              inputProps={{ "aria-label": "email", placeholder: "Email" }}
              required
            />
            <FormikInput
              id="inputPassword"
              name="password"
              type="password"
              inputProps={{ "aria-label": "password", placeholder: "Password" }}
              required
            />
            <FormikInput
              className={formik.touched.email}
              id="inputFullName"
              name="fullName"
              inputProps={{ "aria-label": "full name", placeholder: "Full Name" }}
              required
            />
            <FormikInput
              className={formik.touched.email}
              id="inputGender"
              name="gender"
              inputProps={{ "aria-label": "gender", placeholder: "Gender" }}
              required
            />
            <FormikInput
              className={formik.touched.email}
              id="inputPhone"
              name="phone"
              inputProps={{
                "aria-label": "phone",
                inputMode: "numeric",
                placeholder: "Phone"
              }}
              required
            />

            <FormikInput
              id="inputRole"
              className={formik.touched.email}
              select
              name="role"
              inputProps={{ "aria-label": "role", placeholder: "Role" }}
              SelectProps={{
                native: true,
              }}
              required
            >
              {roles.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </FormikInput>
            <Button
              fullWidth
              variant="contained"
              color="secondary"
              type="submit"
              disabled={formik.isValid ? false : true}
            >
              Register
          </Button>
          </Form>
        </FormikProvider>
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
