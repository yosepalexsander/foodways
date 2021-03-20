import { useRef, useEffect, useState, forwardRef } from "react";

import mapboxgl from "mapbox-gl/dist/mapbox-gl-csp";
// eslint-disable-next-line import/no-webpack-loader-syntax
import MapboxWorker from "worker-loader!mapbox-gl/dist/mapbox-gl-csp-worker";

import { Button, Paper, Typography } from "@material-ui/core";
import icon_marker from "../../assets/icons/icon_marker.png";
import getLocation from "../../api/mapApi";
import "./mapbox.css";

mapboxgl.workerClass = MapboxWorker;
mapboxgl.accessToken = process.env.REACT_APP_MAPBOX;
const styles = {
  paper: {
    position: "relative",
    mt: "10rem",
    mx: "auto",
    p: 2,
    width: "60%",
    height: "60%",
  },
  titleBar: {
    fontFamily: "Cabin, sans-serif",
    fontWeight: 900,
    mb: 2,
    fontSize: "1.125rem",
    lineHeight: "24.59px",
  },
  fontWeight: {
    fontWeight: 900,
  },
  submitButton: {
    width: "100%",
    height: 30,
    mt: 2,
  },
};
const MapBox = forwardRef((props, ref) => {
  const mapContainer = useRef(null);
  const [lng] = useState(-73.989);
  const [lat] = useState(40.733);
  const [zoom] = useState(14);
  const [location, setLocation] = useState(null);

  const submitLocation = () => {
    console.log("success");
  };
  useEffect(() => {
    const map = new mapboxgl.Map({
      container: mapContainer.current,
      style: "mapbox://styles/mapbox/streets-v11",
      center: [lng, lat],
      zoom: zoom,
    });
    const marker = new mapboxgl.Marker({ draggable: true })
      .setLngLat([lng, lat])
      .addTo(map);

    marker.on("dragend", async () => {
      const markLng = marker.getLngLat().lng.toFixed(5);
      const markLat = marker.getLngLat().lat.toFixed(5);
      const data = await getLocation(markLng, markLat);
      setLocation(data);
    });
    return () => map.remove();
  }, []);
  return (
    <Paper ref={ref} tabIndex={-1} sx={styles.paper}>
      <div className="sidebar">
        <div>
          <Typography variant="h6" gutterBottom sx={styles.titleBar}>
            Select Delivery Location
          </Typography>
          <div className="flex">
            <div className="sidebar-marker">
              <img src={icon_marker} alt="marker" />
            </div>
            <div className="sidebar-location">
              {location && (
                <>
                  <Typography
                    variant="body2"
                    sx={styles.fontWeight}
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
        </div>
        <Button
          variant="contained"
          color="secondary"
          sx={styles.submitButton}
          onClick={submitLocation}
        >
          Confirm Location
        </Button>
      </div>
      <div className="mapContainer" ref={mapContainer}></div>
    </Paper>
  );
});

export default MapBox;
