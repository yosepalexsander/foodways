import { Button, Grid, Typography } from "@material-ui/core";
import avatar_default from "../../assets/images/avatar_default.jpeg";

const UserProfile = (props) => {
  const { profile, onClickEdit } = props;
  const userPhoto = profile.image.split("/")[-1] !== null ? profile.image : avatar_default;
  return (
    <Grid container item direction="column" spacing={2} xs={6} sm={8}>
      <Grid container item spacing={2}>
        <Grid item>
          <img
            src={userPhoto}
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
                {profile.fullName}
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
                {profile.email}
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
                {profile.phone.slice(0, 9)}XXX
              </Typography>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <Grid item>
        <Button
          color="secondary"
          variant="contained"
          onClick={onClickEdit}
          sx={{ width: 180, height: 40 }}
        >
          Edit Profile
          </Button>
      </Grid>
    </Grid>
  )
}

export default UserProfile
