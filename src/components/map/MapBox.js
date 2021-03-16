import { useRef, useEffect, useState, forwardRef } from "react";

import mapboxgl from "mapbox-gl/dist/mapbox-gl-csp";
// eslint-disable-next-line import/no-webpack-loader-syntax
import MapboxWorker from "worker-loader!mapbox-gl/dist/mapbox-gl-csp-worker";

import { Paper, Typography } from "@material-ui/core";
import icon_marker from "../../assets/icons/icon_marker.png";
import "./mapbox.css";

mapboxgl.workerClass = MapboxWorker;
mapboxgl.accessToken = process.env.REACT_APP_MAPBOX;

const MapBox = forwardRef(({ children }, ref) => {
  const mapContainer = useRef(null);
  const [lng, setLng] = useState(106.774124);
  const [lat, setLat] = useState(-6.2145);
  const [zoom, setZoom] = useState(9);

  const submitLocation = (e) => {
    e.preventDefault();
  };
  useEffect(() => {
    const map = new mapboxgl.Map({
      container: mapContainer.current,
      style: "mapbox://styles/mapbox/streets-v11",
      center: [lng, lat],
      zoom: zoom,
    });
    const el = document.createElement("div");
    el.className = "marker";
    const marker = new mapboxgl.Marker({ el, color: "red", draggable: true })
      .setLngLat([lng, lat])
      .addTo(map);
    map.on("move", () => {
      setLng(map.getCenter().lng.toFixed(4));
      setLat(map.getCenter().lat.toFixed(4));
      setZoom(map.getZoom().toFixed(2));
    });
    return () => map.remove();
  }, []);
  return (
    <Paper
      ref={ref}
      tabIndex={-1}
      sx={{
        position: "absolute",
        mx: "50vh",
        transform: "translateY(-50%)",
        bottom: 100,
        p: 2,
        width: "50%",
        height: "50%",
      }}
    >
      {children}
      <div className="sidebar">
        <Typography component="p" variant="h6" gutterBottom>
          Select Delivery Location
        </Typography>
        <div className="flex">
          <div className="sidebar-marker">
            <img src={icon_marker} alt="marker" />
          </div>
          <div className="sidebar-location">
            <Typography variant="h6" color="textSecondary">
              Nama Lokasi
            </Typography>
            <Typography variant="h6" color="textSecondary">
              alamat
            </Typography>
          </div>
        </div>
      </div>
      <div className="mapContainer" ref={mapContainer}></div>
    </Paper>
  );
});

export default MapBox;
