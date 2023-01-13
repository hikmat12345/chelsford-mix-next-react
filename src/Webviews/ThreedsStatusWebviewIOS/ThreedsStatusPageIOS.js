//libs
import React, { createRef, useEffect, useState } from "react"; 
import { FAEText, FAELoading } from "@findanexpert-fae/components"; 

//src
import { ThreedsStatus } from "./action"; 

//scss
import "./ThreedsStatus.scss"; 
import { getFileSrcFromPublicFolder } from "../../utils";
import { FAEButton } from "@findanexpert-fae/components/dist/stories/FAEButton/FAEButton";

const ThreedsStatusPageIOS = () => { 
  const [status, setStatus]=useState({code:400})
  const cartId = new URLSearchParams(window.location.search).get("cartId");
  const transactionId = new URLSearchParams(window.location.search).get("transactionId");
  const [loading, setLoading]= useState(false)
    var isFoo = window.location.href.indexOf('foo.com') > -1;
    var body = document.getElementsByTagName("body")[0];
    var classValue = isFoo ? 'foo-class' : 'threeds-body-class';
    body.className = body.className + ' '+ classValue; 
  
  // useEffect(async () => { 
  //  await  ThreedsStatus({
  //           cartId,
  //           transactionId,
  //           callback: (res) =>  
  //           window.webkit.messageHandlers.ThreedsStatusFun.postMessage(  
  //             res?.code, res?.message, res?.reason,  res?.redirectUrl, res?.returnUrl, res?.setupIntentResponseDetail, res?.error
  //           ),
  //       }).then((res=>{
  //         setStatus(res)
  //       }));
  // }, []);
 async function setThreeDsStatus(code, error, message) {
   setLoading(true)
    await  ThreedsStatus({
            cartId,
            transactionId,
            callback: (res) =>window.webkit.messageHandlers.ThreedsStatusFun.postMessage( res)
     });
   await setLoading(false)
   }
  const { code, message, reason,  redirectUrl, returnUrl, setupIntentResponseDetail, error}=status
 
const loaderImage = getFileSrcFromPublicFolder("loader.GIF");
  return ( 
      <div className="fae-threeds-webview">
       { loading && 
       <FAEText style={{textAlign:"center"}}>
         <FAELoading type="svg" loaderImage={loaderImage} height="200px" />
          Loading ...
       </FAEText>}
        <>
        <FAEText>
          {message} 
        </FAEText>
        <FAEButton onClick={()=>setThreeDsStatus(code, error, message )}>
          Proceed
        </FAEButton>
       </> 
    </div>
      
  );
};

export default ThreedsStatusPageIOS;
