import React, { useContext, useState } from 'react';
import './LoginPopup.css';
import cross_icon from "../../assets/cross_icon.png";
import axios from "axios";
import { ListContext } from '../../context/ListContext';
import { login, signUp } from '../../services/operations/authAPI';
import { useNavigate } from 'react-router-dom';

const LoginPopup = ({ setShowLogin }) => {

    const navigate = useNavigate();

    const {url, setToken} = useContext(ListContext)

    const [currState, setCurrState] = useState("Login");
    const [data, setData] = useState({
        name: "",
        email: "",
        password: ""
    });

    const onChangeHandler = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setData(data => ({ ...data, [name]: value }));
    };

    const onLogin = async (event) => {
        event.preventDefault();
        await login(
            data.email,
            data.password,
            setShowLogin,
            setToken,
        )()
        setShowLogin(false)

        // try {
        //     const response = await axios.post(`${url}/api/user/login`, {
        //         email: data.email,
        //         password: data.password
        //     });

        //     if (response.data.success) {
        //         console.log('Login successful:', response.data);
        //         setToken(response.data.token)
        //         localStorage.setItem("token", response.data.token)
        //         setShowLogin(false);
        //     } else {
        //         console.error('Login failed:', response.data.message);
        //         alert(response.data.message);
        //     }
        // } catch (error) {
        //     console.error('An error occurred during login:', error);
        //     alert('An error occurred during login. Please try again.');
        // }
    };

    const onSignup = async (event) => {
        event.preventDefault();
        await signUp(
            data.name,
            data.email,
            data.password,
            navigate,
            setShowLogin,
            setToken,
        )()
        setShowLogin(false)
        // try {
        //     const response = await axios.post(`${url}/api/user/register`, {
        //         name: data.name,
        //         email: data.email,
        //         password: data.password
        //     });

        //     if (response.data.success) {
        //         console.log('Signup successful:', response.data);
        //         setShowLogin(false);
        //     } else {
        //         console.error('Signup failed:', response.data.message);
        //         setToken(response.data.token)
        //         localStorage.setItem("token", response.data.token)
        //         alert(response.data.message);
        //     }
        // } catch (error) {
        //     console.error('An error occurred during signup:', error);
        //     alert('An error occurred during signup. Please try again.');
        // }
    };

    const switchToSignup = () => {
        setCurrState("Sign Up");
    };

    const switchToLogin = () => {
        setCurrState("Login");
    };

    return (
        <div className='login-popup'>
            <form onSubmit={currState === "Login" ? onLogin : onSignup} className='login-popup-container'>
                <div className='login-popup-title'>
                    <h2>{currState}</h2>
                    <img onClick={() => setShowLogin(false)} src={cross_icon} alt='Close' />
                </div>
                <div className='login-popup-inputs'>
                    {currState === "Sign Up" && <input name='name' onChange={onChangeHandler} value={data.name} type='text' placeholder='Your name' required />}
                    <input name='email' onChange={onChangeHandler} value={data.email} type='email' placeholder='Your email' required />
                    <input name='password' onChange={onChangeHandler} value={data.password} type='password' placeholder='Password' required />
                </div>
                <button type='submit'>
                    {currState === "Sign Up" ? "Create account" : "Login"}
                </button>
                <div className='login-popup-condition'>
                    <input type='checkbox' required />
                    <p>By continuing, I agree to the terms of use & privacy policy.</p>
                </div>
                {
                    currState === "Login" ?
                        <p>Create an account? <span onClick={switchToSignup}>Click here</span></p> :
                        <p>Already have an account? <span onClick={switchToLogin}>Login here</span></p>
                }
            </form>
        </div>
    );
};

export default LoginPopup;
