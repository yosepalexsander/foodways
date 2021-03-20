import { useContext, useState } from "react";
import { useLocation } from "react-router-dom";
import { Grid, makeStyles, Typography } from "@material-ui/core";

import { CartContext } from "../../logics/contexts/cartContext";
import { OrderContext } from "../../logics/contexts/orderContext";

import CartTotal from "../../components/micro/CartTotal";
import CartEmpty from "../../components/micro/CartEmpty";
import CartSearchLocation from "../../components/micro/CartSearchLocation";
import CartList from "../../components/micro/CartList";
import MapboxModal from "../../components/modal/MapboxModal";

const useStyles = makeStyles(
  (theme) => ({
    font: {
      fontSize: 18,
      fontFamily: "Cabin, sans-serif",
      color: theme.palette.secondary.main,
    },
    container: {
      marginTop: theme.spacing(2),
    },
    divider: {
      width: "100%",
      borderTop: `2px solid ${theme.palette.secondary.main}`,
      borderRadius: 2,
    },
  }),
  { name: "Cart" }
);

const Cart = () => {
  const classes = useStyles();
  const location = useLocation();
  const username = location.state && location.state.username;
  const { dispatch: orderDispatch } = useContext(OrderContext);
  const { state, dispatch: cartDispatch } = useContext(CartContext);
  const { currentRestaurant, carts } = state;
  const [show, setShow] = useState(false);
  const [isOrdered, setOrder] = useState(false);

  const totalAmount = carts.reduce((amount, item) => {
    const totalAmountPerProduct = item.price * item.qty;
    return amount + totalAmountPerProduct;
  }, 0);
  const totalQty = carts.reduce((qty, item) => {
    return qty + item.qty;
  }, 0);

  const submitTransaction = () => {
    const options = {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    };
    orderDispatch({
      type: "ORDER_PENDING",
      payload: {
        product: carts,
        total: totalAmount,
        date: new Date().toLocaleString("id-ID", options),
        restaurant: currentRestaurant,
        user: username,
      },
    });
    cartDispatch({
      type: "SUBMIT_CART",
      payload: { restaurant: "" },
    });
    setOrder(true)
  };
  console.log(isOrdered)
  return (
    <div>
      <div className={classes.container}>
        {carts.length <= 0 ? (
          <CartEmpty isOrdered={isOrdered} />
        ) : (
          <>
            <Typography variant="h4" color="inherit" gutterBottom>
              {currentRestaurant}
            </Typography>
            <p className={classes.font}>Delivery Location</p>
            <CartSearchLocation clickSearch={() => setShow(true)} />
            <p className={classes.font}>Review Your Order</p>
            <Grid container justifyContent="space-between">
              <CartList cart={carts} dispatchAction={cartDispatch} />
              <CartTotal
                total={totalAmount}
                qty={totalQty}
                submitOrder={submitTransaction}
              />
            </Grid>
            <MapboxModal show={show} modalControl={() => setShow(false)} />
          </>
        )}
      </div>
    </div>
  );
};

export default Cart;
