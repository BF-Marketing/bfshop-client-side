import React, {useState, useContext} from 'react';
import axios from 'axios';
import { dataContext } from '../contexts/dataContext.js';

function ProductDetailsModal(props){
    const {user, itemsInCart, setItemsInCart} = useContext(dataContext);
    const [ likeCount, setLikeCount ] = useState(props.product.likes.length);

    function updateLikeCount(productid, likeId, categ){
        if(likeCount === props.product.likes.length){
            axios.put(process.env.REACT_APP_UPDATE_PRODUCT_API, {productId: productid, userid: user.id, category: categ}, {withCredentials: true})
            // axios.put("https://radiant-retreat-44230.herokuapp.com/likedproduct", {productId: productid, userid: user.id, category: categ}, {withCredentials: true})
            .then(response => {
                if(response.data === "Product updated"){
                    setLikeCount(likeCount + 1);
                    const productLike = document.getElementById(likeId);
                    productLike.classList.replace("bi-heart", "bi-heart-fill");
                    productLike.classList.remove("cursorPointer");
                    productLike.style.color = "red";
                }
            })
        }
    }

    const [quantity, setQuantity] = useState(1);
    function updateQuantity(doWhat){
        if(doWhat === "increment"){
            setQuantity(quantity + 1);
        }
        else if(doWhat === "decrement" && quantity > 1){
            setQuantity(quantity - 1);
        }
    }

    function addToCart(size_id, error_id){
        const sizeSelection = document.getElementById(size_id);
        const errorElement = document.getElementById(error_id);

        // sets quantity of the item
        props.product.quantity = quantity;

        // sets product price based on quantity
        const priceTimesQty = parseFloat((props.product.price * quantity).toFixed(2));

        sizeSelection.value === "Size" ? errorElement.textContent = "Choose a size"
        : itemsInCart.productList.filter(each => each._id === props.product._id).length ? // requires unique item at the cart
        errorElement.textContent = "Item was already added to cart"
        : setItemsInCart(prev => { // adds item to cart
            return {
                totalItems: prev.totalItems + 1, 
                totalPrice: parseFloat((prev.totalPrice + priceTimesQty).toFixed(2)),
                productList: [...prev.productList, props.product]
            }
        })
        setTimeout(() => errorElement.textContent = "", 2000);
    }
    
    return (
        <div className="modal-dialog modal-dialog-centered modal-lg">
            <div className="modal-content">
                <div className="modal-body p-0">

                    <div className="container-fluid">
                        <div className="row">
                            <div className="col-12 col-md-8 p-0 productImage d-flex justify-content-center align-items-center">
                                { 
                                    window.matchMedia("(min-width: 768px)").matches ? <></> : 
                                    (<button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" id='closeModal'></button>) 
                                }

                                { 
                                    window.matchMedia("(min-width: 768px)").matches ? (<img src={props.product.image} width='80%' height='80%' alt="..."/>) : 
                                    (<img src={props.product.image} width='60%' height='80%' alt="..."/>)
                                }
                            </div>

                            <div className="col-12 col-md-4 productDetails">
                                <div className="mx-3 mx-md-2 product_details_inside p-3 my-3">
                                    <h6 className="fw-bold mt-3">{props.product.name}</h6>
                                    {
                                        user.auth ? (
                                            props.product.likes.filter(item => item.userid === user.id ).length ? 
                                            <i className="bi bi-heart-fill me-2"></i>
                                            :
                                            <i onClick={() => {updateLikeCount(props.product._id, "like"+props.product._id, props.product.category)}} className="cursorPointer bi bi-heart me-2" id={"like"+props.product._id}></i>
                                        
                                        )
                                        :
                                        (<i className="bi bi-heart me-2"></i>)
                                    }
                                    <small>{likeCount}</small>
                                    
                                    <p>Color: {props.product.color}</p>
                                    
                                    <div>
                                        <select className="form-select form-select-sm" aria-label="Default select example" id={"size"+props.product._id}>
                                            <option defaultValue>Size</option>
                                            {
                                                props.product.size.map((each, index) => (
                                                    <option key={"each"+index} value={each}>{each}</option>
                                                ))
                                            }
                                        </select>
                                    </div>
                                    
                                    <p className="mt-2 mb-1">{props.product.inStock} in stock</p>
                                    <p>${parseFloat((props.product.price * quantity).toFixed(2))}</p>

                                    <div>
                                        <i onClick={ () => {updateQuantity("decrement")} } className="bi bi-dash-lg fw-bold cursorPointer"></i>
                                        <p className="mx-3 d-inline-block fw-bold">{quantity}</p>
                                        <i onClick={ () => {updateQuantity("increment")} } className="bi bi-plus-lg fw-bold cursorPointer"></i>
                                    </div>
                                    <button onClick={ () => {addToCart("size"+props.product._id, "carterror"+props.product._id)}} className="darkbuttons">Add to cart</button>
                                    <small className="d-block error_message my-2 ms-2" id={"carterror"+props.product._id}></small>
                                    <p className="mt-2">{props.product.description}</p>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    )
}

export default ProductDetailsModal;