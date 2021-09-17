import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import frontImageMobile from '../media/homeimage/homeimagemobile.png'
import gucciSlideMobile from '../media/frontimage-gucci/guccimobile.png'
import louisSlideMobile from '../media/frontimage-louis/louisimagemobile.png'
import armaniSlideMobile from '../media/frontimage-armani/armanimobile.png'

import frontImageDesktop from '../media/homeimage/homeimagedesktop.png'
import gucciSlideDesktop from '../media/frontimage-gucci/guccidesktop.png'
import louisSlideDesktop from '../media/frontimage-louis/louisimagedesktop.png'
import armaniSlideDesktop from '../media/frontimage-armani/armanidesktop.png'

function HomeMidSection(){

    useEffect(() => {
        // get image bigger while scrolling down, and smaller while scrolling up
        function scrollFunction() {
            const insideMidSection = document.getElementById('inside_mid_section');
            if(insideMidSection){
                let lastScrollTop = 0;

                let page_offset = window.pageYOffset;
                if(page_offset > lastScrollTop){
                    insideMidSection.style.width = '100%';
                    insideMidSection.style.height = '100%';
                }
                else{
                    insideMidSection.style.width = '90%';
                    insideMidSection.style.height = '90%';
                }
                lastScrollTop = page_offset <= 0 ? 0 : page_offset; // For Mobile or negative scrolling
            }
        }
        
        window.onscroll = scrollFunction;
    }, []);

    return (
        <section className='d-flex flex-column justify-content-center align-items-center' id='mid_section'>
            <div id='inside_mid_section'>
                <div id="carouselBrandControls" className="carousel slide w-100 h-100" data-bs-ride="carousel">
                    <div className="carousel-inner w-100 h-100">
                        <div className="carousel-item active w-100 h-100">
                            <img src={window.matchMedia("(min-width: 768px)").matches ? frontImageDesktop : frontImageMobile} className="d-block w-100 h-100" alt="..." />
                            <div className="carousel-caption d-md-block">
                                <h1 className='mb-5 monument_font_black'>Give your body one style</h1>
                                <h6>We give you the opportunity to dress well.</h6>
                                <h6>Come visit us!</h6>
                                <Link to="/clothing"><button className="btn mt-4 px-4">Buy now</button></Link>
                            </div>
                        </div>

                        <div className="carousel-item w-100 h-100">
                            <img src={window.matchMedia("(min-width: 768px)").matches ? gucciSlideDesktop : gucciSlideMobile} className="d-block w-100 h-100" alt="..." />
                            <div className="carousel-caption d-md-block">
                                <h1 className='mb-5 monument_font_black'>Collection Eclipse Monogram</h1>
                                <Link to="/clothing"><button className="btn mt-4 px-4">Buy now</button></Link>
                            </div>
                        </div>

                        <div className="carousel-item w-100 h-100">
                            <img src={window.matchMedia("(min-width: 768px)").matches ? louisSlideDesktop : louisSlideMobile} className="d-block w-100 h-100" alt="..." />
                            <div className="carousel-caption d-md-block">
                                <h1 className='mb-5 monument_font_black'>Collection Adidas x Gucci</h1>
                                <Link to="/shoes"><button className="btn mt-4 px-4">Buy now</button></Link>
                            </div>
                        </div>

                        <div className="carousel-item w-100 h-100">
                            <img src={window.matchMedia("(min-width: 768px)").matches ? armaniSlideDesktop : armaniSlideMobile} className="d-block w-100 h-100" alt="..." />
                            <div className="carousel-caption d-md-block">
                                <h1 className='mb-5 monument_font_black'>Collection Summer Armani</h1>
                                <Link to="/accessories"><button className="btn mt-4 px-4">Buy now</button></Link>
                            </div>
                        </div>
                    </div>

                    <button className="carousel-control-prev" type="button" data-bs-target="#carouselBrandControls" data-bs-slide="prev">
                        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                        <span className="visually-hidden">Previous</span>
                    </button>

                    <button className="carousel-control-next" type="button" data-bs-target="#carouselBrandControls" data-bs-slide="next">
                        <span className="carousel-control-next-icon" aria-hidden="true"></span>
                        <span className="visually-hidden">Next</span>
                    </button>
                </div>

            </div>

        </section>
    )
}
 
export default HomeMidSection;