import { Fragment } from "react";
import { Grid, Grow, Typography } from "@material-ui/core";
import CardHorizontal from "../card/CardHorizontal";
import useElementOnViewport from "../../hooks/useElementOnViewport";

const SectionPopular = ({ popular }) => {
  const [containerRef, isVisible] = useElementOnViewport({
    root: null,
    rootMargin: "0px",
    threshold: 0.7
  });

  return (
    <Fragment>
      <section id="popular" ref={containerRef}>
        <Typography variant="h4" className="title" gutterBottom>
          Popular Restaurant
        </Typography>
        <Grid container item spacing={2} justifyContent="space-between">
          {popular.map((item, index) => (
            <Grow key={item.id} in={isVisible}
              style={{ transformOrigin: '0 0 0' }}
              {...(isVisible ? { timeout: 200 * index } : {})}>
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
