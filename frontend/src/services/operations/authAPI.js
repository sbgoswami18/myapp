import { apiConnector } from "../apiconnector"
import { endpoints } from "../apis"

const {
    SIGNUP_API,
    LOGIN_API,
    USERDATA_API,
    USERDATAUPDATE_API,
} = endpoints

export function signUp(
    name,
    email,
    password,
    navigate,
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
                // navigate("/login")
            } else {
                console.error('Signup failed:', response.data.message);
                alert(response.data.message);
            }

            // console.log("SIGNUP API RESPONSE............", response)

            // if(!response.data.success) {
            //     throw new Error(response.data.message)
            // }

        } catch (error) {
            console.error('An error occurred during signup:', error);
            alert('An error occurred during signup. Please try again.');
            // console.log("SIGNUP API ERROR............", error)
            navigate("/register")
        }
    }
}