const initialState = {
    error: null,
    loadingAllServices: true, 
    getallServiesData:[]
  };
  
  const allServicesHomePage = (state = initialState, action) => {
    const { payload, type } = action;
    switch (type) {  
    case "GET_ALL_SERVICES_REQUEST":
        return {...state, loadingAllServices:true } 
    case "GET_ALL_SERVICES_RESPONSE":
        return {...state, loadingAllServices:false,  getallServiesData:action.payload} 
    case "GET_ALL_SERVICES_ERROR":
        return {...state, loadingAllServices:true} 
    default:
        return { ...state };
    }
  };
  
  export default allServicesHomePage;
  