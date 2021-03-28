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
            name: location.features[0].place_name
          }
        }
      })
    } else {
      userDispatch({
        type: "ADD_LOCATION",
        payload: {
          location: {
            geolocation: geolocation.join(','),
            name: location.features[0].place_name
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
            {(location && location.features.length >= 1) && (
              <>
                <Typography
                  variant="body2"
                  sx={{ fontWeight: 900 }}
                  gutterBottom
                >
                  {location.features[0].text}
                </Typography>
                <Typography variant="caption">
                  {location.features[0].place_name}
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
