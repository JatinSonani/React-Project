import * as actionTypes from "../constants/cartConstants";

const cartFromStorage = JSON.parse(localStorage.getItem("cart")) || [];

export const cartReducer = (state = { cartItems: cartFromStorage }, action) => {
    switch (action.type) {
        case actionTypes.ADD_TO_CART:
            return { ...state, cartItems: action.payload };

        case actionTypes.REMOVE_FROM_CART:
            return { ...state, cartItems: action.payload };

        default:
            return state;
    }
};
