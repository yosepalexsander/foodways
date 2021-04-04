import { useState } from "react";
import { useMutation, useQueryClient } from "react-query";
import { useParams, useLocation } from "react-router-dom";
import { Button, Input, Grid } from "@material-ui/core";
import AttachFileIcon from "@material-ui/icons/AttachFile";
import { createProduct, updateProduct } from "../../api/main";

import ToastAlert from "../micro/ToastAlert";
import CustomTextField from "./CustomTextField";
import "./styles.css";

const AddProductForm = (props) => {
  const { isEdit } = props;
  const { id } = useParams();
  const routeLocation = useLocation();
  const queryClient = useQueryClient();
  const initialProductState = routeLocation.state && routeLocation.state?.product;
  const [alertOpen, setAlertOpen] = useState(false);
  const [values, setValues] = useState({
    title: isEdit ? initialProductState.title : "",
    image: null,
    price: isEdit ? initialProductState.price : "",
  });

  const handleChange = (e) => {
    setValues({
      ...values,
      [e.target.name]: e.target.type === "file"
        ? e.target.files[0] : e.target.value
    });
  };

  const addProduct = useMutation(createProduct, {
    onError: (error) => {
      alert("oops, error occured: ", error.response.data);
    },
    onSuccess: () => {
      setAlertOpen(true);
      queryClient.invalidateQueries("products");
    }
  });

  const editProduct = useMutation(body => updateProduct(id, body), {
    onError: (error) => {
      alert("oops, error occured: ", error.response.data);
    },
    onSuccess: (data) => {
      setAlertOpen(true);
      queryClient.invalidateQueries("products");
    }
  });

  const handleSubmit = async (event) => {
    event.preventDefault();


    if (values.image) {
      const formData = new FormData();
      formData.set("title", values.title);
      formData.set("price", values.price);
      formData.append("image", values.image, values.image.name);
      if (isEdit) {
        return editProduct.mutate(formData)
      }
      addProduct.mutate(formData);
    } else {
      if (isEdit) {
        return editProduct.mutate(JSON.stringify(values))
      }
      addProduct.mutate(JSON.stringify(values));
    }
  };
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <Grid container direction="column" spacing={2}>
          <Grid container item spacing={2}>
            <Grid item flexGrow={1}>
              <CustomTextField
                name="title"
                value={values.title}
                onChange={handleChange}
                color="secondary"
                required
                InputProps={{ "aria-label": "title", placeholder: "Title" }}
              />
            </Grid>
            <Grid item xs={2}>
              <Input
                accept="image/*"
                id="icon-button-file"
                name="image"
                type="file"
                onChange={handleChange}
                color="secondary"
                sx={{ display: "none" }}
                inputProps={{ "aria-label": "image" }}
              />
              <label htmlFor="icon-button-file">
                <Button
                  className="fileButton"
                  variant="fileInput"
                  component="span"
                  endIcon={<AttachFileIcon />}
                >
                  Attach Image
                </Button>
              </label>
            </Grid>
          </Grid>
          <Grid item>
            <CustomTextField
              name="price"
              onChange={handleChange}
              value={values.price}
              type="text"
              color="secondary"
              required
              InputProps={{ "aria-label": "price", placeholder: "Price" }}
            />
          </Grid>
          <Grid container justifyContent="flex-end" sx={{ mt: 8 }}>
            <Grid item>
              <Button
                sx={{ width: 260, height: 40 }}
                variant="contained"
                color="secondary"
                type="submit"
                disabled={!values.price || !values.title ? true : false}
              >
                Save {isEdit && (<>Changes</>)}
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </form>
      <ToastAlert alertOpen={alertOpen} severity="success" alertControl={() => setAlertOpen(false)}>
        Product has successfully {isEdit ? <>updated</> : <>created</>} - check it out!
      </ToastAlert>
    </div>
  );
};

export default AddProductForm;
