import { Card, makeStyles, Typography } from "@material-ui/core";
import { Fragment } from "react";

import brand from "../../assets/icons/brand_logo.png";
import priceFormatter from "../../helpers/priceFormatter";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    justifyContent: "space-between",
    padding: theme.spacing(2),
    height: 115,
    p: 1,
  },
  column: {
    display: "flex",
    flexDirection: "column",
    height: 80,
  },
  content: {
    flex: "1 0 auto",
  },
  brandIcon: {
    height: 40,
    width: "auto",
  },
  price: {
    fontWeight: 900,
    color: "#974A4A",
    fontSize: 10,
  },
  status_success: {
    padding: theme.spacing(0, 4),
    background:
      "linear-gradient(180deg, rgba(0,255,117, 0.1) 0%, rgba(0,255,133, 0.1) 100%)",
    color: "rgb(0, 255, 71)",
    borderRadius: 5,
    textAlign: "center",
  },
  status_pending: {
    padding: theme.spacing(0, 4),
    background:
      "linear-gradient(180deg, rgba(0,255,117, 0.1) 0%, rgba(0,255,133, 0.1) 100%)",
    color: "rgb(0, 255, 71)",
    borderRadius: 5,
    textAlign: "center",
  },
}));
const CardTransaction = ({ order }) => {
  const classes = useStyles();
  return (
    <Fragment>
      <Card className={classes.root} elevation={0}>
        <div className={classes.column}>
          <div className={classes.content}>
            <Typography component="p" variant="h6">
              {order.restaurant}
            </Typography>
            <Typography variant="caption" color="textSecondary">
              {order.date}
            </Typography>
          </div>
          <div className={classes.price}>
            <Typography>Total: {priceFormatter(order.total)}</Typography>
          </div>
        </div>
        <div className={classes.column}>
          <div className={classes.content}>
            <img src={brand} className={classes.brandIcon} alt="brand_logo" />
          </div>
          <div className={classes.status_success}>{order.status}</div>
        </div>
      </Card>
    </Fragment>
  );
};
export default CardTransaction;
