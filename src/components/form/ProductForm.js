import { forwardRef, useState } from "react";
import { useMutation } from "react-query";
import { useParams } from "react-router-dom";
import { Button, Input, InputBase, Grid } from "@material-ui/core";
import AttachFileIcon from "@material-ui/icons/AttachFile";
import { createProduct, updateProduct } from "../../api/main";

import "./styles.css";
import ToastAlert from "../micro/ToastAlert";

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
              <InputBase
                placeholder="Title"
                name="title"
                value={values.title}
                onChange={handleChange}
                className="input"
                required
                inputProps={{ "aria-label": "title" }}
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
                required
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
            <InputBase
              placeholder="Price"
              name="price"
              onChange={handleChange}
              value={values.price}
              type="text"
              className="input"
              inputProps={{ "aria-label": "price" }}
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
