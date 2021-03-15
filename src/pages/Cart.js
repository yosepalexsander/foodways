import { useContext, useEffect, useState } from "react";
import {
  Button,
  Grid,
  InputBase,
  makeStyles,
  Typography,
} from "@material-ui/core";
import { UserContext } from "../logics/contexts/authContext";
import { CartContext } from "../logics/contexts/cartContext";
import CartItem from "../components/data-list/CartItem";
import priceFormatter from "../helpers/priceFormatter";

const useStyles = makeStyles((theme) => ({
  searchInput: {
    backgroundColor: "#fff",
    padding: theme.spacing(1),
    borderRadius: 5,
    width: "100%",
    height: 47,
  },
  searchButton: {
    width: 222,
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
  // const {state, dispatch} = useContext(UserContext)
  const { state, dispatch } = useContext(CartContext);
  // const [total, setTotal] = useState(0);
  const { currentRestaurant, carts } = state;

  // useEffect(() => {
  //   console.log(carts);
  // }, [state]);
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
  return (
    <div>
      <Typography variant="h4" color="inherit" gutterBottom>
        {currentRestaurant}
      </Typography>
      <div className={classes.container}>
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
            >
              Select On Map
            </Button>
          </Grid>
        </Grid>
        <p className={classes.font}>Review Your Order</p>
        <Grid container justifyContent="space-between" spacing={2}>
          <Grid item container xs={7}>
            <hr className={classes.divider} />
            {carts.map((product) => (
              <Grid key={product.id} container item flexGrow={1}>
                <CartItem
                  item={product}
                  incrementQty={incrementProduct}
                  decrementQty={decrementProduct}
                  removeItem={removeProduct}
                />
                <hr className={classes.divider} />
              </Grid>
            ))}
          </Grid>
          <Grid
            container
            item
            xs={5}
            direction="column"
            justifyContent="space-between"
          >
            <hr className={classes.divider} />
            <Grid item container justifyContent="space-between">
              <Grid item>
                <Typography variant="body2">Subtotal</Typography>
              </Grid>
              <Grid item>
                <Typography variant="body2" color="error">
                  {priceFormatter(totalAmount)}
                </Typography>
              </Grid>
            </Grid>
            <Grid item container justifyContent="space-between">
              <Grid item>
                <Typography variant="body2">Qty</Typography>
              </Grid>
              <Grid item>
                <Typography variant="body2" color="error">
                  {totalQty}
                </Typography>
              </Grid>
            </Grid>
            <Grid item container justifyContent="space-between">
              <Grid item>
                <Typography variant="body2">Ongkir</Typography>
              </Grid>
              <Grid item>
                <Typography variant="body2" color="error">
                  {priceFormatter(10000)}
                </Typography>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </div>
    </div>
  );
};

export default Cart;
