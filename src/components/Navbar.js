
import React, { useEffect, useContext } from 'react';
import { Link, useHistory } from 'react-router-dom';
import axios from 'axios';
import { alternateUnderline } from '../functions/customFunctions.js';
import { dataContext } from '../contexts/dataContext.js';

function Navbar(){
    useEffect(() => { alternateUnderline(window.location.pathname) }, []);
    const {user, itemsInCart, setLoading, setSearchProduct} = useContext(dataContext);
    let history = useHistory();

    // submits user input to search a product on the database
    function searchSubmit(e){
        e.preventDefault();
        setLoading(true);

        if(e.target.lastElementChild.value !== null && e.target.lastElementChild.value !== ""){
            axios.get(process.env.REACT_APP_SEARCH_API, {params: {item: e.target.lastElementChild.value}}, {withCredentials: true})
            .then(function (response) {
                setSearchProduct(response.data);
                setLoading(false);
                history.push(`/products/${e.target.lastElementChild.value}`);
            })
            .catch(function () {setLoading(false)});
        }
    }

    function logout(){
        axios.post(process.env.REACT_APP_LOGOUT_API, {}, {withCredentials: true})
        .then(response => {window.location.replace(process.env.REACT_APP_URL)})
    }

    // changes navbar color based on user authentication
    if(user.auth){
        document.documentElement.style.setProperty("--navbar-color", "white");
        document.documentElement.style.setProperty("--navbar-backg-color", "black");
        document.documentElement.style.setProperty("--hamburger-btn", `url("data:image/svg+xml;charset=utf8,<svg viewBox='0 0 32 32' xmlns='http://www.w3.org/2000/svg'><path stroke='rgb(255, 255, 255)' stroke-width='2' stroke-linecap='round' stroke-miterlimit='10' d='M4 8h24M4 16h24M4 24h24'/></svg>"`);
    }
    else{
        document.documentElement.style.setProperty("--navbar-color", "black");
        document.documentElement.style.setProperty("--navbar-backg-color", "white");
        document.documentElement.style.setProperty("--hamburger-btn", `url("data:image/svg+xml;charset=utf8,<svg viewBox='0 0 32 32' xmlns='http://www.w3.org/2000/svg'><path stroke='rgb(0, 0, 0)' stroke-width='2' stroke-linecap='round' stroke-miterlimit='10' d='M4 8h24M4 16h24M4 24h24'/></svg>"`);
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

                            {!user.auth && (
                                <li className="nav-item mx-xl-2">
                                    <Link to="/" className="nav-link d-inline-block active home" aria-current="page">HOME</Link>
                                </li>
                            )}
                            
                            {user.auth && (
                                <div className="mx-xl-2 user_profile d-flex flex-column flex-xl-row justify-content-center justify-content-xl-start align-items-xl-center">
                                    <i className="bi bi-person-circle"></i>
                                    <li className="nav-item mx-xl-2">
                                        <p className="d-inline-block m-0 fw-bold">{user.username.toUpperCase()}</p>
                                    </li>
                                </div>
                            )}

                            <li className="nav-item mx-xl-2">
                                <Link to="/clothing" className="nav-link d-inline-block cursorPointer clothing">CLOTHING</Link>
                            </li>

                            <li className="nav-item mx-xl-2">
                                <Link to="/shoes" className="nav-link d-inline-block cursorPointer shoes">SHOES</Link>
                            </li>

                            <li className="nav-item mx-xl-2">
                                <Link to="/accessories" className="nav-link d-inline-block cursorPointer accessories">ACCESSORIES</Link>
                            </li>
                            
                            {!user.auth && (
                                <li className="nav-item mx-xl-2">
                                    <Link to="/login" className="nav-link d-inline-block cursorPointer login">LOGIN</Link>
                                </li>
                            )}

                            {user.auth && (
                                <li className="nav-item mx-xl-2">
                                    <Link to="/submit-product" className="nav-link d-inline-block cursorPointer submit-product">PRODUCT</Link>
                                </li>
                            )}

                            {user.auth && (
                                <li className="nav-item mx-xl-2">
                                    <p onClick={logout} className="nav-link d-inline-block cursorPointer m-0">LOGOUT</p>
                                </li>
                            )}
                            
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