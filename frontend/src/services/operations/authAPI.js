import { apiConnector } from "../apiconnector"
import { endpoints } from "../apis"

const {
    SIGNUP_API,
    LOGIN_API,
} = endpoints

export function signUp(
    name,
    email,
    password,
    setShowLogin,
    setToken
) {
    return async () => {
        try {
            const response = await apiConnector("POST", SIGNUP_API, {
                name,
                email,
                password,
            })

            if (response.data.success) {
                console.log('Signup successful:', response.data);
                setToken(response.data.token)
                localStorage.setItem("token", response.data.token)
                setShowLogin(false);
            } else {
                console.error('Signup failed:', response.data.message);
                alert(response.data.message);
            }
        } catch (error) {
            console.error('An error occurred during signup:', error);
            alert('An error occurred during signup. Please try again.');
        }
    }
}

export function login(
    email,
    password,
    setShowLogin,
    setToken
) {
    return async () => {
        try {
            const response = await apiConnector("POST", LOGIN_API, {
                email,
                password,
            })

            if (response.data.success) {
                console.log('Login successful:', response.data);
                setToken(response.data.token)
                localStorage.setItem("token", response.data.token)
                setShowLogin(false);
            } else {
                console.error('Login failed:', response.data.message);
                alert(response.data.message);
            }
        } catch (error) {
            console.error('An error occurred during Login:', error);
            alert('An error occurred during Login. Please try again.');
        }
    }
}