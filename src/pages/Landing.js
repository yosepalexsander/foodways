import { useQuery } from "react-query";
import { Grid } from "@material-ui/core";
import SectionHero from "../components/macro/SectionHero";
import SectionPopular from "../components/macro/SectionPopular";
import SectionNear from "../components/macro/SectionNear";
import Loading from "../components/micro/Loading";

import { getPartnerUsers } from "../api/main";

const styles = {
  padding: {
    mt: 3,
    mb: 2,
    px: 4
  },
};

const Landing = () => {
  const { isLoading, data: restaurantData, isError, error } = useQuery("getRestaurants",
    async () => {
      const { data } = await getPartnerUsers()
      const popular = data.data.users.filter(user => user.role === "partner");
      return popular;
    }
  );

  if (isLoading) return <Loading />
  if (isError) return <h4><pre>{error.message}</pre></h4>
  return (
    <div>
      <SectionHero />
      <Grid
        container
        justifyContent="center"
        direction="column"
        sx={styles.padding}
      >
        <SectionPopular popular={restaurantData} />
        <SectionNear near={restaurantData} />
      </Grid>
    </div>
  );
};

export default Landing;
