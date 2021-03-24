import { Card, CardContent, CardMedia, Typography } from "@material-ui/core";
import { useHistory } from "react-router-dom";

const styles = {
  root: {
    display: "flex",
    alignItems: "center",
    width: 250,
    height: 95,
    p: 1,
    cursor: "pointer",
    transition: "transform .2s ease-in",
    '&:hover': {
      transform: "scale(1.05)",
      boxShadow: "0 3px 8px 2px rgba(0,0,0, 0.2)"
    }
  },
  content: {
    flex: "1 0 auto",
  },
  cover: {
    width: 65,
  },
  title: {
    fontSize: "1.5rem",
    lineHeight: "28.31px",
  },
};
const CardHorizontal = ({ item }) => {
  const history = useHistory();
  const handleClick = () => {
    history.push(`/restaurant/${item.id}`);
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
