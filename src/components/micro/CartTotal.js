import { Fragment } from "react";
import { Button, Grid, makeStyles, Typography } from "@material-ui/core";

import priceFormatter from "../../helpers/priceFormatter";

const useStyles = makeStyles((theme) => ({
  divider: {
    width: "100%",
    borderTop: `2px solid ${theme.palette.secondary.main}`,
    borderRadius: 2,
  },
  orderButton: {
    width: 260,
    height: 40,
  },
  totalHeight: {
    height: 300,
  },
}));
const CartTotal = (props) => {
  const { total, qty, submitOrder } = props;
  const classes = useStyles();
  return (
    <Fragment>
      <Grid
        container
        item
        xs={4}
        direction="column"
        justifyContent="space-between"
        className={classes.totalHeight}
      >
        <hr className={classes.divider} />
        <Grid item container justifyContent="space-between" spacing={2}>
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
        <hr className={classes.divider} />
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
              className={classes.orderButton}
              onClick={submitOrder}
            >
              Order
            </Button>
          </Grid>
        </Grid>
      </Grid>
    </Fragment>
  );
};

export default CartTotal;
