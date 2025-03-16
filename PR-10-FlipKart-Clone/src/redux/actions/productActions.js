import * as actionTypes from '../constants/productConstant';
import axios from 'axios';

export const getProducts = () => async (dispatch) => {
    try {
        const data = {
            "recipes": [
              {
                "id": "1234",
                "title": "I-Phone",
                "instructions": "I-Phone 12 Pro Max is a great phone",
                "Features": "dcad",
                "image": "https://m.media-amazon.com/images/I/713SsA7gftL._AC_UF1000,1000_QL80_.jpg",
                "price": "1500"
              },
              {
                "id": "1235",
                "title": "Samsung",
                "instructions": "Samsung Galaxy S21 Ultra is a great phone",
                "Features": "dcad",
                "image": "https://m.media-amazon.com/images/I/71cD4NUIBWL._AC_UY218_.jpg",
                "price": "1500"
              },
              {
                "id": "1236",
                "title": "One Plus",
                "instructions": "One Plus 9 Pro is a great phone",
                "Features": "dcad",
                "image": "https://image01-in.oneplus.net/media/202406/19/ec64eb41a8e787a798be1b71c13a51bb.png?x-amz-process=image/format,webp/quality,Q_80",
                "price": "1500"
              },
              {
                "id": "1237",
                "title": "Oppo",
                "instructions": "Oppo Reno 5 Pro is a great phone",
                "Features": "dcad",
                "image": "https://www.oppo.com/content/dam/oppo/common/mkt/v2-2/reno13-series/list-page/reno13-pro-5g/purple.png",
                "price": "1500"
              },
              {
                "id": "1238",
                "title": "Vivo",
                "instructions": "Vivo X60 Pro is a great phone",
                "Features": "dcad",
                "image": "https://suprememobiles.in/cdn/shop/files/8_35afa0e5-bb94-4728-a30b-a1822e8e6c0d.webp?v=1738213121",
                "price": "1500"
              }
            ]
          };

        dispatch({ type: actionTypes.GET_PRODUCTS_SUCCESS, payload: data.recipes });

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