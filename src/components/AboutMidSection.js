import React from 'react';

function AboutMidSection() {
    function submitConsultation(e){
        e.preventDefault();
        const submitBtn = document.getElementById("consultBtn");
        const name = document.getElementById("nameInput");
        const email = document.getElementById("emailInput");
        const appDate = document.getElementById("appointmentInput");
        const errorMSg = document.querySelector(".error_message");
        const regex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

        if(!name.value){
            errorMSg.textContent = "Name cannot be empty";
            setTimeout(() => errorMSg.textContent = "", 2000);
        }
        else if(!email.value){
            errorMSg.textContent = "Email cannot be empty";
            setTimeout(() => errorMSg.textContent = "", 2000);
        }
        else if(!regex.test(email.value)){
            errorMSg.textContent = "Email is not valid";
            setTimeout(() => errorMSg.textContent = "", 2000);
        }
        else if(!appDate.value){
            errorMSg.textContent = "Please, choose a date";
            setTimeout(() => errorMSg.textContent = "", 2000);
        }
        else{
            submitBtn.textContent = "Sending...";
            setTimeout (() => submitBtn.textContent = "Submitted", 1000);
            setTimeout (() => submitBtn.textContent = "Submit", 2000);
        }
    }
    return (
        <section className='d-flex flex-column flex-lg-row justify-content-center align-items-center py-4 py-md-0' id='about_mid_section'>
            <div className='my-2 mx-3 ms-lg-3 text-center text-lg-start order-lg-2'>
                <h4 className='fw-bold'>BOOK A CONVERSATION WITH A BF SHOP CONSULTANT</h4>
                <p>MAKE AN APPOINTMENT</p>
            </div>

            <div className='d-flex flex-column justify-content-center align-items-center order-lg-1 p-4' id='consultation_form'>
                <form onSubmit={submitConsultation} noValidate>
                    <div className="mb-3">
                        <label htmlFor="nameInput" className="form-label">Name</label>
                        <input type="text" className="form-control" id="nameInput" />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="emailInput" className="form-label">Email</label>
                        <input type="email" className="form-control" id="emailInput" />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="appointmentInput" className="form-label">Date:</label>
                        <input className='p-2' type="date" id="appointmentInput" />
                    </div>
                    <p className="form-text error_message text-center mb-2"></p>
                    <button type="submit" className="darkbuttons align-self-start" id="consultBtn">Submit</button>
                </form>
            </div>
        </section>
    );
}

export default AboutMidSection;