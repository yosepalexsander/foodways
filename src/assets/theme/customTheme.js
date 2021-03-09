import { createMuiTheme } from '@material-ui/core/styles';

const theme = createMuiTheme({
  palette: {
    primary: {
      light: '#ffcd38',
      main: '#ffc107',
      dark: '#b28704',
      contrastText: '#fff',
    },
    secondary: {
      light: '#613D2B',
      main: '#433434',
      dark: '#972e0e',
      contrastText: '#fff',
    },
  },
})

export default theme;