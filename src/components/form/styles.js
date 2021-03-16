import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  input: {
    backgroundColor: "rgba(210,210,210,0.25)",
    padding: theme.spacing(1),
    border: "2px solid rgb(118,108,108)",
    borderRadius: 5,
    width: "100%",
    height: 47,
  },
  fileButton: {
    width: "100%",
    height: 47,
  },
  orderButton: {
    width: 260,
    height: 40,
  },
}));

export default useStyles;
