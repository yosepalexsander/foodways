import { Fragment } from "react";
import { Grid, Typography } from "@material-ui/core";

import Loading from "../micro/Loading";
import CardTransaction from "../card/CardTransaction";
import icon_notfound from "../../assets/icons/icon_notfound.svg";

const UserTransaction = (props) => {
  const { transactionData, isLoading, isError, isPartner } = props;
  return (
    <Grid id="user-transaction" container item direction="column" spacing={2} xs={6} sm={4}>
      {isLoading ? (
        <Loading />
      ) : isError ? (
        <Grid item>
          <Typography variant="h4" color="inherit">
            {transactionData.message}
          </Typography>
        </Grid>
      ) : (
        <Fragment>
          {transactionData.transactions.length <= 0 ?
            (
              <Grid item sx={{ textAlign: "center" }}>
                <img src={icon_notfound} alt="not found" />
                <Typography>You don't have any transaction history</Typography>
              </Grid>
            ) : (
              <Fragment>
                {transactionData.transactions.map((transaction) => (
                  <Grid item key={transaction.id}>
                    <CardTransaction transaction={transaction} isPartner={isPartner} />
                  </Grid>
                ))}
              </Fragment>
            )}
        </Fragment>
      )}
    </Grid>
  )
}

export default UserTransaction
