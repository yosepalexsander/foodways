import { Card, CardContent, CardMedia, Typography } from "@material-ui/core";
import { useHistory } from "react-router-dom";

const styles = {
  root: {
    display: "flex",
    alignItems: "center",
    width: "250px",
    height: "95px",
    p: 1,
    cursor: "pointer",
    transition: "transform .4s ease-in-out",
    '&:hover': {
      transform: "scale(1.05)",
      boxShadow: "0 3px 8px 2px rgba(0,0,0, 0.2)"
    }
  },
  content: {
    flex: "1 0 auto",
  },
  cover: {
    width: "65px",
  },
  title: {
    fontSize: "24px",
    lineHeight: 1.17,
  },
};
const CardHorizontal = ({ item }) => {
  const history = useHistory();
  const handleClick = () => {
    history.push(`/restaurant/${item.id}`, { restaurant: item.restaurant });
  };
  return (
    <div>
      <Card sx={styles.root} onClick={handleClick} elevation={0}>
        <CardMedia
          sx={styles.cover}
          component="img"
          src={item.image}
          title={item.restaurant}
        />
        <CardContent>
          <Typography variant="h5" sx={styles.title}>
            {item.restaurant}
          </Typography>
        </CardContent>
      </Card>
    </div>
  );
};

export default CardHorizontal;
