
import React, {useContext} from 'react';

import Navbar from '../components/Navbar';
import HomeMidSection from '../components/HomeMidSection';
import Footer from '../components/Footer';
import { dataContext } from '../contexts/dataContext'

function Home() {
    const {user} = useContext(dataContext);

    const result = !user.auth ? (
        <div className="App">
            <div id="main_container">
                <div id="main_wrapper">
                    <Navbar />

                    <HomeMidSection />
                </div>
            </div>

            <Footer />
        </div>
    ) : 
    <></>;

    return result;
}

export default Home;
