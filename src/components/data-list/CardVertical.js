import { Fragment } from "react";
import { Card, CardContent, CardMedia, Typography } from "@material-ui/core";

const styles = {
  root: {
    width: 250,
    cursor: "pointer",
  },
  cover: {
    height: 134,
  },
  title: {
    fontSize: 18,
    lineHeight: "28.31px",
  },
};
const CardVertical = ({ item }) => {
  return (
    <Fragment>
      <Card sx={styles.root}>
        <CardMedia
          sx={styles.cover}
          component="img"
          src={item.img}
          title={item.restaurant}
        />
        <CardContent>
          <Typography variant="h4" sx={styles.title}>
            {item.restaurant}
          </Typography>
          <Typography variant="body2" color="textSecondary">
            {item.location}
          </Typography>
        </CardContent>
      </Card>
    </Fragment>
  );
};

export default CardVertical;
