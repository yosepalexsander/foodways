import { useContext } from "react";
import { useHistory, useRouteMatch } from "react-router-dom";
import { UserContext } from "../logics/contexts/authContext";
import { Button, Grid, Typography } from "@material-ui/core";
import { OrderContext } from "../logics/contexts/orderContext";

import CardTransaction from "../components/card/CardTransaction";

const Profile = () => {
  const {
    state: { user },
  } = useContext(UserContext);
  const {
    state: { history },
  } = useContext(OrderContext);

  const route = useHistory();
  const { url } = useRouteMatch();
  const editProfile = () => {
    route.push(`${url}/edit`);
  };
  return (
    <div>
      <Grid container justifyContent="space-between">
        <Grid container item direction="column" spacing={2} xs={6}>
          <Grid item>
            <Typography variant="h4" color="inherit">
              My Profile
            </Typography>
          </Grid>
          <Grid container item spacing={2}>
            <Grid item>
              <img
                src={user.fotoprofil}
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
                    {user.fullName}
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
                    {user.email}
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
                    {user.phoneNumber}
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
        <Grid container item direction="column" spacing={2} xs={4}>
          {user.role === "user" ? (
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
