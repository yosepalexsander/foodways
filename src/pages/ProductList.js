import { useContext } from "react";
import { useQuery } from "react-query";
import { useParams, useLocation } from "react-router-dom";
import {
  Grid,
  Typography,
  Grow,
} from "@material-ui/core";
import { CartContext } from "../logics/contexts/cartContext";
import CardVertical from "../components/card/CardVertical";
import Loading from "../components/micro/Loading";
import { getPartnerProducts } from "../api/main";
import NotFound from "../components/micro/NotFound";

const ProductList = () => {
  const { dispatch } = useContext(CartContext);
  const { id } = useParams();
  const location = useLocation();
  const restaurant = location.state && location.state.restaurant


  const { isLoading, data: productData, error } = useQuery(["products", id], async () => {
    const response = await getPartnerProducts(id);
    return response.data.data;
  });

  const addProductToCart = (product) => {
    dispatch({
      type: "ADD_PRODUCT",
      payload: { ...product, restaurantId: id },
    });
  };
  if (error) return (<h1>Error occured: {error.response.data.message}</h1>)

  return (
    <div>
      {isLoading ? (
        <Loading />
      ) : (
        <section id="product-list">
          <Typography variant="h4" sx={{ mb: 4 }}>
            {restaurant}, Menus
          </Typography>
          {productData?.products.length <= 0 ? (
            <NotFound>
              <Typography textAlign="center" component="p">
                This Restaurant Hasn't Add Any Product
              </Typography>
            </NotFound>
          ) : (
            <Grid container spacing={4} justifyContent="space-evenly" sx={{ pb: 3 }}>
              {productData?.products.map((item, index) => (
                <Grow key={item.id} in={!isLoading}
                  style={{ transformOrigin: '0 0 0' }}
                  {...(isLoading ? {} : { timeout: 500 * index })}>
                  <Grid item>
                    <CardVertical item={item} isFromProduct addProduct={addProductToCart} />
                  </Grid>
                </Grow>
              ))}
            </Grid>
          )}
        </section>
      )
      }
    </div >
  );
};

export default ProductList;
