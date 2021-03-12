import { Container } from "@material-ui/core";
import Header from "../components/partials/Header";
import fakeData from "../data/fakeData";

const styles = {
  container: {
    "@media (min-width: 600px)": {
      px: 15,
    },
  },
};
const ProductList = () => {
  return (
    <div>
      <Header />
      <Container></Container>
    </div>
  );
};

export default ProductList;
