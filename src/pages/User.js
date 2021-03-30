import { Fragment } from "react";
import { useHistory, useRouteMatch, useParams } from "react-router-dom";
import { useQuery } from "react-query";

import { Grid, Typography } from "@material-ui/core";
import { getCustomerTransactions, getPartnerTransactions, getUserDetail } from "../api/main";

import Loading from "../components/micro/Loading";
import UserProfile from "../components/macro/UserProfile";

import UserTransaction from "../components/macro/UserTransaction";

const Profile = () => {
  const route = useHistory();
  const { url } = useRouteMatch();
  const { id } = useParams();
  const { isLoading: userLoading, data: userData, isError: userError } = useQuery(["userDetail", parseInt(id)],
    async () => {
      const { data } = await getUserDetail(id);
      const transactions = await getTransactions(data.data.user.role);
      const newData = {
        user: data.data.user,
        transactions: transactions
      }
      return newData;
    }
  );
  const getTransactions = async (role) => {
    if (role === "partner") {
      const { data } = await getPartnerTransactions(id);
      return data.data.transactions
    } else if (role === "user") {
      const { data } = await getCustomerTransactions();
      return data.data.transactions
    }
  };

  const editProfile = () => {
    route.push(`${url}/edit`);
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
            <UserProfile profile={userData?.user} onClickEdit={editProfile} />
          )}
        <UserTransaction
          transactionData={userData?.transactions}
          isLoading={userLoading}
          isError={userError}
          isPartner={userData?.user?.role === "partner" ? true : false}
          route={route} />
      </Grid>
    </div>
  );
};

export default Profile;
