import { Fragment } from "react";
import { Grid, Typography } from "@material-ui/core";
import CardHorizontal from "../card/CardHorizontal";

const SectionPopular = ({ popular }) => {
  return (
    <Fragment>
      <section id="popular">
        <Typography variant="h4" sx={{ py: 3 }} gutterBottom>
          Popular Restaurant
        </Typography>
        <Grid container item spacing={2} justifyContent="space-between">
          {popular.map((item) => (
            <Grid key={item.id} item>
              <CardHorizontal item={item} />
            </Grid>
          ))}
        </Grid>
      </section>
    </Fragment>
  );
};

export default SectionPopular;
