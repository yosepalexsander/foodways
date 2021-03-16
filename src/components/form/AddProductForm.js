import { useState, useContext } from "react";
import { Button, Input, InputBase, Grid } from "@material-ui/core";
import AttachFileIcon from "@material-ui/icons/AttachFile";
import { UserContext } from "../../logics/contexts/authContext";
import useStyles from "./styles";

const AddProductForm = () => {
  const classes = useStyles();
  const { dispatch } = useContext(UserContext);
  const [values, setValues] = useState({
    name: "",
    imgUrl: null,
    price: "",
  });
  const handleChange = (event) => {
    setValues({ ...values, [event.target.name]: event.target.value });
    console.log(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch({
      type: "ADD_PRODUCT",
      payload: values,
    });
    alert("Add Product Success");
    setTimeout(() => {
      setValues({ name: "", imgUrl: null, price: 0 });
    }, 300);
  };
  console.log(values);
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
                className={classes.input}
                inputProps={{ "aria-label": "full name" }}
              />
            </Grid>
            <Grid item xs={2}>
              <Input
                accept="image/*"
                id="icon-button-file"
                type="file"
                multiple
                sx={{ display: "none" }}
              />
              <label htmlFor="icon-button-file">
                <Button
                  className={classes.fileButton}
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
              className={classes.input}
              inputProps={{ "aria-label": "full name" }}
            />
          </Grid>
          <Grid container justifyContent="flex-end" sx={{ mt: 8 }}>
            <Grid item>
              <Button
                sx={{ width: 260, height: 40, float: "right" }}
                variant="contained"
                color="secondary"
                type="submit"
              >
                Save
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </form>
    </div>
  );
};

export default AddProductForm;
