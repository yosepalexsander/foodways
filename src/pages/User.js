import { useContext } from "react";
import { useHistory, useRouteMatch, useParams } from "react-router-dom";
import { useQuery } from "react-query";
import { Button, Grid, Typography } from "@material-ui/core";
import { OrderContext } from "../logics/contexts/orderContext";
import { getUserDetail } from "../api/main";

import Loading from "../components/micro/Loading";
import CardTransaction from "../components/card/CardTransaction";

const Profile = () => {
  const {
    state: { history },
  } = useContext(OrderContext);
  const route = useHistory();
  const { url } = useRouteMatch();
  const { id } = useParams();

  const { isLoading, data: userData, error } = useQuery("userDetail",
    async () => {
      const { data } = await getUserDetail(id);
      return data.data.user;
    });

  const editProfile = () => {
    route.push(`${url}/edit`);
  };

  if (isLoading) return (<Loading />);

  if (error) return (<h1>An error has occurred: {error.message}</h1>);

  return (
    <div>
      <Grid container justifyContent="space-between">
        <Grid container item direction="column" spacing={2} xs={6} sm={8}>
          <Grid item>
            <Typography variant="h4" color="inherit">
              My Profile
            </Typography>
          </Grid>
          <Grid container item spacing={2}>
            <Grid item>
              <img
                src={userData?.image}
                alt="user"
                style={{ width: "180px", height: "221px", objectFit: "cover" }}
              />
            </Grid>
            <Grid item>
              <Grid
                item
                container
                sx={{ height: 221 }}
                direction="column"
                justifyContent="space-between"
              >
                <Grid item>
                  <Typography
                    variant="h6"
                    color="secondary.light"
                    sx={{ fontFamily: "Cabin, sans-serif" }}
                  >
                    Fullname
                  </Typography>
                  <Typography
                    variant="h6"
                    color="secondary.light"
                    sx={{
                      fontFamily: "Cabin, sans-serif",
                      fontWeight: 400,
                    }}
                  >
                    {userData?.fullName}
                  </Typography>
                </Grid>
                <Grid item>
                  <Typography
                    variant="h6"
                    color="secondary.light"
                    sx={{ fontFamily: "Cabin, sans-serif" }}
                  >
                    Email
                  </Typography>
                  <Typography
                    variant="h6"
                    color="secondary.light"
                    sx={{
                      fontFamily: "Cabin, sans-serif",
                      fontWeight: 400,
                    }}
                  >
                    {userData?.email}
                  </Typography>
                </Grid>
                <Grid item>
                  <Typography
                    variant="h6"
                    color="secondary.light"
                    sx={{ fontFamily: "Cabin, sans-serif" }}
                  >
                    Phone
                  </Typography>
                  <Typography
                    variant="h6"
                    color="secondary.light"
                    sx={{
                      fontFamily: "Cabin, sans-serif",
                      fontWeight: 400,
                    }}
                  >
                    {userData?.phoneNumber}
                  </Typography>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
          <Grid item>
            <Button
              color="secondary"
              variant="contained"
              onClick={editProfile}
              sx={{ width: 180, height: 40 }}
            >
              Edit Profile
            </Button>
          </Grid>
        </Grid>
        <Grid container item direction="column" spacing={2} xs={6} sm={4}>
          {userData.role === "user" ? (
            <>
              <Grid item>
                <Typography variant="h4" color="inherit">
                  History Transaction
                </Typography>
              </Grid>
              {history.map((item) => (
                <Grid item key={item.id}>
                  <CardTransaction order={item} />
                </Grid>
              ))}
            </>
          ) : (
            <>
              <Grid item>
                <Typography variant="h4" color="inherit">
                  History Order
                </Typography>
              </Grid>
              {history.map((item) => (
                <Grid item key={item.id}>
                  <CardTransaction order={item} />
                </Grid>
              ))}
            </>
          )}
        </Grid>
      </Grid>
    </div>
  );
};

export default Profile;
