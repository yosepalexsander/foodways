import { Button, Grid, InputBase } from "@material-ui/core";
import CustomMapIcon from "../../components/icons/CustomMapIcon";

import "./styles.css";

const CartSearchLocation = (props) => {
  const { clickSearch, location, handleChange } = props;

  return (
    <Grid id="cart-search-location" container spacing={2}>
      <Grid item flexGrow={1}>
        <InputBase
          className="searchInput"
          name="location"
          value={location}
          onChange={handleChange}
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
  );
};

export default CartSearchLocation;
