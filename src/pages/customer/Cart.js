import { useContext, useState } from "react";
import {
  Button,
  Grid,
  InputBase,
  makeStyles,
  Typography,
} from "@material-ui/core";
import { CartContext } from "../../logics/contexts/cartContext";
import { OrderContext } from "../../logics/contexts/orderContext";
import CartItem from "../../components/card/CartItem";
import MapboxModal from "../../components/modal/MapboxModal";
import CustomMapIcon from "../../components/icons/CustomMapIcon";
import CartTotal from "../../components/micro/CartTotal";
import CartEmpty from "../../components/micro/CartEmpty";

const useStyles = makeStyles((theme) => ({
  searchInput: {
    backgroundColor: "#fff",
    padding: theme.spacing(1),
    borderRadius: 5,
    width: "100%",
    height: 47,
  },
  searchButton: {
    width: "100%",
    height: 47,
  },
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
}));
const Cart = () => {
  const classes = useStyles();
  const { dispatch: orderDispatch } = useContext(OrderContext);
  const { state, dispatch } = useContext(CartContext);
  const { currentRestaurant, carts } = state;
  const [show, setShow] = useState(false);

  /** Logic to handle product in cart context
   * @param  product
   */
  const incrementProduct = (product) => {
    dispatch({ type: "ADD_PRODUCT", payload: product });
  };

  const decrementProduct = (product) => {
    dispatch({ type: "REMOVE_PRODUCT", payload: product });
  };
  const removeProduct = (product) => {
    dispatch({ type: "REMOVE_CART", payload: product });
  };

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
      type: "ORDER_SUCCESS",
      payload: {
        product: carts,
        total: totalAmount,
        date: new Date().toLocaleString("id-ID", options),
        restaurant: currentRestaurant,
      },
    });
    dispatch({
      type: "SUBMIT_CART",
      payload: { restaurant: "" },
    });
  };
  return (
    <div>
      <div className={classes.container}>
        <Typography variant="h4" color="inherit" gutterBottom>
          {currentRestaurant}
        </Typography>
        <p className={classes.font}>Delivery Location</p>
        <Grid container spacing={2}>
          <Grid item flexGrow={1}>
            <InputBase
              className={classes.searchInput}
              placeholder="Search Location..."
              inputProps={{ "aria-label": "search" }}
            />
          </Grid>
          <Grid item xs={3}>
            <Button
              variant="contained"
              color="secondary"
              className={classes.searchButton}
              onClick={() => setShow(true)}
              endIcon={<CustomMapIcon />}
            >
              Select On Map
            </Button>
          </Grid>
        </Grid>
        <p className={classes.font}>Review Your Order</p>
        {carts.length <= 0 ? (
          <CartEmpty />
        ) : (
          <>
            <Grid container justifyContent="space-between">
              <Grid item container xs={7} direction="column">
                <hr className={classes.divider} />
                {carts.map((product) => (
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
