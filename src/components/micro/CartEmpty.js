import { Fragment } from "react";
import { Link } from "react-router-dom";
import { Grid, Typography } from "@material-ui/core";
import SentimentVeryDissatisfiedIcon from '@material-ui/icons/SentimentVeryDissatisfied';
import empty_cart from "../../assets/images/empty_cart.png";
import order_success from "../../assets/images/order-success.png";
const CartEmpty = ({ isOrdered }) => {
  return (
    <Fragment>
      <Grid container direction="column" alignItems="center" justifyContent="center" spacing={3}>
        {isOrdered ? (
          <>
            <Grid item>
              <img src={order_success} alt="order success" className="cart__image" />
            </Grid>
            <Grid item>
              <Typography variant="body1" textAlign="center" sx={{ fontFamily: "Cabin, sans-serif" }}>
                You order is success, check your transaction history in your profile {":)"}
              </Typography>
            </Grid>

          </>
        ) : (
          <>
            <Grid item>
              <img src={empty_cart} alt="empty cart" className="cart__image" />
            </Grid>
            <Grid item>
              <Typography variant="h6" gutterBottom textAlign="center" sx={{ fontFamily: "Cabin, sans-serif" }}>
                You cart is empty <span><SentimentVeryDissatisfiedIcon color="secondary" /></span>
                , please go back to home and choose one that you want
              </Typography>
              <Typography variant="h6" textAlign="center" sx={{ fontFamily: "Cabin, sans-serif" }}>
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
