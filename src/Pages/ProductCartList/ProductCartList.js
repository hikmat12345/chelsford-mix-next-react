// React library 
import React, { useCallback, useEffect, useState } from 'react'
import {  useLocation } from 'react-router-dom';
// Expert Reusable components 
import './ProductCartList.scss'
import { getFileSrcFromPublicFolder } from '../../utils';
import { FAEProductCard , FAEButton, FAETitle, FAELoading } from '@findanexpert-fae/components';
import {  addToCart, getProductsCart } from '../../redux/actions/productActions';
import history from '../../history';
// Other Third party library 
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';
import { useDispatch, useSelector } from 'react-redux'; 
import { ToastContainer, toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FAEFloatingBookingPrice } from '@findanexpert-fae/components/dist/stories/FAEFloatingBookingPrice/FAEFloatingBookingPrice';
 
 function ProductCartList(props) {
  const location = useLocation();  
  const getHistoryState=location.state
  !getHistoryState?.productcartId  &&  history.push('/')
  const loaderImage = getFileSrcFromPublicFolder("loader.GIF");
  const [flagCall, setFlagCall]=useState(true)
  const reduxProducts= useSelector(state=>state)
  const products=reduxProducts.productsReducer
  const dispatch= useDispatch()
  const [productQuantiry, setProductQuantity]= useState(0)
  const [totalPrice, setTotalPrice]= useState([])  
  const [invoice, setInvoice]=useState([{Name: '', ItemPrice:0, Price: 0, Items: 0}])
  useEffect( async() => { 
    await dispatch(getProductsCart(getHistoryState.productcartId)) 
   }, [flagCall]);

  const cartHandler = async (productID, cartId, isDeleted)=>{  
        await dispatch(addToCart(productID,  getHistoryState?.productcartId, productQuantiry, isDeleted))
        await dispatch(getProductsCart(getHistoryState.productcartId))
        setFlagCall(!flagCall) 
  }
 
  const goCustomizeProduct = (productid, productcartId, productisDeleted)=>{
    history.push({pathname:"/add-customize-prod-to-cart", state:{productid:productid, productcartId:productcartId, productisDeleted:productisDeleted}})
  } 
   const placeholderImage = getFileSrcFromPublicFolder("placeholder.jpg");
   const CartPrice= useCallback((pri) => {
        setTotalPrice((t) => [...t, pri]);
    }, [totalPrice]);
 
  const forwardTo =()=>{
    history.push({
      pathname: location.state.savedAttributState.state.pathName,
       state: location.state.savedAttributState.state,
    });
  }  
  const cartListInvoice= products?.allProductCart?.map((product, ind)=> product?.flatDiscount? product?.flatDiscount* product?.quantity:product?.price* product?.quantity)
   return (
    <div className='fae-cart-section'>
    <div className="fae--cart-page-container cart-containter dpt dpb">
      <div className="fae--cart-page-wrapper"> 
        {products?.loading && (
          <FAELoading type="svg" loaderImage={loaderImage} height="200px" />
         )} 
         { !products.loading ?  
         <>
           <div className="product-list-header">
              <div>
              </div>
              <div> 
                 <FAETitle
                    className="fae-cart-title"
                    label="Cart"
                    logo={getFileSrcFromPublicFolder("title_logo.svg")}
                  />
               </div>  
              <div>
                {invoice && (
                  <FAEFloatingBookingPrice
                    currencySymbol={ products?.allProductCart[0]?.currencySymbol}
                    justify="flex-end"
                    price={cartListInvoice.reduce((t,num)=>t+num,0)}
                    backgroundImage={getFileSrcFromPublicFolder("parchii_icon.svg")}
                  />
                )}
              </div>
          </div>
          {products?.allProductCart?.length !==0 ?
              products?.allProductCart?.map((product, index)=>
                (<div className="fae--cart-page-services-wrapper"  key={index}>
                   <FAEProductCard 
                      src={product?.imagePath} 
                      label={product?.productName}
                      shortDescription={product?.description}
                      discountedPrice={product?.flatDiscount}
                      price={product?.price}
                      currencySymbol={product?.currencySymbol}
                      primary={false }  
                      type='img'
                      alt='product image' 
                      placeholder={placeholderImage}
                      textOnImage={''} 
                      textPosition='' 
                      noOfProductsAdded = {product?.quantity}  
                      onClick ={()=>product?.hasProductAttributes=== true?goCustomizeProduct(product?.productID, product?.cartId, product?.isDeleted):cartHandler(product?.productID, product?.cartId, product?.isDeleted )}
                      getQuantityOfProducts = {(e) =>setProductQuantity(e)} 
                     
                    />  
                    {product?.percentageDiscount !==0 && <span className='fae-cart-disc-percent'>{product?.percentageDiscount !==0 && `${product?.percentageDiscount}%`}</span>}
                    <FAEButton className='fae-cart-del-btn' onClick={()=>cartHandler(product?.productID, product?.cartId, true )}><DeleteOutlineIcon/></FAEButton>
                  </div> 
                  ))
                 :'Not found'
                 }
               </>
               : 'Not found'
              }
           </div> 
         </div>
       { products?.allProductCart?.length !==0 ? <FAEButton className='fae-prodcut-next-btn' onClick={forwardTo}>NEXT</FAEButton>:''}
       < >
         
       </>
       
        <ToastContainer/>
      </div>
    )
  }

export default ProductCartList
