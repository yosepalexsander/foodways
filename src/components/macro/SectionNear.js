import { Fragment } from "react";
import { Typography, Grid, Grow } from "@material-ui/core";
import CardVertical from "../card/CardVertical";

const SectionNear = ({ near }) => {
  return (
    <Fragment>
      <section id="near">
        <Typography variant="h4" sx={{ py: 3 }} gutterBottom>
          Restaurant Near You
        </Typography>
        <Grid container item spacing={2}>
          {near.map((item) => (
            <Grow key={item.id} in={Boolean(item)}
              style={{ transformOrigin: '0 0 0' }}
              {...(Boolean(item) ? { timeout: 400 } : {})}>
              <Grid item>
                <CardVertical item={item} />
              </Grid>
            </Grow>
          ))}
        </Grid>
      </section>
    </Fragment>
  );
};

export default SectionNear;
