import { Fragment } from "react";
import { Grid, IconButton, Typography, makeStyles } from "@material-ui/core";

import RemoveRoundedIcon from "@material-ui/icons/RemoveRounded";
import AddIcon from "@material-ui/icons/Add";
import DeleteIcon from "../icons/DeleteIcon";
import priceFormatter from "../../helpers/priceFormatter";

const useStyles = makeStyles((theme) => ({
  qty: {
    padding: "0 8px",
    background: "rgba(246,230,218,0.1)",
    borderRadius: "5px",
    textAlign: "center",
  },
  imgSize: {
    width: 80,
    height: 80,
    objectFit: "cover",
  },
  divider: {
    width: "100%",
    height: 3,
    borderTop: `5px solid ${theme.palette.secondary.main}`,
    borderRadius: 3,
  },
}));

const CartItem = (props) => {
  const classes = useStyles();

  const { item, decrementQty, incrementQty, removeItem } = props;

  return (
    <Fragment>
      <Grid item xs container justifyContent="space-between" spacing={2}>
        <Grid item>
          <img src={item.img} alt={item.name} className={classes.imgSize} />
        </Grid>
        <Grid item container xs={12} sm>
          <Grid item container direction="column" justifyContent="space-evenly">
            <Grid item>
              <Typography
                variant="body1"
                sx={{ fontFamily: "Abhaya Libre, serif" }}
              >
                {item.name}
              </Typography>
            </Grid>
            <Grid item container spacing={2} alignItems="center">
              <Grid item>
                <IconButton onClick={() => decrementQty(item)} size="small">
                  <RemoveRoundedIcon />
                </IconButton>
              </Grid>
              <Grid item>
                <div className={classes.qty}>{item.qty}</div>
              </Grid>
              <Grid item>
                <IconButton onClick={() => incrementQty(item)} size="small">
                  <AddIcon />
                </IconButton>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        <Grid
          container
          item
          direction="column"
          justifyContent="space-evenly"
          alignItems="center"
          xs={3}
        >
          <Grid item>
            <Typography varian="body2" color="error">
              {priceFormatter(item.price)}
            </Typography>
          </Grid>
          <Grid item>
            <IconButton onClick={() => removeItem(item)} size="small">
              <DeleteIcon />
            </IconButton>
          </Grid>
        </Grid>
      </Grid>
    </Fragment>
  );
};

export default CartItem;
