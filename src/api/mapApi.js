import axios from "axios";

export const getLocation = async (lng, lat) => {
  const response = await axios.get(
    `https://api.mapbox.com/geocoding/v5/mapbox.places/${lng},${lat}.json?types=poi&access_token=${process.env.REACT_APP_MAPBOX_API_KEY}`
  );
  return response.data;
};

export const getDirections = async (loc1, loc2) => {
  const response = await axios.get(
    `https://api.mapbox.com/directions/v5/mapbox/driving/${loc1[0]},${loc1[1]};${loc2[0]},${loc2[1]}?geometries=geojson&access_token=${process.env.REACT_APP_MAPBOX_API_KEY}`
  );
  return response.data;
};

