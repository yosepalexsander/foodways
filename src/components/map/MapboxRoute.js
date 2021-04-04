import { useRef, useEffect, useState } from "react";

import mapboxgl from "mapbox-gl/dist/mapbox-gl-csp";
// eslint-disable-next-line import/no-webpack-loader-syntax
import MapboxWorker from "worker-loader!mapbox-gl/dist/mapbox-gl-csp-worker";

import { getDirections, getLocation } from "../../api/mapApi";
import StatusOrderBar from "./infobar/StatusOrderBar";
import "./mapbox.css";

mapboxgl.workerClass = MapboxWorker;
mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_API_KEY;

const MapboxRoute = (props) => {
  const { locationStart, locationEnd, deliveryStatus, handleUpdate } = props;
  const mapContainer = useRef(null);
  const [location, setLocation] = useState(null);
  const [duration, setDuration] = useState(null);

  const getStartLocation = async () => {
    const data = await getLocation(locationEnd[0], locationEnd[1]);
    setLocation({
      name: data.features[0].text,
      address: data.features[0].place_name
    })
  }
  const directions = async () => {
    const data = await getDirections(locationStart, locationEnd);
    const route = data.routes[0]
    const geojson = {
      type: 'Feature',
      properties: {},
      geometry: {
        type: 'LineString',
        coordinates: route.geometry.coordinates,
      },
    };
    setDuration(route.duration)
    return geojson
  }
  useEffect(() => {
    let maps;
    directions()
      .then(geojson => {
        maps = setupMap(locationStart, locationEnd, geojson)
      })
    getStartLocation()
    return () => maps.remove();
  }, []);

  const setupMap = (loc1, loc2, route) => {
    const map = new mapboxgl.Map({
      container: mapContainer.current,
      style: "mapbox://styles/mapbox/streets-v11",
      center: loc1,
      zoom: 12
    });
    map.on("load", () => {
      map.addSource("routes", {
        "type": 'geojson',
        "data": {
          "type": 'Feature',
          "properties": {},
          "geometry": {
            "type": 'LineString',
            "coordinates": route?.geometry?.coordinates
          }
        }
      });

      map.addLayer({
        "id": "routes",
        "type": "line",
        "source": "routes",
        "layout": {
          'line-join': 'round',
          'line-cap': 'round'
        },
        "paint": {
          'line-color': '#433434',
          'line-width': 7,
          'line-opacity': 0.75
        }
      });
    });
    const nav = new mapboxgl.NavigationControl();
    map.addControl(nav, 'top-left');

    const marker = new mapboxgl.Marker({ color: "red", draggable: true })
      .setLngLat(loc2)
      .addTo(map);

    return map;
  }

  return (
    <>
      <StatusOrderBar
        location={location}
        duration={duration}
        status={deliveryStatus}
        onClickUpdate={handleUpdate} />
      <div className="mapContainer" ref={mapContainer}></div>
    </>
  );
};

export default MapboxRoute;