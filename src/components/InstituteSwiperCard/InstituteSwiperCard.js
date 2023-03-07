import { FAEImage } from "@findanexpert-fae/components/dist/stories/FAEImage/FAEImage"
import { useState } from "react"
import { getFileSrcFromPublicFolder, getFileSrcFromPublicFolderSpcialLHR } from "../../utils"
import "./InstituteSwiperCard.scss"


function InstituteSwiperCard() {
  const[newcard, setNewcard] = useState(true)
  const placeholderImage = getFileSrcFromPublicFolder("placeholder.jpg");

  return (
    <div className='mt-4 col-md-12' >
        
       <div className="row">
        <div className="col-md-2"></div>
        <div className="col-md-8">

            {newcard? (
                   <div className="col-md-12">
                   <div className="row">
                       <div className="col-md-10 col-10 bg_card1_s1">
                           <div className="p-3 row">
                               <div className="p-0 col-md-6">
                               <FAEImage placeholder={placeholderImage} src={getFileSrcFromPublicFolderSpcialLHR("swipecard.png")} className="img-fluid" />
                               </div>
                               <div className="m-auto col-md-6">
                                  <p className="mb-1 font_head_c1">Legal requirements satisfied</p>
                                  <p className="font_para_c1">Backed by UK’s top awarding bodies, we offer qualifications that satisfy insurance & other legal requirements.</p>
                               </div>
                           </div>
                       </div>
                       <div className="col-md-2 col-2 bg_card1_s2 ">
                           <button onClick={()=>setNewcard(!newcard)} className="btn_card_c1"><i class="fas fa-chevron-left"></i></button>
                       </div>
                   </div>
               </div>
            ):(
                <div className="col-md-12">
                <div className="row">
                <div className="text-right col-md-2 col-2 bg_card2_s2 ">
                        <button onClick={()=>setNewcard(!newcard)} className="btn_card_c2"><i class="fas fa-chevron-right"></i></button>
                    </div>
                    <div className="col-md-10 col-10 bg_card2_s1">
                        <div className="p-3 row">
                           <div className="p-0 col-md-6">
                                <FAEImage placeholder={placeholderImage} src={getFileSrcFromPublicFolderSpcialLHR("swipe2.png")} className="img-fluid" />
                            </div>
                           <div className="m-auto col-md-6">
                               <p className="mb-1 font_head_c1">Quality is our hallmark</p>
                               <p className="font_para_c1">At Chelsford, we promise quality-based education to fast-track your career through our intense courses.</p>
                            </div>
                            
                           
                        </div>
                    </div>
                    
                </div>
            </div>
            )} 
        </div> 
        <div className="col-md-2"></div>
       </div> 
    </div>
  )
}

export default InstituteSwiperCard