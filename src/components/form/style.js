import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
  },
  padding: {
    padding: theme.spacing(2, 4, 3),
  },
  formControl: {
    width: "35ch"
  },
  margin: {
    marginBottom: theme.spacing(2)
  },
  submitButton: {
    marginTop: theme.spacing(2),
    width: '100%'
  }
}));
export default useStyles