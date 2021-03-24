import { useState } from "react";
import { useMutation } from "react-query";
import { Alert, Button, Input, InputBase, Grid, Snackbar, Slide } from "@material-ui/core";
import AttachFileIcon from "@material-ui/icons/AttachFile";
import CheckIcon from "@material-ui/icons/Check";
import { createProduct } from "../../api/main";

import "./styles.css";

const AddProductForm = ({ isEdit }) => {
  const [alertOpen, setAlertOpen] = useState(false);
  const [values, setValues] = useState({
    title: "",
    image: null,
    price: "",
  });
  const isDisabled = () => {
    return Object.keys(values).every(value => !value)
  }
  const handleChange = (e) => {
    setValues({
      ...values,
      [e.target.name]: e.target.type === "file"
        ? e.target.files[0] : e.target.value
    });
  };
  const mutationProduct = useMutation(createProduct, {
    onError: () => {
      alert("oops, error occured");
    },
    onSuccess: () => {
      setAlertOpen(true);
    }
  });

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!values.image) {
      mutationProduct.mutate(JSON.stringify(values, null, 2))
    };

    const formData = new FormData();
    formData.set("title", values.title);
    formData.set("price", values.price);
    formData.append("image", values.image);

    mutationProduct.mutate(formData);
    setValues({ name: "", image: null, price: 0 });
  };
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <Grid container direction="column" spacing={2}>
          <Grid container item spacing={2}>
            <Grid item flexGrow={1}>
              <InputBase
                placeholder="Title"
                name="name"
                value={values.title}
                error={!values.title && values.title.length < 8 ? true : false}
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
                error={!values.image ? true : false}
                sx={{ display: "none" }}
                required
                inputProps={{
                  "aria-label": "image",
                  helperText: `${!values.image ? "image must be not empty" : ""}`
                }}
              />
              <label htmlFor="icon-button-file">
                <Button
                  className="fileButton"
                  variant="fileInput"
                  component="span"
                  endIcon={<AttachFileIcon fontSize="medium" />}
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
                disabled={() => isDisabled()}
              >
                Save {isEdit && (<>Changes</>)}
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </form>
      <Snackbar
        anchorOrigin={{
          vertical: "top",
          horizontal: "center"
        }}
        TransitionComponent={Slide}
        TransitionProps={{ direction: "down" }}
        open={alertOpen}
        onClose={() => { setAlertOpen(false) }}
        key=" top center"
        autoHideDuration={6000}
      >
        <Alert
          icon={<CheckIcon fontSize="inherit" />}
          severity="success">
          Product has successfully created - check it out!
        </Alert>
      </Snackbar>
    </div>
  );
};

export default AddProductForm;
