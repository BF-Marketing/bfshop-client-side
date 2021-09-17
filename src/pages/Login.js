import React, {useState, useContext} from 'react';
import { useHistory } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import axios from 'axios';
import { dataContext } from '../contexts/dataContext'
import loadergif from '../media/loader/gearloader.gif'

function Login() {
    const {user, setUser, loading, setLoading} = useContext(dataContext);
    const history = useHistory();

    // alternate between login and register forms display
    function showHideForms(showText, showForm, hideText, hideForm){
        const clickThisText = document.getElementById(showText);
        const showThisForm = document.getElementById(showForm);
        const hideThisText = document.getElementById(hideText);
        const hidethisForm = document.getElementById(hideForm);

        clickThisText.style.fontSize = '20px';
        showThisForm.classList.remove('d-none');

        hideThisText.style.fontSize = '14px';
        hidethisForm.classList.add('d-none');
    }

    const [errorMessageLogin, setErrorMessageLogin] = useState("");
    function loginUsers(e){
        e.preventDefault();
        setLoading(true);

        const productFormData = new FormData(e.target);
        axios.post('http://localhost:5000/login', productFormData, {withCredentials: true})
        .then(function (response) {
            if(!response.data.auth){
                setErrorMessageLogin(response.data.message);
                setLoading(false);
            }
            else{
                setUser(response.data);
                setLoading(false);
                history.push("/");
            }
            
        })
        .catch(function () {setLoading(false)});
    }

    const [errorMessageRegister, setErrorMessageRegister] = useState("");
    function registerUsers(e){
        e.preventDefault();
        setLoading(true);

        const productFormData = new FormData(e.target);
        axios.post('http://localhost:5000/register', productFormData, {withCredentials: true})
        .then(function (response) {
            if(!response.data.auth){
                setErrorMessageRegister(response.data.message);
                setLoading(false);
            }
            else{
                setUser(response.data);
                setLoading(false);
                history.push("/");
            }
        })
        .catch(function () {setLoading(false)});
    }

    const result = !user.auth ?
    (
        <div className="App">
            <div id="main_container">
                <div id="main_wrapper">
                    <Navbar />

                    {loading && (<img src={loadergif} className="loader" alt="Gear gif loader" width="50px" height="50px" />)}

                    <section className='d-flex flex-column align-items-center justify-content-center' id='mid_section'>
                        <h6 className='text-center my-4 fw-bold'>
                            <span onClick={() => {showHideForms('login_text', 'login_form', 'register_text', 'register_form')}} className='cursorPointer' id='login_text'>Login</span> / 
                            <span onClick={() => {showHideForms('register_text', 'register_form', 'login_text', 'login_form')}} className='cursorPointer' id='register_text'> Register</span>
                        </h6>

                        {/* LOGIN FORM */}
                        <form onSubmit={loginUsers} id='login_form' noValidate>
                            <div className="mb-3">
                                <input type="text" className="form-control" id="loginUsername" name="username" placeholder="Username" />
                            </div>
                            <div className="mb-3">
                                <input type="password" className="form-control" id="loginPassword" name="password" placeholder="Password" />
                            </div>
                            <div className="form-text error_message mb-2 text-center">
                                {errorMessageLogin}
                            </div>
                            <button type="submit" className="darkbuttons">Login</button>
                        </form>

                        {/* REGISTER FORM */}
                        <form onSubmit={registerUsers} className='d-none' id='register_form' noValidate>
                            <div className="mb-3">
                                <input type="email" className="form-control" id="registerEmail" name="email" placeholder="Email" />
                            </div>
                            <div className="mb-3">
                                <input type="text" className="form-control" id="registerUsername" name="username" placeholder="Username" />
                            </div>
                            <div className="mb-3">
                                <input type="password" className="form-control" id="registerPassword" name="password" placeholder="Password" />
                            </div>
                            <div className="form-text error_message text-center mb-2">
                                {errorMessageRegister}
                            </div>
                            <button type="submit" className="darkbuttons">Register</button>
                        </form>
                    </section>
                </div>
            </div>

            <Footer />
        </div>
    ) : 
    <></>;

    return result;
}

export default Login;