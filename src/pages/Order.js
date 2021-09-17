import React, { useRef, useContext, useState } from 'react';
import axios from 'axios'
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import PaymentLogos from '../media/logos/paymentlogos.png';
import {dataContext} from '../contexts/dataContext.js'
import loadergif from '../media/loader/gearloader.gif'

function Order(){
    const { user, loading, setLoading, itemsInCart, setItemsInCart } = useContext(dataContext);
    const [errorMessageOrder, setErrorMessageOrder] = useState("");
    let firstNameCurrent = useRef("");

    function firstNameHandler(e){
        firstNameCurrent.current = e.target.value;
        document.getElementById("personalFirstname").value = firstNameCurrent.current;
        document.getElementById("paymentFirstname").value = firstNameCurrent.current;
        document.getElementById("personalEmail").value = `${(firstNameCurrent.current).toLowerCase()}@outlook.com`;
    }

    function lastNameHandler(e){
        firstNameCurrent.current = e.target.value;
        document.getElementById("personalLastname").value = firstNameCurrent.current;
        document.getElementById("paymentLastname").value = firstNameCurrent.current;
    }
    
    // processes user order to generate receipt and send throough his email
    function submitOrder(e){
        e.preventDefault();
        setLoading(true);

        const paymentForm = document.getElementById("payment_form");
        const orderConfirmation = document.getElementById("order_confirmation");
        const orderNotConfirmed = document.getElementById("order_not_confirmed");
        const orderedProducts = JSON.stringify(itemsInCart.productList.map((each) => { return {quantity: each.quantity, description: each.name, price: each.price, tax: 0} }))

        const orderFormData = new FormData(e.target);
        orderFormData.append("total", itemsInCart.totalPrice);  
        orderFormData.append("productList", orderedProducts);       
        
        axios.post(process.env.REACT_APP_SUBMIT_ORDER_API, orderFormData, {withCredentials: true})
        // axios.post("https://radiant-retreat-44230.herokuapp.com/submitorder", orderFormData, {withCredentials: true})
        .then(function (response) {
            if(response.data.message){
                setLoading(false);
                setErrorMessageOrder(response.data.message);
                setTimeout(() => setErrorMessageOrder(""), 3000);
            }
            else if(response.data){
                e.target.reset();
                setLoading(false);
                paymentForm.classList.add("d-none");
                orderConfirmation.classList.remove("d-none");
                setTimeout(() => { setItemsInCart({totalItems: 0, totalPrice: 0, productList: []}) }, 4000);
            }
            else{
                e.target.reset();
                setLoading(false);
                paymentForm.classList.add("d-none");
                orderNotConfirmed.classList.remove("d-none");
                setTimeout(() => { setItemsInCart({totalItems: 0, totalPrice: 0, productList: []}) }, 4000);
            }
        })
        .catch(function () {setLoading(false)});
    }
    
    const result = user.auth && itemsInCart.totalItems ? (
        <div className="App">
            <div id="main_container">
                <div id="main_wrapper">
                    <Navbar />

                    {loading && (<img src={loadergif} className="loader" alt="Gear gif loader" width="50px" height="50px" />)}

                    <section className='container-fluid' id='orderDisplay'>
                        <div className="row h-100">
                            <div className="col-12 col-md-6 mx-md-auto">

                                <div className="d-none text-center my-5 p-3" id="order_confirmation">
                                    <p className="display-3"><i className="bi bi-check-circle-fill"></i> Your order was placed!</p>
                                    <h6>A receipt was sent to your email.</h6>
                                </div>

                                <div className="d-none text-center my-5 p-3" id="order_not_confirmed">
                                    <p>Error: empty the cart and try to order again.</p>
                                </div>
                                
                                <form id="payment_form" onSubmit={submitOrder} encType="multipart/form-data" noValidate>

                                    {/* PERSONAL INFORMATION */}
                                    <div className="mt-3 mx-auto personal_info p-4" id="personalSection">
                                        <h6 className="my-3 text-center">Personal information</h6>
                                        <div>
                                            <div className="mb-3">
                                                <input onChange={firstNameHandler} type="text" name="firstName" className="form-control form-control-sm" id="personalFirstname" aria-describedby="firstHelp" />
                                                <div id="firstHelp" className="form-text">First name</div>
                                            </div>

                                            <div className="mb-3">
                                                <input onChange={lastNameHandler} type="text" name="lastName" className="form-control form-control-sm" id="personalLastname" aria-describedby="lastHelp" />
                                                <div id="lastHelp" className="form-text">Last name</div>
                                            </div>
                                        </div>

                                        <div>
                                            <div className="mb-3">
                                                <input type="email" name="email"  className="form-control form-control-sm" id="personalEmail" aria-describedby="emailHelp" />
                                                <div id="emailHelp" className="form-text">Email</div>
                                            </div>

                                            <div className="mb-3">
                                                <input type="number" name="phoneNumber" defaultValue={5175053399} className="form-control form-control-sm" id="phonenumber" aria-describedby="phoneHelp" />
                                                <div id="phoneHelp" className="form-text">Phone number</div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* SHIPPING ADDRESS */}
                                    <div className="mt-3 mx-auto shipping_address p-4" id="addressSection">
                                        <h6 className="my-3 text-center">Shipping address (same as billing address)</h6>
                                        <div className="mb-3">
                                            <input defaultValue={"123 bfmarkting street"} name="address" type="text" className="form-control form-control-sm" id="street_address" aria-describedby="addressHelp" />
                                            <div id="addressHelp" className="form-text">Street address</div>
                                        </div>

                                        <div className="d-md-flex justify-content-md-between">
                                            <div className="me-md-3">
                                                <div className="mb-3">
                                                    <input defaultValue={"Lansing"} name="city" type="text" className="form-control form-control-sm" id="city" aria-describedby="cityHelp" />
                                                    <div id="cityHelp" className="form-text">City</div>
                                                </div>

                                                <div className="mb-3">
                                                    <input defaultValue={48822} name="zipcode" type="number" className="form-control form-control-sm" id="zipcode" aria-describedby="zipcodeHelp" />
                                                    <div id="zipcodeHelp" className="form-text">Zip code</div>
                                                </div>
                                            </div>

                                            <div>
                                                <div className="mb-3">
                                                    <input defaultValue={"Michigan"} name="state" type="text" className="form-control form-control-sm" id="state" aria-describedby="stateHelp" />
                                                    <div id="stateHelp" className="form-text">State</div>
                                                </div>

                                                <div className="mb-3">
                                                    <input defaultValue={"United States"} name="country" type="text" className="form-control form-control-sm" id="country" aria-describedby="countryHelp" />
                                                    <div id="countryHelp" className="form-text">Country</div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="my-2 text-center p-0">
                                        <p className="fw-bold">Total: ${itemsInCart.totalPrice}</p>
                                        <p className="mb-0">Payment method</p>
                                        <p>Debit / Credit Card</p>
                                        <img src={PaymentLogos} width="130px" height="30px" alt="Visa card logo" />
                                    </div>

                                    {/* PAYMENT INFO */}
                                    <div className="my-3 mx-auto payment_info p-4 " id="paymentSection">
                                        <h6 className="my-3 text-center">Payment Information</h6>
                                        <div>
                                            <div className="mb-3">
                                                <input onChange={firstNameHandler} type="text" className="form-control form-control-sm" id="paymentFirstname" aria-describedby="paymentFirstHelp" />
                                                <div id="paymentFirstHelp" className="form-text">First name</div>
                                            </div>

                                            <div className="mb-3">
                                                <input onChange={lastNameHandler} type="text" className="form-control form-control-sm" id="paymentLastname" aria-describedby="paymentLastHelp" />
                                                <div id="paymentLastHelp" className="form-text">Last name</div>
                                            </div>
                                        </div>

                                        <div>
                                            <div className="mb-3">
                                                <input defaultValue={1111222233334444} name="cardNumber" type="number" className="form-control form-control-sm" id="cardNumber" aria-describedby="cardHelp" />
                                                <div id="cardHelp" className="form-text">Credit/Debit card number</div>
                                            </div>

                                            <div className="mb-3">
                                                <input defaultValue={"***"} type="text" name="cvc" className="form-control form-control-sm" id="securityCode" aria-describedby="cvcHelp" />
                                                <div id="cvcHelp" className="form-text">CVC</div>
                                            </div>
                                        </div>

                                        <div>
                                            <div className="mb-3">
                                                <input defaultValue={"2021-09"} type="month" name="cardExp" className="form-control form-control-sm" id="cardExpiration" aria-describedby="expHelp" />
                                                <div id="expHelp" className="form-text">Card expiration</div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="form-text error_message text-center mb-3">
                                        {errorMessageOrder}
                                    </div>
                                    <div className="my-2 text-center p-0">
                                        <button type="submit" className="darkbuttons">Order</button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </section>
                </div>
            </div>

            <Footer />
        </div>
    ) 
    : <></>;

    return result;
}

export default Order;