import * as actionTypes from "../constants/cartConstants";
import axios from "axios";
import productData from '../../server/db.json';

export const addToCart = (id, quantity) => async (dispatch, getState) => {
    try {
        // Find product from db.json
        const product = productData.products.find((p) => p.id === id);

        if (!product) {
            console.error("Product not found");
            return;
        }

        // Create a cart item
        const cartItem = { ...product, quantity };

        // Get current cart items from local storage
        let cartItems = JSON.parse(localStorage.getItem("cart")) || [];

        // Check if item already exists in cart
        const itemExists = cartItems.find((item) => item.id === id);
        if (itemExists) {
            cartItems = cartItems.map((item) =>
                item.id === id ? { ...item, quantity: item.quantity + quantity } : item
            );
        } else {
            cartItems.push(cartItem);
        }

        // Save to local storage
        localStorage.setItem("cart", JSON.stringify(cartItems));

        // Dispatch action
        dispatch({ type: actionTypes.ADD_TO_CART, payload: cartItems });

    } catch (error) {
        console.log("Error while adding to cart:", error);
    }
};

// Remove from Cart
export const removeFromCart = (id) => async (dispatch) => {
    try {
        // Get current cart items
        let cartItems = JSON.parse(localStorage.getItem("cart")) || [];

        // Filter out the item to be removed
        cartItems = cartItems.filter((item) => item.id !== id);

        // Update local storage
        localStorage.setItem("cart", JSON.stringify(cartItems));

        // Dispatch action
        dispatch({
            type: actionTypes.REMOVE_FROM_CART,
            payload: cartItems,
        });

    } catch (error) {
        console.log("Error while removing from cart:", error);
    }
};

