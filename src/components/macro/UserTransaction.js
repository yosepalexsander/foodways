import { Fragment } from "react";
import { Grid, Typography } from "@material-ui/core";

import Loading from "../micro/Loading";
import CardTransaction from "../card/CardTransaction";
import icon_nodata from "../../assets/icons/icon_nodata.svg";

const UserTransaction = (props) => {
  const { transactionData, isLoading, isPartner, route } = props;

  const toTransactionDetail = (id) => {
    route.push(`transaction/${id}`)
  }
  return (
    <Grid id="user-transaction" container item direction="column" spacing={2} xs={6} sm={4}>
      {isLoading ? (
        <Loading />
      ) : (
        <Fragment>
          {transactionData?.length <= 0 ?
            (
              <Grid item sx={{ textAlign: "center" }}>
                <img src={icon_nodata} alt="not found" />
                <Typography>You don't have any transaction history</Typography>
              </Grid>
            ) : (
              <Fragment>
                {transactionData.map((transaction) => (
                  <Grid item key={transaction.id}>
                    <CardTransaction
                      transaction={transaction}
                      isPartner={isPartner}
                      onClickTransaction={toTransactionDetail} />
                  </Grid>
                ))}
              </Fragment>
            )}
        </Fragment>
      )}
    </Grid>
  )
}

export default UserTransaction;
