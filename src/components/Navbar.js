
import React, { useEffect, useContext } from 'react';
import { Link, useHistory } from 'react-router-dom';
import axios from 'axios';
import { alternateUnderline } from '../functions/customFunctions.js';
import { dataContext } from '../contexts/dataContext.js';

function Navbar(){
    useEffect(() => { alternateUnderline(window.location.pathname) }, []);
    const {itemsInCart, setLoading, setSearchProduct} = useContext(dataContext);
    let history = useHistory();

    // submits user input to search a product on the database
    function searchSubmit(e){
        e.preventDefault();
        setLoading(true);

        if(e.target.lastElementChild.value !== null && e.target.lastElementChild.value !== ""){
            axios.get(process.env.REACT_APP_SEARCH_API, {params: {item: e.target.lastElementChild.value}})
            .then(function (response) {
                setSearchProduct(response.data);
                setLoading(false);
                history.push(`/products/${e.target.lastElementChild.value}`);
            })
            .catch(function () {setLoading(false)});
        }
    }

    return (
        <header>
            <nav className="navbar navbar-expand-xl navbar-light">
                <div className="container-fluid">
                    <Link className="navbar-brand ms-3 ms-md-5" to="/">
                        <h1 className="my-0 monument_font_ultraBold">BF SHOP</h1>
                    </Link>

                    <button className="navbar-toggler custom-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>

                    <div className="collapse navbar-collapse d-xl-flex justify-content-xl-end" id="navbarNavAltMarkup">
                        <div className="navbar-nav ms-3 ms-md-5 ms-xl-0 d-xl-flex justify-content-xl-center align-items-xl-center">

                            <li className="nav-item mx-xl-2">
                                <Link to="/" className="nav-link d-inline-block active home" aria-current="page">HOME</Link>
                            </li>

                            <li className="nav-item mx-xl-2">
                                <Link to="/clothing" className="nav-link d-inline-block cursorPointer clothing">CLOTHING</Link>
                            </li>

                            <li className="nav-item mx-xl-2">
                                <Link to="/shoes" className="nav-link d-inline-block cursorPointer shoes">SHOES</Link>
                            </li>

                            <li className="nav-item mx-xl-2">
                                <Link to="/accessories" className="nav-link d-inline-block cursorPointer accessories">ACCESSORIES</Link>
                            </li>

                            <li className="nav-item mx-xl-2">
                                <Link to="/submit-product" className="nav-link d-inline-block cursorPointer submit-product">PRODUCT</Link>
                            </li>
                            
                            <li className="nav-item mx-xl-2">
                                <Link to="/cart" className="bi bi-cart4 fw-bold cursorPointer">
                                    <p className="p-1">{itemsInCart.totalItems ? itemsInCart.totalItems : <></>}</p>
                                </Link>
                            </li>

                            <form onSubmit={searchSubmit} className="d-flex justify-content-center align-items-center mx-xl-2" id="searchForm" noValidate>
                                <button type="submit" className="btn btn-sm">
                                    <i className="bi bi-search fw-bold cursorPointer"></i>
                                </button>
                                <input className="form-control" type="search" placeholder="Search" aria-label="Search" />
                            </form>
                        </div>
                    </div>
                </div>
            </nav>
        </header>
    );
}

export default Navbar;