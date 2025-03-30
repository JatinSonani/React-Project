import {
    SIGNUP_SUCCESS,
    SIGNUP_REJECT,
    SIGNIN_SUCCESS,
    SIGNIN_REJECT,
    LOGOUT,
  } from "../constants/authConstants";
  
  const initialState = {
    user: JSON.parse(sessionStorage.getItem("user")) || null,
    cart: JSON.parse(sessionStorage.getItem("cart")) || [],
    loading: false,
    error: null,
  };
  
  const authReducer = (state = initialState, action) => {
    switch (action.type) {
      case "LOGIN_REQUEST":
        return { ...state, loading: true };
      case SIGNIN_SUCCESS:
        sessionStorage.setItem("user", JSON.stringify(action.payload));
        return { ...state, loading: false, user: action.payload };
      case SIGNIN_REJECT:
        return { ...state, loading: false, error: action.payload };
      case LOGOUT:
        sessionStorage.removeItem("user");
        sessionStorage.removeItem("cart");
        return { ...state, user: null, cart: [] };
      default:
        return state;
    }
  };
  
  export default authReducer;
  