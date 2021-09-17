import React from 'react';
import { Link } from 'react-router-dom';

function BrandsMenu(props){
        
    return (
        <section className='container-fluid' id="menuDisplay">
            {/* BRANDS MENU */}
            <div className="row h-100" id="brands_and_menu">
                <div className="col-12 col-md-6 text-center text-md-start pt-5 ps-md-5" id='brands_menu'>
                    <h1 className='monument_font_black'>BRANDS</h1>

                    <h6><Link to="/clothing">Gucci</Link></h6>
                    <h6><Link to="/shoes">Louis Vuitton</Link></h6>
                    <h6><Link to="/accessories">Giorgio Armani</Link></h6>
                </div>

                <div className="col-12 col-md-6 gucci_menu text-center text-md-start pt-5 ps-md-5 menu_options" id={props.logoToShow}>
                    <h1 className='monument_font_black'>{props.brand}</h1>
                    <div>
                        <h6 className='d-inline-block mx-3 cursorPointer'><Link to={`/products/${props.products[0].toLowerCase()}`}>{props.products[0]}</Link></h6>
                    </div>

                    <div>
                        <h6 className='d-inline-block mx-3 cursorPointer'><Link to={`/products/${props.products[1].toLowerCase()}`}>{props.products[1]}</Link></h6>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default BrandsMenu;