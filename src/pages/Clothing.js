import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import BrandsMenu from '../components/BrandsMenu';

function Clothing(){
    return (
        <div className="App">
            <div id="main_container">
                <div id="main_wrapper">
                    <Navbar />
                    
                    <BrandsMenu brand={"GUCCI"} products={["T-shirts", "Pants"]} logoToShow={"gucci_menu_options"} />
                </div>
            </div>

            <Footer />
        </div>
    );
}

export default Clothing;