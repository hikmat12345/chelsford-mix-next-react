import { fetchAction } from "../utils";

const APP_BASE_URL = process.env.REACT_APP_BASE_URL;

export const getTrainingDetails = ({ serviceId }) => {
  return fetchAction({
    type: "GET_TRAINING_LIST_DETAILS",
    verb: "GET",
    headers: { contentType: "includeBearer"},
    endpoint: `${APP_BASE_URL}/Services/GetTrainingDetails/${serviceId}`,
  });
};
