import { Card, makeStyles, Typography } from "@material-ui/core";
import { Fragment } from "react";

import brand from "../../assets/icons/brand_logo.png";
import priceFormatter from "../../helpers/priceFormatter";
import clsx from "clsx";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    justifyContent: "space-between",
    padding: theme.spacing(2),
    height: "115px",
  },
  column: {
    display: "flex",
    flexDirection: "column",
    height: "80px",
  },
  flexEnd: {
    alignItems: "flex-end",
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
    fontSize: "12px",
  },
  status_success: {
    padding: theme.spacing(0, 3),
    background:
      "linear-gradient(180deg, rgba(0,255,117, 0.1) 0%, rgba(0,255,133, 0.1) 100%)",
    color: "rgb(0, 255, 71)",
    borderRadius: "5px",
    textAlign: "center",
  },
  status_pending: {
    padding: theme.spacing(0, 3),
    background:
      "linear-gradient(180deg, rgba(255, 215, 0, 0.1) 0%, rgba(255, 238, 0, 0.1) 100%)",
    color: "rgb(255, 196,0)",
    borderRadius: "5px",
    textAlign: "center",
  },
  status_otw: {
    padding: theme.spacing(0, 3),
    background:
      "linear-gradient(180deg, rgba(0, 68, 255, 0.1) 0%, rgba(0, 119, 255, 0.1) 100%)",
    color: "rgb(0, 47, 255)",
    borderRadius: "5px",
    textAlign: "center",
  },
}));
const CardTransaction = ({ transaction, isPartner }) => {
  const classes = useStyles();
  const options = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  };
  const transactionDate = new Date(transaction.createdAt).toLocaleDateString('id-ID', options);
  const totalOrder = transaction.orders.reduce((total, order) => {
    const totalPerProduct = order.price * order.qty;
    return total + totalPerProduct;
  }, 0);

  return (
    <Fragment>
      <Card className={classes.root} elevation={0}>
        <div className={classes.column}>
          <div className={classes.content}>
            {isPartner ? (
              <>
                <Typography component="p" variant="h6">
                  {transaction.userOrder.fullName}
                </Typography>
                <Typography variant="caption" color="textSecondary">
                  {transactionDate}
                </Typography>
              </>
            ) : (
              <>
                <Typography component="p" variant="h6">
                  {transaction.restaurant.fullName}
                </Typography>
                <Typography variant="caption" color="textSecondary">
                  {transactionDate}
                </Typography>
              </>
            )}
          </div>
          <Typography className={classes.price}>Total: {priceFormatter(totalOrder)}</Typography>
        </div>
        <div className={clsx(classes.column, classes.flexEnd)}>
          <div className={classes.content}>
            <img src={brand} className={classes.brandIcon} alt="brand_logo" />
          </div>
          {transaction.status === "success" ? (
            <div className={classes.status_success}>{transaction.status}</div>
          ) : transaction.status === "waiting approve" ? (
            <div className={classes.status_pending}>{transaction.status}</div>
          ) : (
            <div className={classes.status_otw}>{transaction.status}</div>
          )}
        </div>
      </Card>
    </Fragment>
  );
};
export default CardTransaction;
