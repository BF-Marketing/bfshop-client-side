
import React from 'react';
import Navbar from '../components/Navbar';
import HomeMidSection from '../components/HomeMidSection';
import Footer from '../components/Footer';

function Home() {

    return (
        <div className="App">
            <div id="main_container">
                <div id="main_wrapper">
                    <Navbar />

                    <HomeMidSection />
                </div>
            </div>

            <Footer />
        </div>
    );
}

export default Home;
