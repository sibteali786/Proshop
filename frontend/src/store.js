import {legacy_createStore, combineReducers, applyMiddleware} from "redux";
import thunk from "redux-thunk";
import {composeWithDevTools} from "redux-devtools-extension"
import { productDetailsReducer, productListReducer } from './reducers/productReducers';

const reducer = combineReducers({
    productList:productListReducer,
    productDetails:productDetailsReducer
})

const initialState = {}; 

const composeEnhancers = composeWithDevTools({
    name: `Redux`,
    realtime: true,
    trace: true,
    traceLimit: 25
});
const store = legacy_createStore(reducer, initialState, 
    composeEnhancers(applyMiddleware(thunk)));

export default store;