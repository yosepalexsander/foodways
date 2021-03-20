import axios from "axios";

/**
 *
 * @param {longitude, latitude} params
 */
const getLocation = async (lng, lat) => {
  const response = await axios(
    `https://api.mapbox.com/geocoding/v5/mapbox.places/${lng},${lat}.json?types=address&access_token=${process.env.REACT_APP_MAPBOX}`
  );
  return response.data;
};

export default getLocation;
