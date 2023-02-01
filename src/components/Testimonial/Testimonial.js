import React from 'react'
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';
import {  FaAngleLeft, FaAngleRight, FaQuoteRight } from 'react-icons/fa';
import './Testimonial.scss'

export default function Testimonial() {
    return (
     <div className='testimonials_'>
        <Carousel infiniteLoop autoPlay interval={5000} showStatus={false}
        >
            <section>
                <div className="testimonials__title">
                    <h2>Testimonials</h2>
                </div>
                <div className='reverse__flex'>
                    <div className="sec__width"><iframe height="100%" src="https://www.youtube.com/embed/XS_ht5XxwRI" title="YouTube video player" frameBorder={0} allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen />
                    </div>
                    <div className='sec__width'>
                        <p>
                            <FaQuoteRight size={30} color = "#1F105A" /><br/>
                            Aesthetic Laser Clinic is very well set up to do training as it is a working clinic with excellent facilities. The trainers were very welcoming and friendly which in turn creates a good atmosphere in which to learn. I would recommend them for training and treatments.
                        </p>
                        <div className="arrows__sec">
                            <a onClick={() => { document.querySelector('.carousel .control-next.control-arrow').click(); }}>
                                <FaAngleLeft color='#007bff' />
                            </a>
                            <span className="clientName">Sally’s Story</span>
                            <a onClick={() => { document.querySelector('.carousel .control-prev.control-arrow').click(); }}>
                                <FaAngleRight color='#007bff' />
                            </a>
                        </div>
                    </div>
                </div>
            </section>


            <section>
                <div className="testimonials__title">
                    <h2>Testimonials</h2>
                </div>
                <div className='reverse__flex'>
                    <div className="sec__width"><iframe height="100%" src="https://www.youtube.com/embed/b-AvUzcgVNE" title="YouTube video player" frameBorder={0} allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen />
                    </div>
                    <div className='sec__width'>
                        <p>
                            <FaQuoteRight size={30} color = "#1F105A" /><br/>
                            After passing this course I was able to set up my own professional laser clinic within 4 weeks I was confident in buying my own equipment, making consent forms, advice sheets and everything else that is needed and I now have a very successful business!
                        </p>
                        <div className="arrows__sec">
                            <a onClick={() => { document.querySelector('.carousel .control-next.control-arrow').click(); }}>
                                <FaAngleLeft color='#007bff' />
                            </a>
                            <span className="clientName">Ghazala’s Story</span>
                            <a onClick={() => { document.querySelector('.carousel .control-prev.control-arrow').click(); }}>
                                <FaAngleRight color='#007bff' />
                            </a>
                        </div>
                    </div>
                </div>
            </section>

            <section>
                <div className="testimonials__title">
                    <h2>Testimonials</h2>
                </div>
                <div className='reverse__flex'>
                    <div className="sec__width"><iframe height="100%" src="https://www.youtube.com/embed/lxZYjFnYTV4" title="YouTube video player" frameBorder={0} allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen />
                    </div>
                    <div className='sec__width'>
                        <p>
                            <FaQuoteRight size={30} color = "#1F105A" /><br/>
                            I found the training very thorough, very interesting and very informative and helpful. I now am able to carry on lasering using the new techniques that I have learnt and will be quite happy to carry out laser hair removal and skin rejuvenation. I would feel extremely confident.               
                        </p>
                        <div className="arrows__sec">
                            <a onClick={() => { document.querySelector('.carousel .control-next.control-arrow').click(); }}>
                                <FaAngleLeft color='#007bff' />
                            </a>
                            <span className="clientName">Michelle’s Story</span>
                            <a onClick={() => { document.querySelector('.carousel .control-prev.control-arrow').click(); }}>
                                <FaAngleRight color='#007bff' />
                            </a>
                        </div>
                    </div>
                </div>
            </section>
        </Carousel>
     </div>
   )
}
