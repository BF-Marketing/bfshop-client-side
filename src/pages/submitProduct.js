import React, { useContext, useState } from 'react';
import axios from 'axios'
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import {dataContext} from '../contexts/dataContext.js'
import loadergif from '../media/loader/gearloader.gif'

function SubmitProduct(){
    const { user, loading, setLoading, setProductSubmitted } = useContext(dataContext);
    const [errorMessageProduct, setErrorMessageProduct] = useState("");

    function submitItem(e){
        e.preventDefault();
        setLoading(true);

        const productFormData = new FormData(e.target);
        const submitBtn = document.getElementById("product_submit_btn");
        submitBtn.textContent = "Sending...";
        
        axios.post("https://radiant-retreat-44230.herokuapp.com/submitproduct", productFormData, {withCredentials: true})
        .then(function (response) {
            if(response.data.message !== "Product submitted"){
                setLoading(false);
                setErrorMessageProduct(response.data.message);
                submitBtn.textContent = "Submit";
                setTimeout(() => setErrorMessageProduct(""), 3000);
            }
            else if(response.data.message === "Product submitted"){
                e.target.reset();
                submitBtn.textContent = "Submitted";
                setProductSubmitted(prev => ++prev);
                setLoading(false);
                setTimeout(() => submitBtn.textContent = "Submit", 2000);
            }
        })
        .catch(function () {setLoading(false)});
    }
    
    function chooseCategory(e){
        ['small', 'medium', 'large', 'extralarge', 'nine', 'nine_point_five', 'ten', 'eleven', 'twelve'].forEach(
            each => document.getElementById(each).checked = false
        )
        const sizeForAll = document.querySelectorAll(".size_for_all");
        const shoeSize = document.querySelectorAll(".shoe_size");
        if(e.target.value === "Sneakers" || e.target.value === "Boots"){
            sizeForAll.forEach(each => each.classList.add("d-none"));
            shoeSize.forEach(each => each.classList.remove("d-none"));
        }
        else{
            sizeForAll.forEach(each => each.classList.remove("d-none"));
            shoeSize.forEach(each => each.classList.add("d-none"));
        }
    }

    function displaySizes(value, id){
        return (
            <div>
                <input type="checkbox" name="size" value={value} id={id}/>
                <label htmlFor={id} className="form-label ms-1">{value}</label>
            </div>
        );
    }
    
    const result = user.auth ? (
        <div className="App">
            <div id="main_container">
                <div id="main_wrapper">
                    <Navbar />

                    {loading && (<img src={loadergif} className="loader" alt="Gear gif loader" width="50px" height="50px" />)}

                    <section className="container-fluid" id="submitSection">
                        <div className="row h-100">
                            <div className="col-12 col-md-6 mx-md-auto">
                                <h6 className="fw-bold text-center my-3">Submit a product</h6>
                                <form className="my-3 mx-auto p-4" onSubmit={submitItem} encType="multipart/form-data" id="submitProductForm" noValidate>
                                    <div className="mb-3">
                                        <label htmlFor="formFileSm" className="form-label">Choose file</label>
                                        <input className="form-control form-control-sm" id="formFileSm" name="image" type="file" accept="image/*" />
                                    </div>

                                    <div className="mb-3">
                                        <input type="text" name="name" id="name" className="form-control form-control-sm" />
                                        <label htmlFor="name" className="form-label">Product name</label>
                                    </div>

                                    <div className="mb-3 form-floating">
                                        <textarea name="description" id="description" className="form-control" placeholder="Product description"></textarea>
                                        <label htmlFor="description">Product description</label>
                                    </div>

                                    <select onChange={chooseCategory} name="category" className="form-select form-select-sm mb-3" aria-label=".form-select-sm example">
                                        <option defaultValue>Choose category</option>
                                        <option value="T-shirts">T-shirts</option>
                                        <option value="Pants">Pants</option>
                                        <option value="Sneakers">Sneakers</option>
                                        <option value="Boots">Boots</option>
                                        <option value="Watches">Watches</option>
                                        <option value="Bracelets">Bracelets</option>
                                    </select>

                                    <p className="text-center size_for_all">Size for all, except shoes</p>
                                    <div className="me-3 d-flex justify-content-around size_for_all">
                                        {displaySizes("S", "small")}
                                        {displaySizes("M", "medium")}
                                        {displaySizes("L", "large")}
                                        {displaySizes("XL", "extralarge")}
                                    </div>

                                    <p className="text-center mt-3 shoe_size">Size for shoes</p>
                                    <div className="me-3 d-flex justify-content-around shoe_size">
                                        {displaySizes("9", "nine")}
                                        {displaySizes("9.5", "nine_point_five")}
                                        {displaySizes("10", "ten")}
                                        {displaySizes("11", "eleven")}
                                        {displaySizes("12", "twelve")}
                                    </div>

                                    <div className="mb-3">
                                        <input type="text" name="color" id="color" className="form-control form-control-sm" />
                                        <label htmlFor="color" className="form-label">Color</label>
                                    </div>

                                    <div className="mb-3">
                                        <input type="number" step="0.01" min="0" max="5000" name="price" id="price" className="form-control form-control-sm" placeholder='$' />
                                        <label htmlFor="price" className="form-label">Price</label>
                                    </div>

                                    <div className="mb-3">
                                        <input type="number" name="inStock" id="inStock" className="form-control form-control-sm" />
                                        <label htmlFor="inStock" className="form-label">Stock</label>
                                    </div>

                                    <select name="shipping" className="form-select form-select-sm" aria-label=".form-select-sm example">
                                        <option defaultValue>Shipping method</option>
                                        <option value="Moderate 3-5 days $15">Moderate 3-5 days $15</option>
                                        <option value="Fast 1-3 days $35">Fast 1-3 days $35</option>
                                    </select>
                                    <div className="form-text error_message text-center mb-3">
                                        {errorMessageProduct}
                                    </div>
                                    <button type="submit" value="Submit" className="darkbuttons btn-block" id="product_submit_btn">Submit</button>
                                </form>
                            </div>
                        </div>
                    </section>
                </div>
            </div>

            <Footer />
        </div>
    ) : 
    <></>;
    return result;
}

export default SubmitProduct;