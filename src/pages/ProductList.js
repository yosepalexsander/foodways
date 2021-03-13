import { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";

import {
  Button,
  Card,
  CardMedia,
  CardContent,
  Grid,
  Typography,
} from "@material-ui/core";
import fakeData from "../data/fakeData";
import priceFormatter from "../helpers/priceFormatter";
import { CartContext } from "../logics/contexts/cartContext";
const styles = {
  root: {
    width: 250,
    p: 1,
  },
  cover: {
    height: 134,
  },
};
const ProductList = () => {
  const { dispatch } = useContext(CartContext);
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const { id } = useParams();

  useEffect(() => {
    const { users } = fakeData;
    const restaurant = users.find((user) => user.id === Number(id));
    if (restaurant) {
      setData(restaurant);
      setLoading(false);
    }
  }, []);

  const addProductToCart = (product) => {
    console.log("add product", product);
    dispatch({
      type: "ADD_TO_CART",
      payload: product,
    });
  };
  return (
    <div>
      {loading ? (
        <Typography variant="h3">Loading...</Typography>
      ) : (
        <section id="product-list">
          <Typography variant="h4" sx={{ mb: 4 }}>
            {data.fullName}, Menus
          </Typography>
          <Grid container spacing={3} justifyContent="space-evenly">
            {data.products.map((item) => (
              <Grid key={item.id} item>
                <Card sx={styles.root}>
                  <CardMedia
                    sx={styles.cover}
                    component="img"
                    src={item.imgUrl}
                    title={item.name}
                  />
                  <CardContent>
                    <Typography variant="h6" sx={{ height: 50 }}>
                      {item.name}
                    </Typography>
                    <Typography variant="overline" sx={{ color: "#FF1515" }}>
                      {priceFormatter(item.price)}
                    </Typography>
                    <Button
                      variant="contained"
                      sx={{ width: "100%", mt: 2 }}
                      onClick={() => addProductToCart(item)}
                    >
                      Order
                    </Button>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </section>
      )}
    </div>
  );
};

export default ProductList;
