import React, { useState } from 'react'
import clsx from 'clsx'
import {
  Button,
  Container,
  FormControl,
  IconButton,
  InputLabel,
  InputAdornment,
  Modal,
  OutlinedInput,
  Paper,
  TextField,
  Typography,
} from '@material-ui/core';
import { Visibility, VisibilityOff } from '@material-ui/icons';
import useStyles from './style';

function Login() {
  const styles = useStyles();
  const [open, setOpen] = useState(false);
  const [values, setValues] = useState({
    username: '',
    password: '',
    showPassword: false,
  });

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };


  const handleSubmit = (event) => {
    event.preventDefault()
    localStorage.setItem("username", values.username)
    localStorage.setItem("password", values.password)
  }
  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };

  const handleClickShowPassword = () => {
    setValues({ ...values, showPassword: !values.showPassword });
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };
  return (
    <div>
      <Container>
        <Button variant="contained" color="primary" onClick={handleOpen}>
          Login
      </Button>
      </Container>
      <Modal
        disableEnforceFocus
        disableAutoFocus
        aria-labelledby="modal-title"
        aria-describedby="modal-description"
        className={styles.modal}
        open={open}
        onClose={handleClose}
      >

        <Paper
          className={styles.padding}
          elevation={2}
        >
          <Typography
            id="modal-title"
            variant="h3"
            color="primary"
            className={styles.margin}>Login</Typography>
          <form
            id="modal-description"
            className={styles.form}
            onSubmit={handleSubmit}>

            <TextField
              id="inputUsername"
              className={clsx(styles.margin, styles.formControl)}
              onChange={handleChange('username')}
              label="Username"
              value={values.username}
              type="text"
              variant="outlined"
            />
            <FormControl variant="outlined" className={clsx(styles.margin, styles.formControl)}>
              <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
              <OutlinedInput
                id="outlined-adornment-password"
                type={values.showPassword ? 'text' : 'password'}
                value={values.password}
                onChange={handleChange('password')}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                      edge="end"
                    >
                      {values.showPassword ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                  </InputAdornment>
                }
              />
            </FormControl>
            <Button
              className={clsx(styles.margin, styles.submitButton)}
              variant="contained"
              color="secondary"
              type="submit"
            >Login
              </Button>
          </form>
          <Typography variant="subtitle1" color="textSecondary" align="center">Don't have an account? Click
          <strong>Here</strong>
          </Typography>
        </Paper>
      </Modal>
    </div>

  )
}

export default Login;