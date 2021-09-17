import React, {useContext} from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import BrandsMenu from '../components/BrandsMenu';
import { dataContext } from '../contexts/dataContext'
import loadergif from '../media/loader/gearloader.gif'

function Clothing(){
    const {loading} = useContext(dataContext);
    return (
        <div className="App">
            <div id="main_container">
                <div id="main_wrapper">
                    <Navbar />

                    {loading && (<img src={loadergif} className="loader" alt="Gear gif loader" width="50px" height="50px" />)}
                    
                    <BrandsMenu brand={"GUCCI"} products={["T-shirts", "Pants"]} logoToShow={"gucci_menu_options"} />
                </div>
            </div>

            <Footer />
        </div>
    );
}

export default Clothing;