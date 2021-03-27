import { Button, Grid, Typography } from "@material-ui/core";
import clsx from "clsx";
import "./styles.css";
import priceFormatter from "../../helpers/priceFormatter";

const CartTotal = (props) => {
  const { total, qty, submitOrder } = props;
  return (
    <Grid
      id="cart-total"
      container
      item
      xs={4}
      direction="column"
      justifyContent="space-between"
    >
      <hr className="divider" />
      <Grid item container justifyContent="space-between">
        <Grid item>
          <Typography variant="body2">Subtotal</Typography>
        </Grid>
        <Grid item>
          <Typography variant="body2" color="error">
            {priceFormatter(total)}
          </Typography>
        </Grid>
      </Grid>
      <Grid item container justifyContent="space-between">
        <Grid item>
          <Typography variant="body2">Qty</Typography>
        </Grid>
        <Grid item>
          <Typography variant="body2" color="error">
            {qty}
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
      <hr className={clsx("divider", "marginBottom")} />
      <Grid item container justifyContent="space-between">
        <Grid item>
          <Typography variant="body1" color="error" sx={{ fontWeight: 800 }}>
            Total
            </Typography>
        </Grid>
        <Grid item>
          <Typography variant="body1" color="error" sx={{ fontWeight: 800 }}>
            {priceFormatter(10000 + total)}
          </Typography>
        </Grid>
      </Grid>
      <Grid container item justifyContent="flex-end">
        <Grid item>
          <Button
            variant="contained"
            color="secondary"
            className="orderButton"
            onClick={submitOrder}
          >
            Order
            </Button>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default CartTotal;
