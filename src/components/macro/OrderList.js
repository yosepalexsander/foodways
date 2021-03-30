import { Fragment } from "react";
import { Grid, Typography } from "@material-ui/core";

import priceFormatter from "../../helpers/priceFormatter";
import "./styles.css";

const OrderList = (props) => {
  const { orders } = props;
  return (
    <Grid id="order-list" item container direction="column">
      <hr className="divider" />
      {orders.map((product) => (
        <Fragment key={product.id}>
          <Grid container item spacing={2} justifyContent="space-between" alignItems="center">
            <Grid item>
              <img src={product.image} alt={product.title} className="imgSize" />
            </Grid>
            <Grid item container xs sm justifyContent="space-between">
              <Grid item container direction="column" justifyContent="space-evenly" xs={9}>
                <Grid item>
                  <Typography
                    variant="body1"
                  >
                    {product.title}
                  </Typography>
                </Grid>
                <Grid item>
                  <Typography
                    variant="body1"
                  >
                    quantity: {product.qty}
                  </Typography>
                </Grid>
              </Grid>
              <Grid item container alignItems="center" justifyContent="flex-end" xs={3}>
                <Grid item>
                  <Typography
                    variant="body1"
                  >
                    {priceFormatter(product.price)}
                  </Typography>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
          <hr className="divider" />
        </Fragment>
      ))}
    </Grid>
  )
}

export default OrderList;
