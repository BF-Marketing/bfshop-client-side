
import React, {useState, useEffect} from 'react'
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom'
import axios from 'axios'
import About from './pages/About'
import Home from './pages/Home'
import Clothing from './pages/Clothing'
import Accessory from './pages/Accessories'
import Shoes from './pages/Shoes'
import Products from './pages/Products'
import Cart from './pages/Cart'
import Order from './pages/Order'
import SubmitProduct from './pages/submitProduct'
import Login from './pages/Login'
import NotFound from './pages/404'
import { dataContext } from './contexts/dataContext.js'

function App() {
    const [loading, setLoading] = useState(true);
    const [productSubmitted, setProductSubmitted] = useState(0);
    const [beforeRender, setBeforeRender] = useState(true);
    const [user, setUser] = useState(() => { return {auth: false, id: null, username: null} })
    const [products, setProducts] = useState([]);
    const [searchProduct, setSearchProduct] = useState([]);
    const [itemsInCart, setItemsInCart] = useState(() => { return {totalItems: 0, totalPrice: 0, productList: []} })

    useEffect(() => {
        axios.get("https://radiant-retreat-44230.herokuapp.com/all-products", {withCredentials: true})
        .then(response => {
            setUser({auth: response.data.auth, id: response.data.id, username: response.data.username});
            setProducts(response.data.products);
            setLoading(false);
            setBeforeRender(false);
        })
        .catch(error => {
            setLoading(false);
            setBeforeRender(false);
        })
    }, [productSubmitted])
    
    return (
        <Router>
            <Switch>
                <Route exact path='/'>
                    <dataContext.Provider value={ {itemsInCart, setLoading, loading, user, setSearchProduct} }>
                        {!beforeRender ? ( !user.auth ? <Home /> : <Clothing />) : <></>}
                    </dataContext.Provider>
                </Route>

                <Route exact path='/about'>
                    <dataContext.Provider value={ {user, itemsInCart, setLoading, setSearchProduct} }>
                        <About />
                    </dataContext.Provider>
                </Route>

                <Route exact path='/clothing'>
                    <dataContext.Provider value={ {user, itemsInCart, setLoading, loading, setSearchProduct} }>
                        <Clothing />
                    </dataContext.Provider>
                </Route>

                <Route exact path='/shoes'>
                    <dataContext.Provider value={ {user, itemsInCart, setLoading, setSearchProduct} }>
                        <Shoes />
                    </dataContext.Provider>
                </Route>

                <Route exact path='/accessories'>
                    <dataContext.Provider value={ {user, itemsInCart, setLoading, setSearchProduct} }>
                        <Accessory />
                    </dataContext.Provider>
                </Route>

                <Route exact path='/login'>
                    <dataContext.Provider value={ {itemsInCart, loading, setLoading, user, setUser, setSearchProduct} }>
                        {!beforeRender ? ( !user.auth ? <Login /> : <Redirect to="/404" />) : <></>}
                    </dataContext.Provider>
                </Route>

                <Route exact path='/submit-product'>
                    <dataContext.Provider value={ {itemsInCart, loading, setLoading, user, setProductSubmitted, setSearchProduct} }>
                        {!beforeRender ? ( user.auth ? <SubmitProduct /> : <Redirect to="/404" />) : <></>}
                    </dataContext.Provider>
                </Route>

                <Route exact path='/products/:item'>
                    <dataContext.Provider value={ {itemsInCart, setItemsInCart, setLoading, loading, products, searchProduct, user, setSearchProduct} }>
                        <Products />
                    </dataContext.Provider>
                </Route>

                <Route exact path='/cart'>
                    <dataContext.Provider value={ {user, setLoading, itemsInCart, setItemsInCart, setSearchProduct} }>
                        <Cart />
                    </dataContext.Provider>
                </Route>

                <Route exact path='/order'>
                    <dataContext.Provider value={ {loading, setLoading, itemsInCart, setItemsInCart, user, setUser, setSearchProduct} }>

                        {!beforeRender ? ( user.auth ? (itemsInCart.totalItems ? <Order /> : <Redirect to="/cart" />) 
                        : <Redirect to="/login" /> ) : <></>}

                    </dataContext.Provider>
                </Route>

                <Route>
                    <dataContext.Provider value={ {user, itemsInCart, setLoading, setSearchProduct} }>
                        <NotFound />
                    </dataContext.Provider>
                </Route>
            </Switch>
        </Router>
    );
}

export default App;
