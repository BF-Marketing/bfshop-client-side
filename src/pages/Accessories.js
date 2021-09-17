import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import BrandsMenu from '../components/BrandsMenu';

function Accessories(){
    return (
        <div className="App">
            <div id="main_container">
                <div id="main_wrapper">
                    <Navbar />

                    <BrandsMenu brand={"GIORGIO ARMANI"} products={["Watches", "Bracelets"]} logoToShow={"armani_menu_options"} />
                </div>
            </div>

            <Footer />
        </div>
    );
}

export default Accessories;