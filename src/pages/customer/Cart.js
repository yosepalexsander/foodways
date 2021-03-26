import { useContext, useState, useEffect } from "react";
import { useMutation } from "react-query";
// import { useLocation } from "react-router-dom";
import { Grid, makeStyles, Typography } from "@material-ui/core";

import { CartContext } from "../../logics/contexts/cartContext";
import CartList from "../../components/macro/CartList";
import CartEmpty from "../../components/micro/CartEmpty";
import CartTotal from "../../components/micro/CartTotal";
import CartSearchLocation from "../../components/micro/CartSearchLocation";
import MapboxModal from "../../components/modal/MapboxModal";

import { createTransaction } from "../../api/main";

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
  const { state, dispatch: cartDispatch } = useContext(CartContext);
  const { restaurantId, carts, location: userLocation } = state;
  const [show, setShow] = useState(false);
  const [isOrdered, setIsOrdered] = useState(false);
  const [location, setLocation] = useState(userLocation.name || "");

  useEffect(() => {
    setLocation(userLocation.name)
  }, [userLocation.name]);

  const makeTransaction = useMutation(createTransaction, {
    onSuccess: () => {
      setIsOrdered(true)
    },
    onError: (error) => {
      alert("Oopss, error occured: ", error)
    }
  })
  const totalAmount = carts.reduce((amount, item) => {
    const totalAmountPerProduct = item.price * item.qty;
    return amount + totalAmountPerProduct;
  }, 0);
  const totalQty = carts.reduce((qty, item) => {
    return qty + item.qty;
  }, 0);

  const submitTransaction = () => {
    const body = {
      restaurant_id: restaurantId,
      products: carts.map(product => ({
        id: product.id,
        qty: product.qty
      }))
    }

    makeTransaction.mutate(JSON.stringify(body, null, 2))
    cartDispatch({
      type: "SUBMIT_CART",
      payload: { restaurantId: null, location: "" },
    });
  };
  return (
    <div>
      <div className={classes.container}>
        {carts.length <= 0 ? (
          <CartEmpty isOrdered={isOrdered} isProcess={makeTransaction?.isLoading} />
        ) : (
          <>
            <Typography variant="h4" color="inherit" gutterBottom>
              Blabla
            </Typography>
            <p className={classes.font}>Delivery Location</p>
            <CartSearchLocation
              clickSearch={() => setShow(true)}
              location={location || ""}
              handleChange={(e) => setLocation(e.target.value)} />
            <p className={classes.font}>Review Your Order</p>
            <Grid container justifyContent="space-between">
              <CartList cart={carts} dispatchAction={cartDispatch} />
              <CartTotal
                total={totalAmount}
                qty={totalQty}
                submitOrder={submitTransaction}
              />
            </Grid>
            <MapboxModal show={show} modalControl={() => setShow(false)} page="cart" />
          </>
        )}
      </div>
    </div>
  );
};

export default Cart;
