import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import BrandsMenu from '../components/BrandsMenu';


function Shoes(){
    return (
        <div className="App">
            <div id="main_container">
                <div id="main_wrapper">
                    <Navbar />
                    
                    <BrandsMenu brand={"LOUIS VUITTON"} products={["Sneakers", "Boots"]} logoToShow={"louis_menu_options"} />
                </div>
            </div>

            <Footer />
        </div>
    );
}

export default Shoes;