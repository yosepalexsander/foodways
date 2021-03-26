import { Fragment } from "react";
import { Link } from "react-router-dom";
import { Grid, Typography } from "@material-ui/core";
import Loading from "../micro/Loading";
import empty_cart from "../../assets/images/empty_cart.png";
import order_success from "../../assets/images/order-success.png";

const CartEmpty = (props) => {
  const { isOrdered, isProcess } = props
  return (
    <Grid id="cart-empty" container direction="column" alignItems="center" justifyContent="center" spacing={3}>
      {isOrdered ? (
        <Fragment>
          <Grid item>
            <img src={order_success} alt="order success" className="image" />
          </Grid>
          <Grid item>
            <Typography variant="body1" textAlign="center" sx={{ fontFamily: "Cabin, sans-serif" }}>
              You order is success, check your transaction history in your profile {":)"}
            </Typography>
          </Grid>
        </Fragment>
      ) : isProcess ? (
        <Loading />
      )
        : (
          <Fragment>
            <Grid item>
              <img src={empty_cart} alt="empty cart" className="image" />
            </Grid>
            <Grid item>
              <Typography variant="h6" gutterBottom textAlign="center" sx={{ fontFamily: "Cabin, sans-serif" }}>
                You cart is empty, please go back to home and choose product that you want
              </Typography>
              <Typography variant="h6" textAlign="center" sx={{ fontFamily: "Cabin, sans-serif" }}>
                <Link to="/">Go Home</Link>
              </Typography>
            </Grid>

          </Fragment>
        )}
    </Grid>
  );
};

export default CartEmpty;
