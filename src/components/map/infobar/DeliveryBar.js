import { Fragment, useContext } from "react";
import { Button, Typography } from "@material-ui/core";
import icon_marker from "../../../assets/icons/icon_marker.png";
import { UserContext } from "../../../logics/contexts/authContext";
import { CartContext } from "../../../logics/contexts/cartContext";
import "../mapbox.css";

const SelectDelivery = (props) => {
  const { location, page, geolocation } = props;
  const { dispatch: cartDispatch } = useContext(CartContext);
  const { dispatch: userDispatch } = useContext(UserContext);

  const submitLocation = () => {
    if (page === "cart") {
      cartDispatch({
        type: "ADD_LOCATION",
        payload: {
          location: {
            geolocation: geolocation.join(','),
            name: location.data[0].label
          }
        }
      })
    } else {
      userDispatch({
        type: "ADD_LOCATION",
        payload: {
          location: {
            geolocation: geolocation.join(','),
            name: location.data[0].label
          }
        }
      })
    }
  }

  return (
    <Fragment>
      <div className="centerbar">
        <h6 className="title-bar">
          Select {page === "cart" ? <span>Delivery</span> : <span>My</span>} Location
        </h6>
        <div className="flex">
          <div className="marker">
            <img src={icon_marker} alt="marker" />
          </div>
          <div className="location">
            {location && (
              <>
                <Typography
                  variant="body2"
                  sx={{ fontWeight: 900 }}
                  gutterBottom
                >
                  {location.data[0].name}
                </Typography>
                <Typography variant="caption">
                  {location.data[0].label}
                </Typography>
              </>
            )}
          </div>
        </div>
        <Button
          variant="contained"
          color="secondary"
          className="submit-button"
          onClick={submitLocation}
        >
          Confirm Location
        </Button>
      </div>
    </Fragment>
  )
}

export default SelectDelivery
