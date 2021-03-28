import { useRef, useEffect, useState, forwardRef } from "react";

import mapboxgl from "mapbox-gl/dist/mapbox-gl-csp";
// eslint-disable-next-line import/no-webpack-loader-syntax
import MapboxWorker from "worker-loader!mapbox-gl/dist/mapbox-gl-csp-worker";

import { Paper } from "@material-ui/core";
import getLocation from "../../api/mapApi";
import "./mapbox.css";
import DeliveryBar from "./infobar/DeliveryBar";

mapboxgl.workerClass = MapboxWorker;
mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_API_KEY;
const styles = {
  paper: {
    position: "relative",
    mt: "10rem",
    mx: "auto",
    p: 2,
    width: "60%",
    height: "60%",
  }
};
const MapBox = forwardRef((props, ref) => {
  const { page } = props
  const mapContainer = useRef(null);
  const [lng, setLng] = useState(106.774124);
  const [lat, setLat] = useState(-6.121435);
  const [zoom] = useState(14);
  const [location, setLocation] = useState(null);

  useEffect(() => {
    let maps;
    navigator.geolocation.getCurrentPosition(
      function (position) {
        maps = setupMap([position.coords.longitude, position.coords.latitude]);
      },
      function () {
        maps = setupMap([lng, lat]);
      }, {
      enableHighAccuracy: true
    });

    return () => maps.remove();
  }, []);

  const setupMap = (center) => {
    const map = new mapboxgl.Map({
      container: mapContainer.current,
      style: "mapbox://styles/mapbox/streets-v11",
      center: center,
      zoom: zoom,
    });
    const nav = new mapboxgl.NavigationControl();
    map.addControl(nav);
    const marker = new mapboxgl.Marker({ color: "red", draggable: true })
      .setLngLat(center)
      .addTo(map);

    marker.on("dragend", async () => {
      const markLng = marker.getLngLat().lng.toFixed(5);
      const markLat = marker.getLngLat().lat.toFixed(5);
      setLng(markLng);
      setLat(markLat);
      const data = await getLocation(markLng, markLat);
      setLocation(data);
    });

    return map
  }
  return (
    <Paper ref={ref} tabIndex={-1} sx={styles.paper}>
      <DeliveryBar location={location} geolocation={[lng, lat]} page={page} />
      <div className="mapContainer" ref={mapContainer}></div>
    </Paper>
  );
});

export default MapBox;
