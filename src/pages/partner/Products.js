import { useEffect, useState } from "react";
import { Typography, Grid, Grow } from "@material-ui/core";
import CardVertical from "../../components/card/CardVertical";
import Loading from "../../components/micro/Loading";
import fakeData from "../../data/fakeData";

const Products = ({ id }) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const { users } = fakeData;
    const restaurant = users.find((user) => user.id === Number(id));
    if (restaurant) {
      setData(restaurant);
      setTimeout(() => setLoading(false), 500)
    }
  }, []);
  return (
    <div>
      {loading ? (
        <Loading />
      ) : (
        <section id="product-list">
          <Grid container spacing={3} justifyContent="space-evenly" sx={{ pb: 3 }}>
            {data.products.map((item, index) => (
              <Grow key={item.id} in={!loading}
                style={{ transformOrigin: '0 0 0' }}
                {...(loading ? {} : { timeout: 500 * index })}>
                <Grid item>
                  <CardVertical item={item} isFromProduct isPartner />
                </Grid>
              </Grow>
            ))}
          </Grid>
        </section>
      )}
    </div>
  )
}

export default Products
