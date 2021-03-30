import { Fragment } from "react";
import { Grid, Grow, Typography } from "@material-ui/core";
import CardHorizontal from "../card/CardHorizontal";

const SectionPopular = ({ popular }) => {
  return (
    <Fragment>
      <section id="popular">
        <Typography variant="h4" className="title" gutterBottom>
          Popular Restaurant
        </Typography>
        <Grid container item spacing={2}>
          {popular.map((item) => (
            <Grow key={item.id} in={Boolean(item)}
              style={{ transformOrigin: '0 0 0' }}
              {...(Boolean(item) ? { timeout: 400 } : {})}>
              <Grid item>
                <CardHorizontal item={item} />
              </Grid>
            </Grow>
          ))}
        </Grid>
      </section>
    </Fragment>
  );
};

export default SectionPopular;
