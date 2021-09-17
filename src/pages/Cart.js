import React, {useContext} from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import {dataContext} from '../contexts/dataContext.js'


function Cart(){
    const {itemsInCart, setItemsInCart} = useContext(dataContext);

    // removes items from cart
    function removeItem (itemId, elementId, price, qtd){
        const itemToRemove = document.getElementById(elementId);
        const displayQtd = parseInt(document.getElementById(qtd).textContent.split(': ')[1]);

        itemToRemove.classList.add('d-none');
        setItemsInCart(prev => {
            return {
                totalItems: prev.totalItems - 1, 
                totalPrice: parseFloat( (prev.totalPrice - (price * displayQtd)).toFixed(2) ),
                productList: prev.productList.filter(each => each._id !== itemId)
            }
        })
    }

    function removeAllItems(){
        setItemsInCart({totalItems: 0, totalPrice: 0, productList: []});
        document.querySelectorAll('.items_to_order').forEach(each => each.classList.add('d-none'));
    }

    return (
        <div className="App">
            <div id="main_container">
                <div id="main_wrapper">
                    <Navbar />

                    <section className="container-fluid" id="cartDisplay">
                        <div className="row h-100 cart_display_inside">
                            
                            <div className="col-12 text-center">
                                <p className="col-12 mt-4">{itemsInCart.productList.length} Cart items</p>
                                <p className="col-12 mt-4">Total price: ${itemsInCart.totalPrice}</p>
                                <div>
                                    <button onClick={removeAllItems} className="clearbutton me-5">Clear all</button>
                                    <Link to="/order"><button className="darkbuttons">Order</button></Link>
                                </div>
                            </div>
                            {
                                itemsInCart.productList && itemsInCart.productList.map(item => (
                                    <div key={item._id} className="col-10 col-xl-8 my-4 items_to_order d-flex flex-column 
                                    flex-lg-row justify-content-lg-between align-items-center mx-auto py-3 py-lg-0" id={`item${item._id}`}>
                                        <img src={item.image} width='50px' height='50px' alt="" />

                                        <div className="my-2 my-lg-0 mx-2 items_to_order_name">
                                            <p className="m-0">{item.name}</p>
                                        </div>
                                        <p className="my-2 my-lg-0 mx-2">${item.price}</p>
                                        <p className="mt-2 mb-5 my-lg-0 mx-2" id={"qtd"+item._id}>Quantity: {item.quantity}</p>

                                        <button className="mx-2 clearbutton" onClick={() => {removeItem(item._id, "item"+item._id, item.price, "qtd"+item._id)}}>Remove</button>
                                    </div>
                                ))
                            }
                        </div>
                    </section>
                </div>
            </div>

            <Footer />
        </div>
    );
}

export default Cart;