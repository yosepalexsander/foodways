import { TextField } from "@material-ui/core";
import { experimentalStyled as styled } from '@material-ui/core/styles';

const CustomTextField = styled(TextField)({
  ' & .MuiFormHelperText-root': {
    marginLeft: 5
  },
  '& .MuiInput-underline:after': {
    borderBottomColor: 'rgb(118, 108, 108)',
  },
  '& .MuiOutlinedInput-root': {
    height: 47,
    '& fieldset': {
      borderWidth: 2,
      borderColor: 'rgb(118, 108, 108)',
      backgroundColor: "rgba(210, 210, 210, 0.25)",
      borderRadius: "5px"
    },
    '& input': {
      padding: '8px !important'
    },
  }
});

export default CustomTextField;