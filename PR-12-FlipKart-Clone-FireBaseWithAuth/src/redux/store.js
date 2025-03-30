import { createStore, applyMiddleware, combineReducers, compose } from "redux";
import {thunk} from "redux-thunk"; // ✅ Correct Import

// Reducers
import { cartReducer } from "./reducers/cartReducer";
import { getProductDetailsReducer, getProductReducer } from "./reducers/productReducer";
import authReducer from "./reducers/authReducer"; 

// Combine all reducers
const reducer = combineReducers({
  cart: cartReducer,
  getProducts: getProductReducer,
  getProductDetails: getProductDetailsReducer,
  auth: authReducer,
});

// ✅ Setup Redux DevTools
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

// ✅ Create store with middleware
const store = createStore(reducer, composeEnhancers(applyMiddleware(thunk)));

export default store;
