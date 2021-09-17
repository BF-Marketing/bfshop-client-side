import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

function NotFound() {
    
    return (
        <div className="App">
            <div id="main_container">
                <div id="main_wrapper">
                    <Navbar />

                    <section className="container-fluid d-flex flex-column justify-content-center align-items-center" id="notFoundDisplay">
                        <p className="display-1">404 - Page Not Found</p>
                        <p>The page you're looking for doesn't exist</p>
                        <p><Link to="/">Click here</Link> to go to the main page</p>
                    </section>
                    
                </div>
            </div>

            <Footer />
        </div>
    );
}

export default NotFound;