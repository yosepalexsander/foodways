import { Fragment } from "react";
import { Link } from "react-router-dom";
import { Grid, Typography } from "@material-ui/core";

const CartEmpty = () => {
  return (
    <Fragment>
      <Grid container direction="column" alignItems="center" spacing={3}>
        <Grid item>
          <Typography variant="h6" gutterBottom textAlign="center">
            You cart is empty please go back to home and choose one that you
            want {":)"}
          </Typography>
          <Grid item>
            <Typography variant="body1" gutterBottom textAlign="center">
              <Link to="/">go Home</Link>
            </Typography>
          </Grid>
        </Grid>
      </Grid>
    </Fragment>
  );
};

export default CartEmpty;
