import * as actionTypes from "../constants/cartConstants";
import { db } from "../../server/firebaseConfig";
import { collection, getDoc, getDocs, doc, setDoc, updateDoc, deleteDoc} from "firebase/firestore";

// Function to get a product from Firebase by ID
const getProductFromFirebase = async (id) => {
    const productRef = doc(db, "products", id);
    const productSnap = await getDoc(productRef);
    
    if (productSnap.exists()) {
        return { id: productSnap.id, ...productSnap.data() };
    }
    return null;
};

// Function to get the current cart from Firebase
const getCartFromFirebase = async (userId) => {
    const cartRef = collection(db, "carts", userId, "items");
    const cartSnap = await getDocs(cartRef);
    console.log("CartSnap:", cartSnap);
    
    let cartItems = [];
    cartSnap.forEach(doc => {
        cartItems.push({ id: doc.id, ...doc.data() });
    });

    return cartItems;
};

// Function to update cart item in Firebase
const updateCartInFirebase = async (userId, cartItems) => {
    const cartRef = collection(db, "carts", userId, "items");

    // Clear existing cart before adding updated items
    const existingCart = await getCartFromFirebase(userId);
    for (const item of existingCart) {
        await deleteDoc(doc(cartRef, item.id));
    }

    // Add updated items
    for (const item of cartItems) {
        await setDoc(doc(cartRef, item.id), item);
    }
};

// ** Add to Cart **
export const addToCart = (id, quantity, userId) => async (dispatch) => {
    try {
        const product = await getProductFromFirebase(id);
        if (!product) {
            console.error("Product not found");
            return;
        }

        let cartItems = await getCartFromFirebase(userId);

        // Check if item exists in the cart
        const itemExists = cartItems.find((item) => item.id === id);
        if (itemExists) {
            cartItems = cartItems.map((item) =>
                item.id === id ? { ...item, quantity: item.quantity + quantity } : item
            );
        } else {
            cartItems.push({ ...product, quantity });
        }

        // Update cart in Firebase
        await updateCartInFirebase(userId, cartItems);

        // Dispatch action
        dispatch({ type: actionTypes.ADD_TO_CART, payload: cartItems });

    } catch (error) {
        console.log("Error while adding to cart:", error);
    }
};

// ** Remove from Cart **
export const removeFromCart = (id, userId) => async (dispatch) => {
    try {
        let cartItems = await getCartFromFirebase(userId);

        // Remove the item
        cartItems = cartItems.filter((item) => item.id !== id);

        // Update cart in Firebase
        await updateCartInFirebase(userId, cartItems);

        // Dispatch action
        dispatch({ type: actionTypes.REMOVE_FROM_CART, payload: cartItems });

    } catch (error) {
        console.log("Error while removing from cart:", error);
    }
};

// ** Fetch Cart Items for User **
export const fetchCart = (userId) => async (dispatch) => {
    try {
        console.log("Fetching cart...");
        const cartItems = await getCartFromFirebase(userId);
        
        console.log("Fetched Cart Items:", cartItems);
        console.log("Dispatching FETCH_CART_SUCCESS...");

        dispatch({ type: actionTypes.FETCH_CART_SUCCESS, payload: Object.values(cartItems) });

    } catch (error) {
        console.error("Error fetching cart:", error);

        console.log("Dispatching FETCH_CART_FAIL...");
        dispatch({ type: actionTypes.FETCH_CART_FAIL, payload: error.message });
    }
};
