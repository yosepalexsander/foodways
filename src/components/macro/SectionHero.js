import { Fragment } from "react";
import { Box, Typography } from "@material-ui/core";
import pizza from "../../assets/images/landingpage_pizza.png";

import "./styles.css";

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
};
const SectionHero = () => {
  return (
    <Fragment>
      <section id="hero">
        <Box
          display="flex"
          flexDirection="row"
          justifyContent="space-evenly"
          className="background"
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
              <Box className="rule" />
              <Typography
                variant="body2"
                color="secondary"
                className="description"
              >
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry. Lorem Ipsum has been the industry's standard dummy
                text ever since the 1500s.
              </Typography>
            </Box>
          </Box>
          <img src={pizza} alt="pizza"
            className="image" />
        </Box>
      </section>
    </Fragment>
  );
};

export default SectionHero;
