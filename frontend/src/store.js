import {legacy_createStore, combineReducers, applyMiddleware} from "redux";
import thunk from "redux-thunk";
import {composeWithDevTools} from "redux-devtools-extension"
import { productDetailsReducer, productListReducer } from './reducers/productReducers';
import { cartReducer } from './reducers/cartReducers';

const reducer = combineReducers({
    productList:productListReducer,
    productDetails:productDetailsReducer,
    cart: cartReducer
})

// accessing locally store cartItems 
const cartItemsFromStorage = localStorage.getItem('cartItems') ? JSON.parse(localStorage.getItem('cartItems')) : [];
console.log(cartItemsFromStorage);
const initialState = {
    cart : {cartItems:cartItemsFromStorage}
}; 

const composeEnhancers = composeWithDevTools({
    name: `Redux`,
    realtime: true,
    trace: true,
    traceLimit: 25
});
const store = legacy_createStore(reducer, initialState, 
    composeEnhancers(applyMiddleware(thunk)));

export default store;