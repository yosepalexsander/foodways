import { Typography } from "@material-ui/core";
import ProductForm from "../../components/form/ProductForm";

const AddProduct = () => {
  return (
    <div>
      <Typography variant="h4" color="inherit" gutterBottom>
        Add Product
      </Typography>
      <ProductForm />
    </div>
  );
};

export default AddProduct;
