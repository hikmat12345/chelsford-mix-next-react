const APP_BASE_URL = process.env.REACT_APP_BASE_URL;
 export async function allServicesApi(countryid, pagenumber, rowsofpage) {
  try {
    let prop = await fetch(`${APP_BASE_URL}/Services/GetAllServicesForHomePage/${countryid? countryid: 171 }/${pagenumber?pagenumber:1}/${rowsofpage }`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json", 
      },
    });
    let result = await prop.json(); 
    return result;
  } catch (error) {
    console.log(error);
  }
}

 