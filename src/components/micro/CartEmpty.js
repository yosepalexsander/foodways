import { Fragment } from "react";
import { Link } from "react-router-dom";
import { Grid, Typography } from "@material-ui/core";
import empty_cart from "../../assets/images/empty_cart.png";
const CartEmpty = ({ isOrdered }) => {
  return (
    <Fragment>
      <Grid container direction="column" alignItems="center" justifyContent="center">
        {isOrdered ? (
          <>
            <Grid item>
              <Typography variant="h6" gutterBottom textAlign="center">
                You order is success, check your transaction here {":)"}
              </Typography>
            </Grid>
          </>
        ) : (
          <>
            <Grid item>
              <img src={empty_cart} alt="empty cart" />
              <Typography variant="h6" gutterBottom textAlign="center">
                You cart is empty please go back to home and choose one that you
            want {":)"}
              </Typography>
            </Grid>
            <Grid item>
              <Typography variant="body1" gutterBottom textAlign="center">
                <Link to="/">Go Home</Link>
              </Typography>
            </Grid>

          </>
        )}
      </Grid>
    </Fragment>
  );
};

export default CartEmpty;
