import { useState, Fragment } from "react";
import { useHistory, useRouteMatch, useParams } from "react-router-dom";
import { useQuery } from "react-query";

import { Grid, Typography } from "@material-ui/core";
import { getCustomerTransactions, getPartnerTransactions, getUserDetail } from "../api/main";

import Loading from "../components/micro/Loading";
import UserProfile from "../components/macro/UserProfile";

import UserTransaction from "../components/macro/UserTransaction";

const Profile = () => {
  const [transaction, setTransaction] = useState(null);
  const [transactionLoading, setTransactionLoading] = useState(true);
  const [transactionError, setTransactionError] = useState(false);
  const route = useHistory();
  const { url } = useRouteMatch();
  const { id } = useParams();
  const getTransactions = async (role) => {
    if (role === "partner") {
      const { status, data } = await getPartnerTransactions(id);
      if (status !== 200) {
        setTransaction(data.data);
        setTransactionError(true);
        return
      }
      setTransaction(data.data);
      setTransactionLoading(false);
    } else if (role === "user") {
      const { status, data } = await getCustomerTransactions();
      if (status !== 200) {
        setTransaction(data.data);
        setTransactionError(true)
        return
      }
      setTransaction(data.data);
      setTransactionLoading(false);
    }
  };
  const { isLoading: userLoading, data: userData, error: userError } = useQuery(["userDetail", id],
    async () => {
      const response = await getUserDetail(id);
      return response.data;
    }, {
    onSuccess: async (data) => {
      await getTransactions(data?.data?.user?.role);
    }
  }
  );

  const editProfile = () => {
    route.push(`${url}/edit`, { user: userData?.data?.user });
  };

  return (
    <div>
      <Grid container justifyContent="space-between" sx={{ mb: 2 }}>
        <Grid item xs={6} sm={8}>
          <Typography variant="h4" color="inherit">
            My Profile
          </Typography>
        </Grid>
        <Grid item xs={6} sm={4}>
          <Typography variant="h4" color="inherit">
            History Transaction
              </Typography>
        </Grid>
      </Grid>
      <Grid container justifyContent="space-between">
        {userLoading ?
          (
            <Loading />
          ) : userError ? (
            <Fragment>
              <Typography
                variant="h4"
                color="inherit"
                textAlign="center">
                {userError.response.data.message}
              </Typography>
            </Fragment>
          ) : (
            <UserProfile profile={userData?.data?.user} onClickEdit={editProfile} />
          )}
        <UserTransaction
          transactionData={transaction}
          isLoading={transactionLoading}
          isError={transactionError}
          isPartner={userData?.data?.user?.role === "partner" ? true : false} />
      </Grid>
    </div>
  );
};

export default Profile;
