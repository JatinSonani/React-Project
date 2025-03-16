import * as actionTypes from "../constants/cartConstants";
import axios from "axios";


export const addToCart = (id, quantity) => async (dispatch) => {
    try {
        const { data } = await axios.get(`http://localhost:8000/products/${id}`);

        const cartItem = { ...data, quantity };

        // Save item to `db.json`
        await axios.post(`http://localhost:8000/cartItems`, cartItem);

        dispatch({ type: actionTypes.ADD_TO_CART, payload: cartItem });
    } catch (error) {
        console.log("Error while adding to cart:", error);
    }
};

export const removeFromCart = (id) => async (dispatch) => {
    try {
        // Remove item from db.json
        await axios.delete(`http://localhost:8000/cartItems/${id}`);

        dispatch({
            type: actionTypes.REMOVE_FROM_CART,
            payload: id,
        });
    } catch (error) {
        console.log("Error while removing from cart:", error);
    }
};

