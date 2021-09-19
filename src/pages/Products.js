import React, { useContext, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { dataContext } from '../contexts/dataContext';
import ProductDetailsModal from '../components/ProductDetailsModal';
import ReactPaginate from 'react-paginate';
import loadergif from '../media/loader/gearloader.gif'

function Products(){
    const { loading, products, searchProduct } = useContext(dataContext);
    let [orderBy, setOrderBy] = useState({price: "increment", color: null});
    
    // get type of product queried from url parameter
    let productType = null;
    let wasItSearched = false;
    const { item } = useParams();
    switch(item){
        case "t-shirts":
        case "pants":
            productType = !loading && products[1].filter(each => each.category.toLowerCase() === item);
            break;
        case "sneakers":
        case "boots":
            productType = !loading && products[2].filter(each => each.category.toLowerCase() === item);
            break;
        case "watches":
        case "bracelets":
            productType = !loading && products[0].filter(each => each.category.toLowerCase() === item);
            break;
        default:
            wasItSearched = true;
            productType = !loading && searchProduct;
    }

    // shows only colors name of the items shown
    const productsColors = [];
    !loading && productType && productType.forEach(each => productsColors.includes(each.color) ? <></> :  productsColors.push(each.color))

    // filters items by color
    !loading && orderBy.color && productType && productType.filter(each => each.color === orderBy.color).length ? 
    productType = productType.filter(each => each.color === orderBy.color) 
    : productType = !loading && productType && productType.filter(each => productsColors.includes(each.color))

    // sorts products from lowest to highest
    orderBy.price === "increment" ? !loading && productType && productType.sort(function(this_item, next_item){return this_item.price - next_item.price})
    : !loading && productType && productType.sort(function(this_item, next_item){return next_item.price - this_item.price})

    // PAGINATION
    const [pageNumber, setPageNumber] = useState(0);
    const itemsPerPage = 6;
    const pagesVisited = pageNumber * itemsPerPage;

    // creates div to wrap every product & selects a specific number of products per page
    const displayItems = !loading && productType && productType.slice(pagesVisited, pagesVisited + itemsPerPage).map((product) => {
        return (
            <div key={product._id} className='col-12 col-md-4'>
                <div className='d-flex justify-content-center align-items-center my-3 product_wrapped'>
                    <img className="cursorPointer" data-bs-toggle="modal" data-bs-target={"#item"+product._id} src={product.image} width='140px'  height='150px' alt="" />
                    <span className="d-none product_info">
                        <span>
                            <i className="bi bi-heart me-2"></i>
                            <small>{product.likes}</small>
                        </span>
                        <p className="mt-2 mb-0">{product.inStock} In stock</p>
                        <p>${product.price}</p>
                    </span>
                </div>
            </div>
        );
    });

    const pageCount = !loading && Math.ceil(productType && productType.length / itemsPerPage);
    const changePage = ({ selected }) => { setPageNumber(selected) };

    // toggles the sidebar
    function showHideSidebar(){
        const productsShown = document.getElementById("products_shown");
        const sidebar = document.getElementById("sidebar");
        const productInfo = document.querySelectorAll(".product_info");

        productsShown.classList.toggle("col-7");
        productsShown.classList.toggle("col-md-8");
        productsShown.classList.toggle("col-12");
        sidebar.classList.toggle("d-none");

        sidebar.classList.contains("d-none") ? productInfo.forEach(element => element.classList.remove("d-none"))
        : productInfo.forEach(element => element.classList.add("d-none"))
    }

    // filters product display based on price
    function filterOnPrice(e){
        const lowestOption = document.getElementById("lowest_price");
        const highestOption = document.getElementById("highest_price");
        if(e.target.id === "lowest_price"){
            lowestOption.classList.add("fw-bold");
            highestOption.classList.remove("fw-bold");
            setOrderBy({price: "increment", color: null});
        }
        else{
            highestOption.classList.add("fw-bold");
            lowestOption.classList.remove("fw-bold");
            setOrderBy({price: "decrement", color: null});
        }
    }

    // filters product display based on color
    function filterOnColor(this_color){ setOrderBy({price: "increment", color: this_color}); }

    return (
        <div className="App">
            <div id="main_container">
                <div id="main_wrapper">
                    <Navbar />
                    
                    {loading && (<img src={loadergif} className="loader" alt="Gear gif loader" width="50px" height="50px" />)}

                    <section className='container-fluid' id="productsDisplay">
                        {/* MODAL - shows details of each product */}
                        {
                            !loading && productType && productType.map(product => (
                                <div key={product._id} className="modal fade" id={"item"+product._id} tabIndex="-1" aria-labelledby="productsModalLabel" aria-hidden="true">
                                    <ProductDetailsModal product={product} />
                                </div>
                            ))
                        }

                        <div className="row h-100">
                            {/* SIDEBAR */}
                            <div className="col-5 col-md-4 py-4 monument_font_light" id="sidebar">
                                <div>
                                    <p className="monument_font_black sidebar_titles">Gucci</p>
                                    <p className="sidebar_options"><Link to="/products/t-shirts">T-shirts</Link></p>
                                    <p className="sidebar_options"><Link to="/products/pants">Pants</Link></p>

                                    <p className="monument_font_black sidebar_titles">Louis Vuitton</p>
                                    <p className="sidebar_options"><Link to="/products/sneakers">Sneakers</Link></p>
                                    <p className="sidebar_options"><Link to="/products/boots">Boots</Link></p>

                                    <p className="monument_font_black sidebar_titles">Giorgio Armani</p>
                                    <p className="sidebar_options"><Link to="/products/watches">Watches</Link></p>
                                    <p className="sidebar_options"><Link to="/products/bracelets">Bracelets</Link></p>
                                </div>

                                <div>
                                    <p className="monument_font_black sidebar_titles">Price ($)</p>
                                    <p><span id="lowest_price" onClick={filterOnPrice} className="cursorPointer sidebar_options fw-bold">Lowest</span></p>
                                    <p><span id="highest_price" onClick={filterOnPrice} className="cursorPointer sidebar_options">Highest</span></p>
                                </div>

                                <div>
                                    <p className="monument_font_black sidebar_titles">Color</p>

                                    {!loading && productsColors.map((each, index) => (<p key={index} className="sidebar_options"><span onClick={() => filterOnColor(each)} className="cursorPointer">{each}</span></p>))}
                                </div>
                            </div>

                            {/* PRODUCT DISPLAY */}
                            <div className="col-7 col-md-8" id="products_shown">
                                <div>
                                    <i onClick={showHideSidebar} className="bi bi-layout-sidebar-inset cursorPointer"></i>
                                    { !loading && wasItSearched && productType && (<p className="text-center fw-bold">{productType.length} Products found</p>) }
                                </div>

                                {
                                    !loading && displayItems &&
                                
                                    (<div className="row h-100">
                                        {displayItems}
    
                                        <ReactPaginate 
                                            previousLabel={"<"}
                                            nextLabel={">"}
                                            breakLabel={"..."}
                                            pageCount={pageCount}
                                            onPageChange={changePage}
                                            containerClassName=
                                            {"pagination d-flex justify-content-center align-items-end p-0"}
                                            pageClassName={"page-item"}
                                            previousClassName={"page-item"}
                                            nextClassName={"page-item"}
                                            pageLinkClassName={"page-link"}
                                            previousLinkClassName={"page-link"}
                                            nextLinkClassName={"page-link"}
                                            breakClassName={"page-item"}
                                            breakLinkClassName={"page-link"}
                                            activeClassName={"active"}
                                            marginPagesDisplayed={1}
                                            pageRangeDisplayed={2}
                                        />
                                    </div>)
                                }
                            </div>
                        </div>
                    </section>
                </div>
            </div>

            <Footer />
        </div>
    );
}

export default Products;