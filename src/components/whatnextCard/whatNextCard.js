import { useState } from "react"
import { Link } from "react-router-dom"
import { getFileSrcFromPublicFolderSpcialLHR, replaceSpaces } from "../../utils"
import "./whatNextCard.scss"
function WhatNextCard({what_next}) {
    
  return (
    <div className='mt-4 col-md-12 ' > 
       <div className="what-next-card-cont"> 
        {/* card  */}
        {what_next?.map((what_next_cont, index)=>{
           return (
           <div className="mx-1 mt-4 next-card-col">
                <div className={`py-2 col-md-12 background_card_color${index+1}`}>
                    <div className="text-center col-md-12">
                        <img className="img-fluid" src={getFileSrcFromPublicFolderSpcialLHR("hat"+(index+1)+".png")} />
                    </div>
                    <div className="p-0 text-center col-md-12">
                        <p className="pt-3 p_card1">{what_next_cont?.title}</p>
                        <p className="p_cards2">{what_next_cont?.detail}</p>
                    </div>
                    <div className="px-1 text-right col-md-12" >
                        <p className="p_explore-it"><Link to= {`/course/${what_next_cont?.seoUrl}`}>Explore More <i class="fas fa-angle-right"></i></Link></p>
                    </div> 
                </div>
                </div>
            )})}
      </div>
     </div>
  )
}
 
export default WhatNextCard