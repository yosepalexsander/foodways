import { Fragment } from "react";
import { Grid, Typography } from "@material-ui/core";

import priceFormatter from "../../helpers/priceFormatter";

const OrderTotal = (props) => {
  const { total, qty } = props;
  return (
    <Fragment>
      <Grid item container justifyContent="flex-end" spacing={2} sx={{ paddingBottom: "16px" }}>
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
    </Fragment>
  )
}

export default OrderTotal
