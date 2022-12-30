import { fetchAction } from "../utils";

const APP_BASE_URL = process.env.REACT_APP_BASE_URL;
const APP_BASE_URL_JDS = process.env.REACT_APP_PAYMENT_JDS;

export const getAddresses = ({
  isInClinic,
  isInHouse,
  serviceId,
  userId,
  selectedDate,
  selectedTime,
  radius,
  addressIdForClinics,
}) => {
  return  fetchAction({
        type: "GET_ADDRESSES_LIST",
        verb: "GET",
        headers: { contentType: "includeBearer"},
        endpoint: `${APP_BASE_URL}/Addresses/GetCustomerAddresses/${userId}/true`,
      });
};
export const getAddressesBStatus = ({ 
  serviceId, 
  selectedDate,
  selectedTime, 
  latitude,
  longitude,
  userCountryId,
  serviceVenu,
  distance,
  startTime, 
  endTime,
}) => {
  return   fetchAction({
        type: "GET_ADDRESSES_FOR_BOOKING",
        verb: "POST",
        endpoint: `${APP_BASE_URL_JDS}/Clinic/GetProvidersInSpecificSlot`,
        payload: JSON.stringify({

          bookDate: selectedDate,
          timeStart: startTime,
          timeEnd: endTime,
          latitude: latitude,
          longitude: longitude,
          countryId: userCountryId,
          serviceVenu: serviceVenu,
          serviceId: serviceId,
          distance:distance 

          // serviceID: serviceId,
          // userId: parseInt(userId),
          // inhouse: inhouse,
          // inclinic: isInClinic,
          // genderPreference: "Both",
          // selectedDate: selectedDate,
          // selectedTime: selectedTime,
          // radius,
          // AddressId: addressIdForClinics,
          // cartId:cartId,
          
        }),
      })
     
};
export const getUserHomeAddresses = (userId) => {
  return fetchAction({
    type: "GET_USER_HOME_ADDRESSES",
    verb: "GET",
    headers: { contentType: "includeBearer"},
    endpoint: `${APP_BASE_URL}/Addresses/GetCustomerAddresses/${userId}/true`,
  });
};

export const saveAddress = ({
  addressId,
  location,
  cartId,
  serviceId,
  userId,
  trainingId,
  voucherId,
}) => {
  return fetchAction({
    type: "SAVE_ADDRESS_FOR_BOOKING",
    verb: "POST",
    headers: { contentType: "includeBearer"},
    endpoint: `${APP_BASE_URL}/TempBooking/SaveTempBooking`,
    payload: JSON.stringify({
      userId: userId,
      serviceID: serviceId,
      addressId: addressId,
      location: location,
      cartId: cartId,
      TrainingDetailId: trainingId,
      voucherId,
    }),
  });
};

export const makeNextPageFalse = () => {
  return {
    type: "MAKE_NEXT_PAGE_FALSE",
  };
};

export const CheckServiceAvailability=({
  serviceId ,
  countryId ,
  latitude ,
  longitude ,
})=>{
  return fetchAction({
    type: "CHECK_SERVICES_AVAILABILITY",
    verb: "POST",
    endpoint: `${APP_BASE_URL_JDS}/ServiceAvailability/CheckServiceAvailability`,
    payload: JSON.stringify({
       serviceId : serviceId,
       countryId : countryId,
       latitude : `${latitude}`,
       longitude : `${longitude}`,
       serviceVenu : 2
    }),
  });
}