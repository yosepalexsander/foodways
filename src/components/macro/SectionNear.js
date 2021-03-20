import { Fragment } from "react";
import { Typography, Grid, Grow } from "@material-ui/core";
import CardVertical from "../card/CardVertical";
import useElementOnViewport from "../../hooks/useElementOnViewport";
const SectionNear = ({ near }) => {
  const [containerRef, isVisible] = useElementOnViewport({
    root: null,
    rootMargin: "0px",
    threshold: 0.5
  })
  return (
    <Fragment>
      <section id="near" ref={containerRef}>
        <Typography variant="h4" sx={{ py: 3 }} gutterBottom>
          Restaurant Near You
        </Typography>
        <Grid container item spacing={2} justifyContent="space-between">
          {near.map((item, index) => (
            <Grow in={isVisible}
              style={{ transformOrigin: '0 0 0' }}
              {...(isVisible ? { timeout: 400 * index } : {})}>
              <Grid key={item.id} item>
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
