import { Fragment } from "react";
import { Grid } from "@material-ui/core";

import CartItem from "../micro/CartItem";

import "./styles.css";

const CartList = (props) => {
  const { cart, dispatchAction } = props;

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
        <hr className="divider" />
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
            <hr className="divider" />
          </div>
        ))}
      </Grid>
    </Fragment>
  );
};

export default CartList;
