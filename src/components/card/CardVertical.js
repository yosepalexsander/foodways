import { Fragment } from "react";
import { useHistory } from "react-router-dom";
import { Button, Card, CardContent, CardMedia, Typography } from "@material-ui/core";

import avatar_default from "../../assets/images/avatar_default.jpeg";
import priceFormatter from "../../helpers/priceFormatter";

const CardVertical = ({ item, isFromProduct, isPartner, ...props }) => {
  const history = useHistory();
  const imgUrlArr = item.image.split('/')
  const userPhoto = imgUrlArr[imgUrlArr.length - 1] !== "null" ? item.image : avatar_default;
  const pushToProductList = (id) => {
    history.push(`/restaurant/${id}`, { restaurant: item.fullName });
  };
  const editProduct = (id) => {
    history.push(`/product/${id}/edit`)
  }
  return (
    <Fragment>
      <Card
        sx={{
          width: "250px",
          cursor: isFromProduct ? "default" : "pointer",
          transition: "transform .4s ease-in-out",
          '&:hover': {
            transform: "scale(1.05)",
            boxShadow: "0 3px 8px 2px rgba(0,0,0, 0.2)"
          }
        }}
        onClick={isFromProduct ? undefined : () => pushToProductList(item.id)}
        elevation={0}
      >
        <CardMedia
          sx={{ height: 134, p: 1 }}
          component="img"
          src={userPhoto}
          title={isFromProduct ? item.title : item.name}
        />
        <CardContent>
          {isFromProduct ?
            (<>
              <Typography variant="h6" sx={{ height: "30px" }} gutterBottom>
                {item.title}
              </Typography>
              {isPartner ? (
                <Button
                  variant="contained"
                  sx={{ width: "100%", mt: 2, color: "secondary.main" }}
                  onClick={() => editProduct(item.id)}
                >
                  Edit
                </Button>
              ) : (
                <>
                  <Typography variant="overline" sx={{ color: "#FF1515" }}>
                    {priceFormatter(item.price)}
                  </Typography>
                  <Button
                    variant="contained"
                    sx={{ width: "100%", mt: 2, color: "secondary.main" }}
                    onClick={() => props.addProduct(item)}
                  >
                    Order
                </Button>
                </>
              )}
            </>
            ) :
            (
              <>
                <Typography variant="h6" gutterBottom>
                  {item.fullName}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  {item.location || "unknown"}
                </Typography>
              </>
            )}
        </CardContent>
      </Card>
    </Fragment>
  );
};

export default CardVertical;
