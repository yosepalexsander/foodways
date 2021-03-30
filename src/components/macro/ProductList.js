import { useQuery } from "react-query";
import { Grid, Grow, Typography } from "@material-ui/core";
import CardVertical from "../card/CardVertical";
import Loading from "../micro/Loading";

import { getPartnerProducts } from "../../api/main";
import NotFound from "../micro/NotFound";

const ProductList = ({ id }) => {
  const { isLoading, data: productData, error } = useQuery(["products", id], async () => {
    const response = await getPartnerProducts(id);
    return response.data.data;
  }, { chacheTime: 3600 * 1000 });

  if (error) return (<h1>Error occured: {error.response.data.message}</h1>)
  if (isLoading) return <Loading />
  return (
    <div>
      <section id="product-list">
        {productData?.products.length <= 0 ?
          (
            <NotFound>
              <Typography textAlign="center" component="p">
                You don't have any product, let's add one!
              </Typography>
            </NotFound>
          ) : (
            <Grid container spacing={3} justifyContent="space-evenly" sx={{ pb: 3 }}>
              {productData?.products.map((item, index) => (
                <Grow key={item.id} in={!isLoading}
                  style={{ transformOrigin: '0 0 0' }}
                  {...(isLoading ? {} : { timeout: 400 * index })}>
                  <Grid item>
                    <CardVertical item={item} isFromProduct isPartner partnerId={id} />
                  </Grid>
                </Grow>
              ))}
            </Grid>

          )}
      </section>
    </div>
  )
}

export default ProductList
