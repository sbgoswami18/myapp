const BASE_URL = process.env.REACT_APP_BASE_URL
console.log(BASE_URL)
// AUTH ENDPOINTS
export const endpoints = {
    SIGNUP_API: BASE_URL + "/user/register",
    LOGIN_API: BASE_URL + "/user/login",
    USERDATA_API: BASE_URL + "/user/userData",
    USERDATAUPDATE_API: BASE_URL + "/user/userDataUpdate",
  }