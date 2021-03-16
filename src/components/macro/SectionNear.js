import { Fragment } from "react";
import { Typography, Grid } from "@material-ui/core";
import CardVertical from "../card/CardVertical";
const SectionNear = ({ near }) => {
  return (
    <Fragment>
      <section id="near">
        <Typography variant="h4" sx={{ py: 3 }} gutterBottom>
          Restaurant Near You
        </Typography>
        <Grid container item spacing={2} justifyContent="space-between">
          {near.map((item) => (
            <Grid key={item.id} item>
              <CardVertical item={item} />
            </Grid>
          ))}
        </Grid>
      </section>
    </Fragment>
  );
};

export default SectionNear;
