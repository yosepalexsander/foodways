import { useState } from 'react';
import clsx from 'clsx';
import {
  Button,
  TextField,
  Typography,
  Paper,
} from '@material-ui/core'

import useStyles from './style';

const roles = [
  {
    value: 'user',
    label: 'As User'
  },
  {
    value: 'partner',
    label: 'As Partner'
  }
];

const Register = () => {
  const styles = useStyles()
  const [values, setValues] = useState({
    email: '',
    password: '',
    fullName: '',
    gender: '',
    phoneNumber: '',
    role: ''
  })
  const handleSubmit = (event) => {
    event.preventDefault()
    localStorage.setItem("new user data", JSON.stringify(values,2,null))
    setValues({
      email: '',
      password: '',
      fullName: '',
      gender: '',
      phoneNumber: '',
      role: ''
    })
  }
  const handleChange = (prop, event) => {
    setValues({ ...values, [prop]: event.target.value });
  };
  return (
    <>
      <Paper
        ref={ref}
        className={styles.padding}
        elevation={2}
        tabIndex={-1}>
        <Typography
          id="modal-title"
          variant="h3"
          color="primary"
          className={styles.margin}
        >
          Register
        </Typography>
        <form
          id="modal-description"
          className={styles.form}
          onSubmit={handleSubmit}>
          <TextField
            id="inputEmail"
            className={clsx(styles.margin, styles.formControl)}
            onChange={(e) => handleChange('email', e)}
            label="Email"
            value={values.email}
            type="email"
            variant="outlined"
          />
          <TextField
            id="inputPassword"
            className={clsx(styles.margin, styles.formControl)}
            onChange={(e) => handleChange('password', e)}
            label="Password"
            value={values.password}
            type='password'
            variant="outlined"
          />
          <TextField
            id="inputFullName"
            className={clsx(styles.margin, styles.formControl)}
            onChange={(e) => handleChange('fullName', e)}
            label="Full Name"
            value={values.fullName}
            type="text"
            variant="outlined"
          />
          <TextField
            id="inputGender"
            className={clsx(styles.margin, styles.formControl)}
            onChange={(e) => handleChange('gender', e)}
            label="Gender"
            value={values.gender}
            type="text"
            variant="outlined"
          />
          <TextField
            id="inputPhone"
            className={clsx(styles.margin, styles.formControl)}
            onChange={(e) => handleChange('phoneNumber', e)}
            label="Phone"
            value={values.phoneNumber}
            type="text"
            variant="outlined"
          />
          <TextField
            id="inputRole"
            select
            className={clsx(styles.margin, styles.formControl)}
            onChange={(e) => handleChange('role', e)}
            label="Role"
            value={values.role}
            variant="outlined"
            helperText="Please select your role"
            SelectProps={{ native: true }}
          >
            {roles.map(option => (
              <option
                key={option.value}
                value={option.value}>
                {option.label}
              </option>
            ))}
          </TextField>
          <Button
            className={clsx(styles.margin, styles.submitButton)}
            variant="contained"
            color="secondary"
            type="submit"
          >Register
          </Button>
        </form>
        <Typography variant="subtitle1" color="textSecondary" align="center">Already have an account? Click <strong><a href="/">Here</a></strong>
        </Typography>
      </Paper>
    </>
  )
}

export default Register
