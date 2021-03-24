import { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";

import {
  Grid,
  Typography,
  Grow,
} from "@material-ui/core";
import { CartContext } from "../logics/contexts/cartContext";
import CardVertical from "../components/card/CardVertical";
import Loading from "../components/micro/Loading";
import { getPartnerProducts } from "../api/main";

const ProductList = () => {
  const { dispatch } = useContext(CartContext);
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const { id } = useParams();

  // const getProducts = async () => {
  //   const { status, data } = await getPartnerProducts(id);
  //   if (status === 200) {
  //     setData(data.data.products);
  //     setLoading(false);
  //   }
  // };
  // useEffect(() => {
  //   getProducts();
  // }, []);

  const addProductToCart = (product) => {
    dispatch({
      type: "ADD_PRODUCT",
      payload: { ...product, restaurantId: data.id },
    });
  };
  return (
    <div>
      {loading ? (
        <Loading />
      ) : (
        <section id="product-list">
          <Typography variant="h4" sx={{ mb: 4 }}>
            {data.fullName}, Menus
          </Typography>
          <Grid container spacing={4} justifyContent="space-evenly" sx={{ pb: 3 }}>
            {data.products.map((item, index) => (
              <Grow key={item.id} in={!loading}
                style={{ transformOrigin: '0 0 0' }}
                {...(loading ? {} : { timeout: 500 * index })}>
                <Grid item>
                  <CardVertical item={item} isFromProduct addProduct={addProductToCart} />
                </Grid>
              </Grow>
            ))}
          </Grid>
        </section>
      )
      }
    </div >
  );
};

export default ProductList;
