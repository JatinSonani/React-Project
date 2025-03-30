import * as actionTypes from "../constants/cartConstants";
import { db } from "../../server/firebaseConfig";
import { doc, getDoc, setDoc, updateDoc, deleteField } from "firebase/firestore";



// ✅ Set Cart Items
export const setCartItems = (items) => (dispatch) => {
    dispatch({
        type: "SET_CART_ITEMS",
        payload: items,
    });
};

// ✅ Get Product from Firebase
const getProductFromFirebase = async (id) => {
    const productRef = doc(db, "products", id);
    const productSnap = await getDoc(productRef);

    return productSnap.exists() ? { id: productSnap.id, ...productSnap.data() } : null;
};

// ✅ Get Cart from Firebase (Always returns an object)
const getCartFromFirebase = async (userId) => {
    const cartRef = doc(db, "carts", userId);
    const cartSnap = await getDoc(cartRef);

    console.log("Cart snapshot:", cartSnap); // Debugging line
    console.log("Cart data:", cartSnap.data()); // Debugging line

    return cartSnap.exists() ? cartSnap.data().items || {} : {}; // Ensure it's an object
};

// ✅ Update Cart in Firebase
const updateCartInFirebase = async (userId, cartItems) => {
    const cartRef = doc(db, "carts", userId);
    await setDoc(cartRef, { items: cartItems }, { merge: true });
};

// ✅ Add to Cart
export const addToCart = (id, quantity, userId) => async (dispatch) => {
    console.log("Adding to cart:", id, quantity, userId); // Debugging line
    try {
        const product = await getProductFromFirebase(id);
        if (!product) {
            console.error("Product not found");
            return;
        }

        let cartItems = await getCartFromFirebase(userId);

        // Ensure cartItems is an object
        if (!cartItems || typeof cartItems !== "object") {
            cartItems = {};
        }

        // Add or update the item
        if (cartItems[id]) {
            cartItems[id].quantity += quantity;
        } else {
            cartItems[id] = { ...product, quantity };
        }

        // ✅ Update Firestore
        await updateCartInFirebase(userId, cartItems);

        // ✅ Convert object to array before dispatching
        dispatch({ type: actionTypes.ADD_TO_CART, payload: Object.values(cartItems) });

    } catch (error) {
        console.error("Error adding to cart:", error);
    }
};

// ✅ Remove from Cart
export const removeFromCart = (id, userId) => async (dispatch) => {
    try {
        let cartItems = await getCartFromFirebase(userId);

        // Ensure cartItems is an object
        if (!cartItems || typeof cartItems !== "object") {
            cartItems = {};
        }

        if (!cartItems[id]) return; // Item doesn't exist

        // Remove the item
        delete cartItems[id];

        // ✅ Update Firestore
        const cartRef = doc(db, "carts", userId);
        await updateDoc(cartRef, { [`items.${id}`]: deleteField() });

        // ✅ Convert object to array before dispatching
        dispatch({ type: actionTypes.REMOVE_FROM_CART, payload: Object.values(cartItems) });

    } catch (error) {
        console.error("Error removing from cart:", error);
    }
};

// ✅ Fetch Cart Items for User
export const fetchCart = (userId) => async (dispatch) => {
    try {
        let cartItems = await getCartFromFirebase(userId);

        console.log("Fetched cart items:", cartItems); // Debugging line

        // Ensure cartItems is an object
        if (!cartItems || typeof cartItems !== "object") {
            cartItems = {};
        }

        dispatch({ type: actionTypes.FETCH_CART_SUCCESS, payload: Object.values(cartItems) });

    } catch (error) {
        console.error("Error fetching cart:", error);
        dispatch({ type: actionTypes.FETCH_CART_FAIL, payload: error.message });
    }
};

// ✅ Sync Cart after Login
export const fetchUserCart = (userId) => async (dispatch) => {
    try {
        const cartItems = await getCartFromFirebase(userId);
        dispatch({ type: actionTypes.FETCH_CART_SUCCESS, payload: Object.values(cartItems) });
    } catch (error) {
        console.error("Error fetching user cart:", error);
    }
};
