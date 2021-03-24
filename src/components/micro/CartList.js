import { Fragment } from "react";
import { Grid, makeStyles } from "@material-ui/core";

import CartItem from "../card/CartItem";
const useStyles = makeStyles(
  (theme) => ({
    divider: {
      width: "100%",
      borderTop: `2px solid ${theme.palette.secondary.main}`,
      borderRadius: 2,
    },
  }),
  { name: "CartList" }
);
const CartList = (props) => {
  const { cart, dispatchAction } = props;
  const classes = useStyles();

  /** Logic to handle product in cart context
   * @param  product
   */
  const incrementProduct = (product) => {
    dispatchAction({ type: "ADD_PRODUCT", payload: product });
  };

  const decrementProduct = (product) => {
    dispatchAction({ type: "REMOVE_PRODUCT", payload: product });
  };
  const removeProduct = (product) => {
    dispatchAction({ type: "REMOVE_CART", payload: product });
  };
  return (
    <Fragment>
      <Grid item container xs={7} direction="column">
        <hr className={classes.divider} />
        {cart.map((product) => (
          <div key={product.id}>
            <Grid container item>
              <CartItem
                item={product}
                incrementQty={incrementProduct}
                decrementQty={decrementProduct}
                removeItem={removeProduct}
              />
            </Grid>
            <hr className={classes.divider} />
          </div>
        ))}
      </Grid>
    </Fragment>
  );
};

export default CartList;
