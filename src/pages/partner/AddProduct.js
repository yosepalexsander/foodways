import { Typography } from "@material-ui/core";
import AddProductForm from "../../components/form/AddProductForm";

const AddProduct = () => {
  return (
    <div>
      <Typography variant="h4" color="inherit" gutterBottom>
        Add Product
      </Typography>
      <AddProductForm />
    </div>
  );
};

export default AddProduct;
