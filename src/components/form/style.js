import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  form: {
    display: 'flex',
    flexDirection: 'column',
  },
  padding: {
    padding: theme.spacing(2, 4, 2),
  },
  formControl: {
    width: "35ch"
  },
  margin: {
    marginBottom: theme.spacing(2)
  },
  submitButton: {
    marginTop: theme.spacing(1),
    width: '100%'
  }
}));
export default useStyles