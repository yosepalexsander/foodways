import { useState, useContext } from "react";
import { Button, Input, InputBase, Grid } from "@material-ui/core";
import AttachFileIcon from "@material-ui/icons/AttachFile";
import { UserContext } from "../../logics/contexts/authContext";

import "./styles.css";

const AddProductForm = ({ isEdit }) => {
  const { dispatch } = useContext(UserContext);
  const [values, setValues] = useState({
    name: "",
    imgUrl: null,
    price: "",
  });
  const handleChange = (e) => {
    setValues({
      ...values,
      [e.target.name]: e.target.type === "file"
        ? e.target.files[0] : e.target.value
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append("image", values.imgUrl);
    console.log(formData)
    dispatch({
      type: "ADD_PRODUCT",
      payload: values,
    });
    alert("Add Product Success");
    setTimeout(() => {
      setValues({ name: "", imgUrl: null, price: 0 });
    }, 200);
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
                value={values.name}
                onChange={handleChange}
                className="input"
                inputProps={{ "aria-label": "title" }}
              />
            </Grid>
            <Grid item xs={2}>
              <Input
                accept="image/*"
                id="icon-button-file"
                name="imgUrl"
                type="file"
                onChange={handleChange}
                multiple
                sx={{ display: "none" }}
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
              >
                Save {isEdit && (<>Changes</>)}
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </form>
    </div>
  );
};

export default AddProductForm;
