import { useState } from "react";
import { useMutation } from "react-query";
import { useParams } from "react-router-dom";
import { Button, Input, Grid } from "@material-ui/core";
import AttachFileIcon from "@material-ui/icons/AttachFile";
import { createProduct, updateProduct } from "../../api/main";

import ToastAlert from "../micro/ToastAlert";
import CustomTextField from "./CustomTextField";
import "./styles.css";

const AddProductForm = (props) => {
  const { isEdit } = props;
  const [alertOpen, setAlertOpen] = useState(false);
  const { id } = useParams();
  const [values, setValues] = useState({
    title: "",
    image: null,
    price: "",
  });
  const handleChange = (e) => {
    setValues({
      ...values,
      [e.target.name]: e.target.type === "file"
        ? e.target.files[0] : e.target.value
    });
  };
  const addProduct = useMutation(createProduct, {
    onError: () => {
      alert("oops, error occured");
    },
    onSuccess: () => {
      setAlertOpen(true);
    }
  });

  const editProduct = useMutation(body => updateProduct(id, body), {
    onError: (error) => {
      alert("oops, error occured: ", error);
    },
    onSuccess: () => {
      setAlertOpen(true);
    }
  });

  const handleSubmit = async (event) => {
    event.preventDefault();

    // if input file empty
    if (!values.image) {
      isEdit
        ? editProduct.mutate(JSON.stringify(values))
        : addProduct.mutate(JSON.stringify(values));
    } else {
      const formData = new FormData();
      formData.set("title", values.title);
      formData.set("price", values.price);
      formData.append("image", values.image);

      isEdit
        ? editProduct.mutate(formData)
        : addProduct.mutate(formData);
    }
    setValues({ title: "", image: null, price: 0 });
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
      <ToastAlert alertOpen={alertOpen} alertControl={() => setAlertOpen(false)}>
        Product has successfully {isEdit ? <>updated</> : <>created</>} - check it out!
      </ToastAlert>
    </div>
  );
};

export default AddProductForm;
