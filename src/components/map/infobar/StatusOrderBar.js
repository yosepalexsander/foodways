import { Fragment } from "react";
import { Button, Typography } from "@material-ui/core";
import icon_marker from "../../../assets/icons/icon_marker.png";
import "../mapbox.css";

const StatusOrderBar = (props) => {
  const { duration, status, location, onClickUpdate } = props
  return (
    <Fragment>
      <div className="top-right-bar">
        {status === "waiting approve" ? (
          <h6 className="title-bar">
            Waiting for the transaction to be approved
          </h6>
        ) : status === "on the way" ? (
          <h6 className="title-bar">
            Delivery is On The Way
          </h6>
        ) : status === "success" ? (
          <h6 className="title-bar">
            Delivery has Finished
          </h6>
        ) : (
          <h6 className="title-bar">
            Delivery has Canceled by Restaurant
          </h6>
        )}
        <div className="flex">
          <div className="marker">
            <img src={icon_marker} alt="marker" />
          </div>
          <div className="location">
            <Typography
              variant="body2"
              sx={{ fontWeight: 900 }}
              gutterBottom
            >
              {location?.name}
            </Typography>
            <Typography variant="caption">
              {location?.address}
            </Typography>
          </div>
        </div>
        <div className="footer-bar">
          <h6 className="title-bar">
            Delivery Time
        </h6>
          <p>{Math.round(duration / 60)} - {Math.round(duration / 60) + 6} Minutes</p>
          {status === "on the way" && (
            <Button onClick={onClickUpdate} variant="contained" color="secondary" fullWidth>
              Finish your order
            </Button>
          )}
        </div>
      </div>
    </Fragment>
  )
}

export default StatusOrderBar
