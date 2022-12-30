import { fetchAction } from "../utils"
const APP_BASE_URL = process.env.REACT_APP_BASE_URL;
const APP_BASE_URL_2 = process.env.REACT_APP_BASE_URL_2;
const APP_BASE_URL_NEW= process.env.REACT_APP_BASE_URL_NEW_2
export const getAllProducts=(pagenumber,rowsOfPage, categoryId, cartId)=>{ 
    
    return(
        fetchAction({
            type: "GET_ALL_RODUCTS",
            verb: "POST",
            headers: { contentType: "includeBearer"},
            endpoint:`${APP_BASE_URL}/Product/GetCategorytoproductList`,
            payload: JSON.stringify(
                {
                    pageNumber: pagenumber,
                    rowsOfPage: rowsOfPage,
                    categoryId:categoryId,
                    cartId : cartId
              } 
            )
        })  
    )
}

export const getAllCategoryList=(productId)=>{
     
    return (
        fetchAction({
            type:"GET_ALL_CATEGORY",
            headers: { contentType: "includeBearer"},
            endpoint: `${APP_BASE_URL_NEW}/Category`,
            verb:'GET'
        })
     )
  }

export const addToCart=(productID, cartId, items, isDeleted)=>{
     return (
        fetchAction({
            type: "ADD_TO_CART",
            verb: "POST",
            headers: { contentType: "includeBearer"},
            endpoint:`${APP_BASE_URL}/Product/AddRemoveToCart`,
            payload: JSON.stringify(
                { 
                  productID: productID,
                  cartId: `${cartId}`,
                  items: items,
                  isDeleted: isDeleted 
              } 
            )
        })
          
    )
}
export const getProductsCart= (cartid)=>{
    return (
        fetchAction({
            type:'GET_ALL_PRODUCT_CART',
            verb: "GET",
            headers: { contentType: "includeBearer"},
            endpoint:`${APP_BASE_URL}/Product/GetCartDetail/${cartid}`,
        })
    )
} 
 

export const ProductAttribute= (prodId)=>{
    return (
        fetchAction({
            type:'GET_ATTRIBUT_TYPE_PRODUCT',
            verb:'GET',
            headers: { contentType: "includeBearer"},
            endpoint:`${APP_BASE_URL}/ProductAttribute/${prodId}`
        })
    )
}

export const getProductVideoAndImages = (cartId) => {
    return(
     fetchAction({
      type: "GET_PRODUCT_UPLOADED_IMAGES_AND_VIDEOS",
      headers: { contentType: "includeBearer"},
      endpoint: `${APP_BASE_URL_2}/BookingAttachments/GetBookingAttachments_Expert?CartId=${cartId}`,
      verb: "GET",
      })
    )  
    
  };

  export const AtrributProductToCart= (bookingid,attrcartId, productid, itemNo, tempBookingID, attrIdAttrValue )=>{
      return(
          fetchAction({
              type:"SET_ATTRIBUTE_TYPE_PRODUCT",
              endpoint: `${APP_BASE_URL}/BookingAttribute/SaveProductBookingAttributes`,
              verb:'POST',
              headers: { contentType: "includeBearer"},
              payload: JSON.stringify({
                bookingID: bookingid,
                cartId: attrcartId,
                productId: productid,
                itemNo: itemNo,
                tempBookingID: tempBookingID,
                attributes: attrIdAttrValue 
               })
          })
      )
  }