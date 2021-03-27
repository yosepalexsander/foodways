import { useQuery } from "react-query";
import { Grid } from "@material-ui/core";
import SectionHero from "../components/macro/SectionHero";
import SectionPopular from "../components/macro/SectionPopular";
import SectionNear from "../components/macro/SectionNear";

import fakeData from "../data/fakeData";

const styles = {
  padding: {
    mt: 4,
    mb: 2,
  },
};

const Landing = () => {
  const { near, popular } = fakeData;
  // const {isLoading, data: restaurantData, isError, error} = useQuery("getRestaurants", )

  return (
    <>
      <SectionHero />
      <Grid
        container
        justifyContent="center"
        direction="column"
        sx={styles.padding}
      >
        <SectionPopular popular={popular} />
        <SectionNear near={near} />
      </Grid>
    </>
  );
};

export default Landing;
