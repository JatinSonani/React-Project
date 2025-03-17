import * as actionTypes from '../constants/productConstant';
import productData from '../../server/db.json';

export const getProducts = () => async (dispatch) => {
    try {
        const data = productData;

        dispatch({ type: actionTypes.GET_PRODUCTS_SUCCESS, payload: data.products });

    } catch (error) {
        dispatch({ 
            type: actionTypes.GET_PRODUCTS_FAIL, 
            payload: error.response ? error.response.data : error.message 
        });
    }
};

export const getProductDetails = (id) => async (dispatch, getState) => {
    try {
        dispatch({ type: actionTypes.GET_PRODUCT_DETAILS_REQUEST });

        
        const { getProducts } = getState();
        const product = getProducts.products.find((item) => item.id === id);

        if (product) {
            dispatch({ type: actionTypes.GET_PRODUCT_DETAILS_SUCCESS, payload: product });
        } else {
            dispatch({ type: actionTypes.GET_PRODUCT_DETAILS_FAIL, payload: "Product not found" });
        }

    } catch (error) {
        dispatch({ 
            type: actionTypes.GET_PRODUCT_DETAILS_FAIL, 
            payload: error.message 
        });
    }
};

export const removeProductDetails = () => (dispatch) => {
    dispatch({ type: actionTypes.GET_PRODUCT_DETAILS_RESET });
};