
import React, {useState, useEffect} from 'react'
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom'
import axios from 'axios'
import Home from './pages/Home'
import Clothing from './pages/Clothing'
import Accessory from './pages/Accessories'
import Shoes from './pages/Shoes'
import Products from './pages/Products'
import Cart from './pages/Cart'
import Order from './pages/Order'
import SubmitProduct from './pages/submitProduct'
import NotFound from './pages/404'
import { dataContext } from './contexts/dataContext.js'

function App() {
    const [loading, setLoading] = useState(true);
    const [productSubmitted, setProductSubmitted] = useState(0);
    const [products, setProducts] = useState([]);
    const [searchProduct, setSearchProduct] = useState([]);
    const [itemsInCart, setItemsInCart] = useState(() => { return {totalItems: 0, totalPrice: 0, productList: []} })

    useEffect(() => {
        axios.get(process.env.REACT_APP_ALL_PRODUCTS_API)
        .then(response => {
            setProducts(response.data);
            setLoading(false);
        })
        .catch(error => {
            setLoading(false);
        })
    }, [productSubmitted])
    
    return (
        <Router>
            <Switch>
                <Route exact path='/'>
                    <dataContext.Provider value={ {itemsInCart, setLoading, loading, setSearchProduct} }>
                        <Home />
                    </dataContext.Provider>
                </Route>

                <Route exact path='/clothing'>
                    <dataContext.Provider value={ {itemsInCart, setLoading, loading, setSearchProduct} }>
                        <Clothing />
                    </dataContext.Provider>
                </Route>

                <Route exact path='/shoes'>
                    <dataContext.Provider value={ {itemsInCart, setLoading, setSearchProduct} }>
                        <Shoes />
                    </dataContext.Provider>
                </Route>

                <Route exact path='/accessories'>
                    <dataContext.Provider value={ {itemsInCart, setLoading, setSearchProduct} }>
                        <Accessory />
                    </dataContext.Provider>
                </Route>

                <Route exact path='/submit-product'>
                    <dataContext.Provider value={ {itemsInCart, loading, setLoading, setProductSubmitted, setSearchProduct} }>
                        <SubmitProduct />
                    </dataContext.Provider>
                </Route>

                <Route exact path='/products/:item'>
                    <dataContext.Provider value={ {itemsInCart, setItemsInCart, setLoading, loading, products, searchProduct, setSearchProduct} }>
                        <Products />
                    </dataContext.Provider>
                </Route>

                <Route exact path='/cart'>
                    <dataContext.Provider value={ {setLoading, itemsInCart, setItemsInCart, setSearchProduct} }>
                        <Cart />
                    </dataContext.Provider>
                </Route>

                <Route exact path='/order'>
                    <dataContext.Provider value={ {loading, setLoading, itemsInCart, setItemsInCart, setSearchProduct} }>
                        {itemsInCart.totalItems ? <Order /> : <Redirect to="/cart" />}
                    </dataContext.Provider>
                </Route>

                <Route>
                    <dataContext.Provider value={ {itemsInCart, setLoading, setSearchProduct} }>
                        <NotFound />
                    </dataContext.Provider>
                </Route>
            </Switch>
        </Router>
    );
}

export default App;
