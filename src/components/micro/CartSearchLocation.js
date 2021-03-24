import { forwardRef, Fragment } from "react";
import { Button, Grid, InputBase, makeStyles } from "@material-ui/core";
import CustomMapIcon from "../../components/icons/CustomMapIcon";
import "./styles.css"
const useStyles = makeStyles(
  (theme) => ({
    searchInput: {
      backgroundColor: "#fff",
      padding: theme.spacing(1),
      borderRadius: 5,
      width: "100%",
      height: 47,
    },
    searchButton: {
      width: "100%",
      height: 47,
    },
  }),
  { name: "SearchLocation" }
);
const CartSearchLocation = forwardRef((props, ref) => {
  const { clickSearch } = props;
  const classes = useStyles();
  return (
    <Fragment>
      <Grid container spacing={2}>
        <Grid item flexGrow={1}>
          <InputBase
            className="searchInput"
            name="location"
            value={ref.current}
            placeholder="Search Location..."
            inputProps={{ "aria-label": "search" }}
          />
        </Grid>
        <Grid item xs={3}>
          <Button
            variant="contained"
            color="secondary"
            className="searchButton"
            onClick={clickSearch}
            endIcon={<CustomMapIcon />}
          >
            Select On Map
          </Button>
        </Grid>
      </Grid>
    </Fragment>
  );
});

export default CartSearchLocation;
