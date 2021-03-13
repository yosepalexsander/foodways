import { Fragment } from "react";
import { useHistory } from "react-router-dom";
import { Card, CardContent, CardMedia, Typography } from "@material-ui/core";

const styles = {
  root: {
    width: 250,
    p: 1,
    cursor: "pointer",
  },
  cover: {
    height: 134,
  },
};
const CardVertical = ({ item }) => {
  const history = useHistory();
  const pushToProductList = (id) => {
    history.push(`/restaurants/${id}`);
  };
  return (
    <Fragment>
      <Card sx={styles.root} onClick={() => pushToProductList(item.id)}>
        <CardMedia
          sx={styles.cover}
          component="img"
          src={item.img}
          title={item.restaurant}
        />
        <CardContent>
          <Typography variant="h6">{item.restaurant}</Typography>
          <Typography variant="body2" color="textSecondary">
            {item.location}
          </Typography>
        </CardContent>
      </Card>
    </Fragment>
  );
};

export default CardVertical;
