import { useContext, useState, useEffect } from "react";
import { useMutation } from "react-query";
import { Grid, makeStyles, Typography } from "@material-ui/core";

import { CartContext } from "../../logics/contexts/cartContext";
import { UserContext } from "../../logics/contexts/authContext";

import CartList from "../../components/macro/CartList";
import CartEmpty from "../../components/micro/CartEmpty";
import CartTotal from "../../components/micro/CartTotal";
import CartSearchLocation from "../../components/micro/CartSearchLocation";
import MapboxModal from "../../components/modal/MapboxModal";
import MapBoxSetLocation from "../../components/map/MapBoxSetLocation";

import ToastAlert from "../../components/micro/ToastAlert"
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
  }),
  { name: "Cart" }
);

const initialState = false;
const Cart = () => {
  const classes = useStyles();
  const { state: cartState, dispatch: cartDispatch } = useContext(CartContext);
  const { state: { user: { location: userLocation } } } = useContext(UserContext);
  const { restaurantId, carts, location: deliveryLocation } = cartState;
  const [show, setShow] = useState(initialState);
  const [isOrdered, setIsOrdered] = useState(initialState);
  const [alertOpen, setAlertOpen] = useState(initialState);
  const [location, setLocation] = useState(deliveryLocation.name || userLocation.name);

  useEffect(() => {
    setLocation(deliveryLocation.name || userLocation.name)
  }, [deliveryLocation.name]);

  const makeTransaction = useMutation(createTransaction, {
    onSuccess: () => {
      setIsOrdered(true)
      cartDispatch({ type: "SUBMIT_CART" })
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
    if (location) {
      const body = {
        restaurant_id: restaurantId,
        deliveryLocation: deliveryLocation.geolocation || userLocation.geolocation,
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
      return;
    }
    setAlertOpen(true);
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
              <CartList
                cart={carts}
                dispatchAction={cartDispatch} />
              <CartTotal
                total={totalAmount}
                qty={totalQty}
                submitOrder={submitTransaction}
              />
            </Grid>
            <MapboxModal show={show} modalControl={() => setShow(false)}>
              <MapBoxSetLocation page="cart" />
            </MapboxModal>
          </>
        )}
      </div>
      <ToastAlert alertOpen={alertOpen} severity="error" alertControl={() => setAlertOpen(false)}>
        Delivery location must not be empty
      </ToastAlert>
    </div>
  );
};

export default Cart;
