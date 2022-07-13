import { axios } from 'axios';
import { CART_ADD_ITEM } from './../constants/cartConstants';


export const addToCart = (id,qty) => async (dispatch, getState)  => {    // getState is used to entire state of application
    // making get request from backend api
    const {data} = await axios.get(`/api/products/${id}`);

    dispatch({
        type:CART_ADD_ITEM,
        payload: {
            product: data._id,
            name: data.name,
            image: data.image,
            price: data.price,
            countInStock: data.countInStock,
            qty
        }
    })

    // saving it in local storage
    localStorage.setItem('cartItems',JSON.stringify(getState().cart.cartItems))
} 
// these saved cartItems json are accessd in store.js 