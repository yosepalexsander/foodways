import { Fragment } from "react";
import icon_marker from "../../../assets/icons/icon_marker.png";
import "../mapbox.css";

const StatusOrderBar = ({ location }) => {
  const { location, icon } = props
  return (
    <Fragment>
      <div className="top-right-bar">
        <h6 className="title-bar">
          Waiting for the transaction to be approved
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
                  {location.features[0].text}
                </Typography>
                <Typography variant="caption">
                  {location.features[0].place_name}
                </Typography>
              </>
            )}
          </div>
        </div>
        <div className="footer-bar">
          <h6 className="title-bar">
            Delivery Time
        </h6>
          <p>10 -15 menit</p>

        </div>
      </div>
    </Fragment>
  )
}

export default StatusOrderBar
