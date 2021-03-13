import { Box, Grid, Typography } from "@material-ui/core";
import CardVertical from "../components/data-list/CardVertical";
import CardHorizontal from "../components/data-list/CardHorizontal";
import pizza from "../assets/images/landingpage_pizza.png";

import fakeData from "../data/fakeData";

const styles = {
  gridColored: {
    px: 3,
    pb: 5,
    "::before": {
      content: '""',
      position: "absolute",
      width: "100%",
      height: 558,
      top: 0,
      left: 0,
      backgroundColor: "primary.main",
      zIndex: -1,
    },
  },
  imgSize: {
    width: 408,
    height: 393,
  },
  rule: {
    backgroundColor: "secondary.main",
    width: 150,
    height: 3,
    transform: "translateY(10px)",
  },
  description: {
    maxWidth: 274,
    lineHeight: "19.12px",
    pl: 4,
  },
  padding: {
    pt: 4,
    pb: 3,
  },
};

const Landing = () => {
  const { near, popular } = fakeData;
  return (
    <>
      <section id="hero">
        <Box
          display="flex"
          flexDirection="row"
          justifyContent="space-between"
          sx={styles.gridColored}
        >
          <Box display="block" pt={8}>
            <Typography variant="h1" color="secondary">
              Are You Hungry ?
            </Typography>
            <Typography variant="h1" color="secondary">
              Express Home Delivery
            </Typography>
            <Box
              display="flex"
              flexDirection="row"
              justifyContent="flex-start"
              pt={4}
            >
              <Box sx={styles.rule} />
              <Typography
                variant="body2"
                color="secondary"
                sx={styles.description}
              >
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry. Lorem Ipsum has been the industry's standard dummy
                text ever since the 1500s.
              </Typography>
            </Box>
          </Box>
          <Box>
            <img src={pizza} alt="pizza" sx={styles.imgSize} />
          </Box>
        </Box>
      </section>
      <Grid container spacing={3} sx={styles.padding}>
        <section id="popular">
          <Typography variant="h4" sx={styles.padding}>
            Popular Restaurant
          </Typography>
          <Grid container spacing={2}>
            {popular.map((item) => (
              <Grid key={item.id} item>
                <CardHorizontal item={item} />
              </Grid>
            ))}
          </Grid>
        </section>
        <section id="near">
          <Typography variant="h4" sx={styles.padding}>
            Restaurant Near You
          </Typography>
          <Grid container spacing={2}>
            {near.map((item) => (
              <Grid key={item.id} item>
                <CardVertical item={item} />
              </Grid>
            ))}
          </Grid>
        </section>
      </Grid>
    </>
  );
};

export default Landing;
