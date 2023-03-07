import Cookies from "universal-cookie";
import { toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; 

const cookies = new Cookies();

//empty-object
export const objectIsEmpty = (obj) => {
   
  return  Object?.keys((obj !==undefined && obj !==undefined) ?obj:{} )?.length === 0 ? true : false;
};

//set-cookie
export const setCookies = (name, value, expires) => {
  var date = new Date();
  date.setTime(date.getTime() + expires * 10000);
  cookies.set(name, value, {
    path: "/",
    expires: date,
  });
};

//get-cookie
export const getCookies = (name) => {
  return cookies.get(name);
};

//remove-cookies
export const removeCookies = (name) => {
  cookies.remove(name, { path: "/" });
};

//setLocalStorageStringified
export const setLocalStorageStringified = (name, value) => {
  localStorage.setItem(name, JSON.stringify(value));
};

//getLocalStorageParsed
export const getLocalStorageParsed = (name) => {
  return JSON.parse(localStorage.getItem(name));
};

//setSessionStorageStringified
export const setSessionStorageStringified = (name, value) => {
  sessionStorage.setItem(name, JSON.stringify(value));
};

//getSessionStorageParsed
export const getSessionStorageParsed = (name) => {
  return JSON.parse(sessionStorage.getItem(name));
};

//setLocalStorage
export const setLocalStorage = (name, value) => {
  localStorage.setItem(name, value);
};

//getLocalStorage
export const getLocalStorage = (name) => {
  return localStorage.getItem(name);
};

//setSessionStorage
export const setSessionStorage = (name, value) => {
  sessionStorage.setItem(name, value);
};

//getSessionStorage
export const getSessionStorage = (name) => {
  return sessionStorage.getItem(name);
};

//getImageOrVideoFromPublicFolder
export const getFileSrcFromPublicFolder = (name) => {
  return `${process.env.PUBLIC_URL}/assets/images/${name}`;
};
export const getFileSrcFromPublicFolderSpcialLHR = (name) => {
  return `${process.env.PUBLIC_URL}/assets/specialLHR/${name}`;
};
export const getFileSrcFromPublicFolderLandingPage =(name)=>{
  return `${process.env.PUBLIC_URL}/assets/landingPage/${name}`; 
}
export const getFileSrcFromPublicFolderOther =(name)=>{
  return `${process.env.PUBLIC_URL}/assets/contentDetailPageImg/${name}`; 
}
//validate-input
export const validateInput = (regex, value) => {
  return new RegExp(regex).test(value);
};

//get-unique-data-array
export const getUniqueData = (array, key) => {
  if (typeof key !== "function") {
    const property = key;
    key = function (item) {
      return item[property];
    };
  }
  return Array.from(
    array
      .reduce(function (map, item) {
        const k = key(item);
        if (!map.has(k)) map.set(k, item);
        return map;
      }, new Map())
      .values()
  );
};
// replace all symbole by space 
export const  replaceSymbolToSpace=(string, value)=>{
  const pattren= /([\/\,\!\\\^\$\{\}\[\]\(\)\.\*\+\%\?\|\<\>\-\&])/g
 var filterString= string.replace(pattren,value )
 return filterString
}
//replace spaces
export const replaceSpaces = (string, value) => {
  return string?.replaceAll(" ", value);
};

//add spaces
export const addSpaces = (string, value) => {
  return string?.replaceAll(value, " ");
};

//18 years back date
export const eighteenYearsBackDate = () => {
  let today = new Date();
  let dd = String(today.getDate()).padStart(2, "0");
  let mm = String(today.getMonth() + 1).padStart(2, "0");
  let yyyy = today.getFullYear();

  today = mm + "/" + dd + "/" + yyyy;
  let eighteenYearsBack = yyyy - 18;
  eighteenYearsBack = {
    day: parseInt(dd),
    month: parseInt(mm),
    year: eighteenYearsBack,
  };

  return eighteenYearsBack;
};

//address-divide
export const divideAddress = (address) => {
  //street Number
  const buildingNumber = address.some((obj) =>
    obj.types.includes("street_number")
  )
    ? address.find((obj) => obj.types.includes("street_number")).long_name
    : "";

  //street Address
  const streetAddress = `${
    address.some((obj) => obj.types.includes("route"))
      ? address.find((obj) => obj.types.includes("route")).long_name
      : ""
  } ${
    address.some((obj) => obj.types.includes("plus_code"))
      ? address.find((obj) => obj.types.includes("plus_code")).long_name
      : ""
  } ${
    address.some((obj) =>
      obj.types.some((area) => area.split("_").includes("sublocality"))
    )
      ? address.find((obj) =>
          obj.types.some((area) => area.split("_").includes("sublocality"))
        ).long_name
      : ""
  } ${
    address.some((obj) =>
      obj.types.some((area) => area.split("_").includes("locality"))
    )
      ? address.find((obj) =>
          obj.types.some((area) => area.split("_").includes("locality"))
        ).long_name
      : ""
  }`;

  //city
  const city = `${
    address.some((obj) =>
      obj.types.some((area) => area.split("_").includes("administrative"))
    )
      ? address.find((obj) =>
          obj.types.some((area) => area.split("_").includes("administrative"))
        ).long_name
      : ""
  }`;

  //postal code
  const postCode = address.some((obj) => obj.types.includes("postal_code"))
    ? address.find((obj) => obj.types.includes("postal_code")).long_name
    : "";

  return {
    buildingNumber,
    streetAddress,
    city,
    postCode,
  };
};

// empty array message in fallback 
export function NoResult(loading, arrayName ,text){
return (!loading && Array.isArray(arrayName) ? (arrayName?.length !==0? "":<p className="ResultEmpty"  style={{textAlign: "center"}}>{text !=="" ?text:<img src={getFileSrcFromPublicFolder("result not found-img.png")} />}</p>):"")
}
// data url to file image 
export function dataURLtoFile(dataurl) {
  var arr = dataurl.split(","),
    mime = arr[0].match(/:(.*?);/)[1],
    bstr = atob(arr[1]),
    n = bstr.length,
    u8arr = new Uint8Array(n) ;
    var filename =
      "signature" + Math.floor(Math.random() * 999) + "." + mime.split("/")[1];
    while (n--) {
      u8arr[n] = bstr.charCodeAt(n)  ;
    } 
    return new File([u8arr], filename, { type: mime });
} 

// today date function 
export const todayDate= `${new Date().getFullYear()}-${
  `${new Date().getMonth() + 1}`.length === 1
    ? `0${new Date().getMonth() + 1}`
    : new Date().getMonth() + 1
}-${
  `${new Date().getDate()}`.length === 1
    ? `0${new Date().getDate()}`
    : new Date().getDate()
}`


// toaster 
 
export const FAEToaster=({
    toaster="success",
    message,
    position= "bottom-right",
    autoClose= 5000
})=>{
  if(toaster=="success"){
        toast.success(`${message}`, {
             position: position,
             autoClose: autoClose,
             hideProgressBar: false,
             closeOnClick: true,
             pauseOnHover: true,
             draggable: true,
             progress: undefined,
          })
      } else if(toaster=="error"){
        toast.error(message, {
            position: position,
            autoClose: autoClose,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
        })
      }
    }

    // capitialize 
 export   const capitialize=(string)=>{ 
   const completeLine=   string?.split(" ")?.map((eachString)=>{
    return  eachString?.charAt()?.toUpperCase()+eachString?.slice(1)
     }) 
      return  completeLine?.toString()?.replaceAll(",", " ")
    }

    // alphabet date to digits formate 
  export const DataToDigits=(bookingDate)=>{
    return new Date(bookingDate).getFullYear()+"-"+("0" + new Date(bookingDate).getMonth()).slice(-2)+"-"+ ("0" + new Date(bookingDate).getDay()).slice(-2)
  }
    