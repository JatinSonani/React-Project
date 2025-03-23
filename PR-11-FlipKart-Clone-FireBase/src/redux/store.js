import { createStore, applyMiddleware, combineReducers } from "redux";
import { thunk } from "redux-thunk"; // ✅ Correct way to import

import { cartReducer } from "./reducers/cartReducer";
import { getProductDetailsReducer, getProductReducer } from "./reducers/productReducer";

const reducer = combineReducers({
  cart: cartReducer,
  getProducts: getProductReducer,
  getProductDetails: getProductDetailsReducer,
});

const middleware = [thunk]; // ✅ Use `thunk` as a named import

const store = createStore(reducer, applyMiddleware(...middleware));

export default store;
