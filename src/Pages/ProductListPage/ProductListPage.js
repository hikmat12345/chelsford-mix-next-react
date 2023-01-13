// libarary
import React, { useEffect, useState } from 'react'
// Third party library 
import { useDispatch, useSelector } from 'react-redux';
import {  useLocation, useParams} from 'react-router-dom';
import { ToastContainer, toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; 
import ShoppingCartOutlinedIcon from '@material-ui/icons/ShoppingCartOutlined';
// Expert Components 
import './ProductListPage.scss'
import { FAEText, FAEButton, FAEProductCard, FAELoading } from '@findanexpert-fae/components';
import { getFileSrcFromPublicFolder } from '../../utils';
import history from '../../history'; 
import { addToCart, getAllCategoryList, getAllProducts, getProductsCart } from '../../redux/actions/productActions';
import { FAEFloatingBookingPrice } from '@findanexpert-fae/components/dist/stories/FAEFloatingBookingPrice/FAEFloatingBookingPrice';
 
function ProductListPage() {
   const dispatch= useDispatch()
   const reduxProducts= useSelector(state=>state)
   const products=reduxProducts.productsReducer.productsList
   const categoryList= reduxProducts.productsReducer.allCategoryList;
   const [state, setstate] = useState(categoryList[0].id == undefined ?1:categoryList[0].id);
   const [productQuantiry, setProductQuantity]= useState()
   const [flag, setFlag]=useState(true)
   const location = useLocation();
    
   const { service } = useParams();
    useEffect( async() => { 
        await dispatch(getAllCategoryList())
      }, [state]);

    useEffect( async() => {
        await dispatch(getProductsCart(getCartid)) 
        await dispatch(getAllProducts( 1, 50, 1,  getCartid ))  
      }, [flag]);  
  
   const cartHandler = async (productID, cartId, isDeleted)=>{
     if(productQuantiry===0 || productQuantiry===undefined){
         toast.error(`Sorry product quantity should not empty.`, {
              position: "bottom-right",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
           })
       } else {
          await  dispatch(addToCart(productID, cartId, productQuantiry, isDeleted))
          await dispatch(getProductsCart(getCartid)) 
          await cartProduct.addedToCart.message==="Success"? toast.success(`Successfully added cart.`, {
                position: "bottom-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
          }):
         toast.error(`Sorry Product not added to cart.`, {
            position: "bottom-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          })
        setFlag(!flag)
      }
    } 
    const handleCategory =async (id)=>{
       await dispatch(getAllProducts( 1, 70, id,  getCartid )) 
       setstate(id)
    } 
    const goCustomizeProduct = (productid, productcartId, productisDeleted)=>{
       history.push({pathname:"/add-customize-prod-to-cart", state:{productid:productid, productcartId:productcartId, productisDeleted:productisDeleted,  productQuantiry: productQuantiry, service:service, bookingId:location.state.bookingId}})
    }
    const goTo=()=>{
       history.push({pathname:"/addto-cart-list", state:{ productcartId:getCartid,  productQuantiry: productQuantiry, service:service, savedAttributState:location}})
    }
    let saveStateToNext= location?.state
    const submitToNext=(e)=>{  
      e.preventDefault()
      history.push({pathname:`/booking/${service}/summary`, state:{...saveStateToNext}})
    }

    const loaderImage = getFileSrcFromPublicFolder("loader.GIF");
    const placeholderImage = getFileSrcFromPublicFolder("placeholder.jpg");
    const getCartid=location?.state?.cartId 
    !getCartid  &&  history.push('/') 
    const cartProduct = reduxProducts.productsReducer 
  return (
    <div id='fae-prodcut-list'>
      {cartProduct.loading && (
        <FAELoading type="svg" loaderImage={loaderImage} height="200px" />
      )}  
      {/* category section start  */}
      { !cartProduct.loading &&
      <>
      <div className='cateogry-sec'>
        {categoryList?.length && categoryList?.map((item, index)=><FAEButton onClick={()=>handleCategory(item.id)} key ={index} className={state===item.id?'active':''}>{item.name}</FAEButton>)}
      </div>
        { /* prodcut list header */ }
        <div className="product-list-header">
            <div onClick={goTo}><span><ShoppingCartOutlinedIcon/></span>  <span>{cartProduct?.allProductCart?.length}</span> </div>
            <div><FAEText bold={true}>{location?.state?.bookingName?.replace(':', ' ')}</FAEText></div>  
            <div> </div>
        </div> 
        <ul className='product-list'>
           {products?.length !==0 ? products?.map((product, index)=>
            (<li key={index}>
               <FAEProductCard 
                src={product.imagePath} 
                label={product.name}
                shortDescription={product.description}
                discountedPrice={product.flatDiscount}
                price={product.price}
                currencySymbol={product.currencySymbol} 
                primary={product.hasProductAttributes=== true?false:true } 
                type='img'
                alt='product image' 
                placeholder={placeholderImage}
                textOnImage={product.percentageDiscount !==0 && `${product.percentageDiscount}%`} 
                textPosition='np'
                noOfProductsAdded = {product.quantity}  
                onClick ={()=>product.hasProductAttributes=== true?goCustomizeProduct(product.id,  getCartid, product.isDeleted):cartHandler(product.id, getCartid, product.isDeleted )}
                getQuantityOfProducts = {(e)=>setProductQuantity(e)} 
                
               /> 
             </li> )) : <div className='fae-product-not-found' >Product Not Found.</div>}
           </ul> 
           <FAEButton onClick={submitToNext} type="submit" className="add-product-list-btn"  >Next</FAEButton>  
         <ToastContainer/>
       </>
      }
    </div>
  )
}

export default ProductListPage 