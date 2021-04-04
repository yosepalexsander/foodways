import { useEffect, useState, useContext } from "react";
import { useHistory, useRouteMatch } from "react-router-dom";

import { Grid, Typography } from "@material-ui/core";
import { UserContext } from "../logics/contexts/authContext";
import { getCustomerTransactions, getPartnerTransactions } from "../api/main";

import UserProfile from "../components/macro/UserProfile";

import UserTransaction from "../components/macro/UserTransaction";

const Profile = () => {
  const route = useHistory();
  const { state: { user } } = useContext(UserContext);
  const [transactions, setTransactions] = useState(null);
  const [loading, setLoading] = useState(true);
  const { url } = useRouteMatch();

  const getTransactions = async (role) => {
    if (role === "partner") {
      const { data } = await getPartnerTransactions(user.id);
      return data.data.transactions;
    } else if (role === "user") {
      const { data } = await getCustomerTransactions();
      return data.data.transactions;
    }
  };
  useEffect(() => {
    let isMounted = true
    getTransactions(user.role)
      .then(data => {
        if (isMounted) {
          setTransactions(data)
          setLoading(false)
        }
      })
    return () => {
      isMounted = false
    }
  }, []);


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
        <UserProfile profile={user} onClickEdit={editProfile} />
        <UserTransaction
          transactionData={transactions}
          isLoading={loading}
          isPartner={user.role === "partner" ? true : false}
          route={route} />
      </Grid>
    </div>
  );
};

export default Profile;
