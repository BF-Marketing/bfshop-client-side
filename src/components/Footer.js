import React from 'react';

function Footer(){
    function showHide(arg){ document.querySelector(`.${arg}`).classList.toggle('d-none'); }

    return (
        <footer>
            <div className="mt-2">
                <h1 className='text-center text-md-start ms-md-4 monument_font_ultraBold'>BF SHOP</h1>
            </div>

            <hr className='mx-4 my-1 horizontalLine' />
            
            <div className='d-flex flex-column flex-md-row align-items-center justify-content-md-around align-items-md-center my-2 footerLinks'>
                <span className='text-center my-2 my-md-0'>
                    <p className="mb-1 cursorPointer"><span onClick={() => { showHide('followus_icons') }}>FOLLOW US</span></p>
                    <span className='followus_icons d-none'>
                        <i className="bi bi-facebook mx-2 cursorPointer"></i>
                        <i className="bi bi-twitter mx-2 cursorPointer"></i>
                    </span>
                </span>
                
                <span className='text-center my-2 my-md-0'>
                    <p className="mb-1 cursorPointer"><span onClick={() => { showHide('contactus_icons') }}>CONTACT US</span></p>
                    <span className='contactus_icons d-none'>
                        <i className="bi bi-whatsapp mx-2 cursorPointer"></i>
                        <i className="bi bi-envelope-fill mx-2 cursorPointer"></i>
                        <i className="bi bi-telephone-fill mx-2 cursorPointer"></i>
                    </span>
                </span>
            </div>

            <div className='text-center'>
                <p className="copyright_year m-0">
                    <a href="http://bfmarketing.net/" target="_blank" rel="noopener noreferrer">
                        &copy; Made by BF Marketing <i className="ms-2 bi bi-box-arrow-up-right"></i>
                    </a>
                </p>
            </div>
        </footer>
    )
}
export default Footer;