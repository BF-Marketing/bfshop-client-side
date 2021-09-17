import React from 'react';
import Navbar from '../components/Navbar';
import AboutMidSection from '../components/AboutMidSection';
import Footer from '../components/Footer';

function About() {

    return (
        <div className="App">
            <div id="main_container">
                <div id="main_wrapper">
                    <Navbar />
                    
                    <AboutMidSection />
                </div>
            </div>

            <Footer />
        </div>
    );
}

export default About;