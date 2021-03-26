import axios from "axios";

/**
 *
 * @param {longitude, latitude} params
 */
const getLocation = async (lng, lat) => {
  const response = await axios(
    `http://api.positionstack.com/v1/reverse?access_key=${process.env.REACT_APP_GEOCODING_API_KEY}&query=${lat},${lng}&limit=1`
  );
  return response.data;
};

export default getLocation;
