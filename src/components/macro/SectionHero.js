import { Fragment } from "react";
import { Box, Typography } from "@material-ui/core";
import pizza from "../../assets/images/landingpage_pizza.png";

import "./styles.css";

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
