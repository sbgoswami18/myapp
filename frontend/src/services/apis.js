const BASE_URL = process.env.REACT_APP_BASE_URL
console.log(BASE_URL)
// AUTH ENDPOINTS
export const endpoints = {
    SIGNUP_API: BASE_URL + "/api/user/register",
    LOGIN_API: BASE_URL + "/api/user/login",
 }