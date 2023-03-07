import "./chelsford-service-card.css"
 function ChelsFordTrainingCard({src, price, title}) {
  return (
    <div className='mt-4 col-md-12' >
        <div className='row'>
            {/* cards  */}
            <div className='px-2 mt-3 col-md-3'>
                <div className='px-1 col-md-12'>
                    <img src={src} className='img-fluid obj_f' />
                    <div className="p-0 col-md-12">
                    <div className='p-0 col-md-12' >
                        <div className='text-right col-md-12 marg_neg' >
                            <button className="btn_price"> £{price} </button>
                        </div>
                     </div>
                     <div className="p-0 col-md-12 bggg"> 
                       <span className="font_cardd">{title}</span>
                     </div>
                     </div>
                </div>
            </div>
        </div> 
     </div>
  )
}

export default ChelsFordTrainingCard