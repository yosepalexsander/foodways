import { forwardRef, Fragment, useContext } from "react";
import { useMutation } from "react-query";
import { useHistory } from "react-router-dom";
import { Button, Link, Typography, Paper } from "@material-ui/core";
import { setAuthToken, userRegister } from "../../api/main";
import { getLocation } from "../../api/mapApi";
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
      role: "user",
    },
    validationSchema: RegisterSchema,
    onSubmit: (value) => {
      registerUser.mutate(JSON.stringify(value, null, 2))
    }
  });
  const registerUser = useMutation(formData => userRegister(formData), {
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
          sx={{ mb: 2 }}
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
            />
            <FormikInput
              id="inputPassword"
              name="password"
              type="password"
              inputProps={{ "aria-label": "password", placeholder: "Password" }}
            />
            <FormikInput
              className={formik.touched.email}
              id="inputFullName"
              name="fullName"
              inputProps={{ "aria-label": "full name", placeholder: "Full Name" }}
            />
            <FormikInput
              className={formik.touched.email}
              id="inputGender"
              name="gender"
              inputProps={{ "aria-label": "gender", placeholder: "Gender" }}
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
            />

            <FormikInput
              id="inputRole"
              className={formik.touched.email}
              select={true}
              name="role"
              inputProps={{ "aria-label": "role", placeholder: "Role" }}
              SelectProps={{
                native: true,
              }}
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
