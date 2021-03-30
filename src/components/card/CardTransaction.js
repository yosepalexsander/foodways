import { Fragment, useState } from "react";
import { useMutation } from "react-query";
import { Button, Card, makeStyles, Typography } from "@material-ui/core";

import brand from "../../assets/icons/brand_logo.png";
import priceFormatter from "../../helpers/priceFormatter";
import clsx from "clsx";
import ConfirmModal from "../modal/ConfirmModal";
import { updateTransaction } from "../../api/main";

const useStyles = makeStyles((theme) => ({
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
    cursor: "pointer"
  },
  status_cancel: {
    padding: theme.spacing(0, 3),
    background:
      "linear-gradient(180deg, rgba(253, 16, 16, 0.1) 0%, rgba(255, 0, 0, 0.1) 100%)",
    color: "rgb(255, 25, 25)",
    borderRadius: "5px",
    textAlign: "center",
  },
}));
const CardTransaction = (props) => {
  const { transaction, isPartner, onClickTransaction } = props;
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
      <Card
        sx={{
          display: "flex",
          justifyContent: "space-between",
          padding: "16px",
          height: "115px !important",
          cursor: isPartner ? "default" : "pointer"
        }}
        onClick={isPartner ? undefined : () => onClickTransaction(transaction.id)}
        elevation={0}>
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
            <div className={classes.status_success}>
              {isPartner ? <>success</> : <>finished</>}
            </div>
          ) : transaction.status === "waiting approve" ? (
            <div className={classes.status_pending}>{transaction.status}</div>
          ) : transaction.status === "cancel" ? (
            <div className={classes.status_cancel}>{transaction.status}</div>
          ) : (
            <div className={classes.status_otw}>
              {transaction.status}
            </div>
          )}
        </div>
      </Card>
    </Fragment>
  );
};

export default CardTransaction;
