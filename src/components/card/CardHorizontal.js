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
    fontSize: "24px !important",
    lineHeight: 1.17,
  },
};
const CardHorizontal = ({ item }) => {
  const history = useHistory();
  const imgUrlArr = item.image.split('/')
  const userPhoto = imgUrlArr[imgUrlArr.length - 1] !== "null" ? item.image : avatar_default;
  const handleClick = () => {
    history.push(`/restaurant/${item.id}`, { restaurant: item.fullName });
  };
  return (
    <div>
      <Card sx={styles.root} onClick={handleClick} elevation={0}>
        <CardMedia
          sx={styles.cover}
          component="img"
          src={userPhoto}
          title={item.fullName}
        />
        <CardContent>
          <Typography variant="h6" sx={styles.title}>
            {item.fullName}
          </Typography>
        </CardContent>
      </Card>
    </div>
  );
};

export default CardHorizontal;
