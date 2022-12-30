  
export const changeULocId = ( changedcountryId, userCountry, userCurrencyCode) => {
    
    return {
      type: "CHANGE_USER_LOCATION_ID_RESPONSE",
      payload: { countryId: changedcountryId,
                 userCountry: userCountry,
                 userCurrencyCode:userCurrencyCode
              },
        };
  };