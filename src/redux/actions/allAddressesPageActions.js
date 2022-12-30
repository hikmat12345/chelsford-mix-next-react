import { fetchAction } from "../utils";

const APP_BASE_URL = process.env.REACT_APP_BASE_URL;

export const getAllAddresses = (userId) => {
  return fetchAction({
    type: "GET_ALL_ADDRESSES",
    verb: "GET",
    headers: { contentType: "includeBearer"},
    endpoint: `${APP_BASE_URL}/Addresses/GetCustomerAddresses/${userId}/true`,
  });
};

export const deleteAddress = (addressId) => {
  return fetchAction({
    type: "DELETE_ADDRESS",
    verb: "POST",
    headers: { contentType: "includeBearer"},
    endpoint: `${APP_BASE_URL}/Providers/Address/delete`,
    payload: JSON.stringify({
      ID: addressId,
    }),
  });
};
