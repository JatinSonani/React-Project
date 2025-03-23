import * as actionTypes from "../constants/productConstant";
import { db } from "../../server/firebaseConfig";
import {collection, getDocs, getDoc} from "firebase/firestore";

// ** Fetch all products from Firebase **
export const getProducts = () => async (dispatch) => {
    try {
        const productsRef = collection(db, "products");
        const productsSnap = await getDocs(productsRef);

        let products = [];
        productsSnap.forEach((doc) => {
            products.push({ id: doc.id, ...doc.data() });
        });

        dispatch({ type: actionTypes.GET_PRODUCTS_SUCCESS, payload: products });

    } catch (error) {
        dispatch({
            type: actionTypes.GET_PRODUCTS_FAIL,
            payload: error.message,
        });
    }
};

// ** Fetch a single product by ID from Firebase **
export const getProductDetails = (id) => async (dispatch) => {
    try {
        dispatch({ type: actionTypes.GET_PRODUCT_DETAILS_REQUEST });

        const productRef = doc(db, "products", id);
        const productSnap = await getDoc(productRef);

        if (productSnap.exists()) {
            dispatch({ type: actionTypes.GET_PRODUCT_DETAILS_SUCCESS, payload: { id, ...productSnap.data() } });
        } else {
            dispatch({ type: actionTypes.GET_PRODUCT_DETAILS_FAIL, payload: "Product not found" });
        }

    } catch (error) {
        dispatch({
            type: actionTypes.GET_PRODUCT_DETAILS_FAIL,
            payload: error.message,
        });
    }
};

// ** Remove product details from state **
export const removeProductDetails = () => (dispatch) => {
    dispatch({ type: actionTypes.GET_PRODUCT_DETAILS_RESET });
};
