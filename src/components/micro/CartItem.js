import { Grid, IconButton, Typography } from "@material-ui/core";

import RemoveRoundedIcon from "@material-ui/icons/RemoveRounded";
import AddIcon from "@material-ui/icons/Add";
import DeleteIcon from "../icons/DeleteIcon";
import priceFormatter from "../../helpers/priceFormatter";

import "./styles.css";

const CartItem = (props) => {

  const { item, decrementQty, incrementQty, removeItem } = props;

  return (
    <Grid id="cart-item" item xs container justifyContent="space-between" spacing={2}>
      <Grid item>
        <img src={item.image} alt={item.name} className="imgSize" />
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
          <Grid item container spacing={1} alignItems="center">
            <Grid item>
              <IconButton onClick={() => decrementQty(item)} size="small">
                <RemoveRoundedIcon />
              </IconButton>
            </Grid>
            <Grid item>
              <div className="qty">{item.qty}</div>
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
            <DeleteIcon viewBox="0 0 24 24" />
          </IconButton>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default CartItem;
